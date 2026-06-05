import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const features: FeatureItem[] = [
  {
    title: 'Track time effortlessly',
    description: 'Start a timer with one click, tag your sessions, and build a clear picture of where your time goes.',
  },
  {
    title: 'Organize by hierarchy',
    description: 'Build a task tree that mirrors how you actually think — nest tasks, add icons and colors, and share categories with your team.',
  },
  {
    title: 'Reports & Goals',
    description: 'Filter, export, and review your time data. Set minimum or maximum hour targets and track progress across any time period.',
  },
  {
    title: 'Team collaboration',
    description: 'Create teams, assign roles, and share task categories so everyone works from the same structure.',
  },
  {
    title: 'Dependant accounts',
    description: 'Track time on behalf of others — children, patients, or anyone who needs supervised time management.',
  },
  {
    title: 'Flexible export',
    description: 'Download your data as PDF or CSV for integration with payroll, billing, or any other workflow.',
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="padding-horiz--md padding-vert--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Smart time tracking for individuals and teams">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
