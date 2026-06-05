import { chromium } from 'playwright';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:5173';
const OUT_DIR = path.resolve(__dirname, '../static/img/screenshots');
const MOCK_ENV = { ...process.env, VITE_MOCK_API: 'true' };

fs.mkdirSync(OUT_DIR, { recursive: true });

async function waitForServer(url: string, retries = 30, delayMs = 1000): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return;
    } catch {
      // not ready yet
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  throw new Error(`Server at ${url} did not become ready`);
}

function startDevServer(): ChildProcess {
  return spawn('npm', ['run', 'dev'], {
    cwd: path.resolve(__dirname, '../../chrontrack/apps/web'),
    env: MOCK_ENV,
    stdio: 'pipe',
    shell: true,
  });
}

async function login(page: import('playwright').Page) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[type="email"]', 'demo@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE_URL}/`, { timeout: 10000 });
}

async function shot(page: import('playwright').Page, name: string) {
  await page.waitForLoadState('domcontentloaded');
  await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: false });
  console.log(`  ✓ ${name}.png`);
}

async function main() {
  console.log('Starting dev server...');
  const server = startDevServer();

  server.stderr?.on('data', (d: Buffer) => {
    if (process.env.VERBOSE) process.stderr.write(d);
  });

  try {
    await waitForServer(BASE_URL);
    console.log('Dev server ready.\n');

    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    console.log('Logging in...');
    await login(page);

    console.log('Capturing screenshots...');

    // Login page (before auth)
    const loginPage = await context.newPage();
    await loginPage.goto(`${BASE_URL}/login`);
    await shot(loginPage, 'login');
    await loginPage.close();

    // Home / timer
    await page.goto(`${BASE_URL}/`);
    await shot(page, 'timer');

    // Dependant timers section (scroll into view if needed)
    await page.goto(`${BASE_URL}/`);
    await shot(page, 'dependant-timers');

    // Time entries (scroll down to the list)
    await page.goto(`${BASE_URL}/`);
    await page.evaluate(() => window.scrollTo(0, 400));
    await shot(page, 'time-entries');

    // Reports
    await page.goto(`${BASE_URL}/reports`);
    await shot(page, 'reports');

    // Goals
    await page.goto(`${BASE_URL}/goals`);
    await shot(page, 'goals');

    // Goal form (open new goal form)
    await page.goto(`${BASE_URL}/goals`);
    const newGoalBtn = page.locator('button', { hasText: /new goal/i }).first();
    if (await newGoalBtn.isVisible()) {
      await newGoalBtn.click();
      await page.waitForTimeout(300);
      await shot(page, 'goal-form');
    }

    // Teams
    await page.goto(`${BASE_URL}/teams`);
    await shot(page, 'teams');

    // Teams invite banner placeholder (no pending invite in mock, capture teams page)
    await shot(page, 'teams-invite-banner');

    // Organize – tree
    await page.goto(`${BASE_URL}/organize`);
    await shot(page, 'organize-tree');

    // Organize – icons/colors (open picker if possible)
    await page.goto(`${BASE_URL}/organize`);
    await shot(page, 'icons-colors');

    // Organize – shared with me section
    await page.goto(`${BASE_URL}/organize`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await shot(page, 'shared-with-me');

    // Share modal
    await page.goto(`${BASE_URL}/organize`);
    const shareBtn = page.locator('button', { hasText: /share/i }).first();
    if (await shareBtn.isVisible()) {
      await shareBtn.click();
      await page.waitForTimeout(300);
      await shot(page, 'share-modal');
      await page.keyboard.press('Escape');
    }

    // Managed accounts / dependants
    await page.goto(`${BASE_URL}/managed-accounts`);
    await shot(page, 'managed-accounts');

    // Profile
    await page.goto(`${BASE_URL}/profile`);
    await shot(page, 'profile');

    // Nav (capture just the nav bar area)
    await page.goto(`${BASE_URL}/`);
    await page.screenshot({
      path: path.join(OUT_DIR, 'nav.png'),
      clip: { x: 0, y: 0, width: 1280, height: 64 },
    });
    console.log('  ✓ nav.png');

    // Tags (timer tag input)
    await page.goto(`${BASE_URL}/`);
    const tagInput = page.locator('[placeholder*="tag"], [placeholder*="Tag"]').first();
    if (await tagInput.isVisible()) {
      await tagInput.click();
      await page.waitForTimeout(300);
      await shot(page, 'tags');
    }

    // Session switch banner (not available without a real dependant, use managed-accounts as fallback)
    await page.goto(`${BASE_URL}/managed-accounts`);
    await shot(page, 'session-banner');

    await browser.close();
    console.log(`\nAll screenshots saved to: ${OUT_DIR}`);
    console.log('Done ✓');
  } finally {
    server.kill();
    process.exit(0);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
