import chromeLauncher from 'chrome-launcher';
import type { Flags } from 'lighthouse';
import lighthouse from 'lighthouse';
// pages/Report.tsx
import type { GetServerSideProps } from 'next';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options: Flags = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse('https://codedrafts.com', options);

  await chrome.kill();

  return {
    props: {
      reportHtml: runnerResult?.report,
      finalDisplayedUrl: runnerResult?.lhr.finalDisplayedUrl,
      performanceScore: runnerResult?.lhr.categories.performance?.score,
    },
  };
};

const Report = ({ reportHtml }) => {
  console.log(reportHtml);
  const [repo, setRepo] = useState<string | string[] | undefined>('');

  return <div dangerouslySetInnerHTML={{ __html: `${reportHtml}` }} />;
};

export default Report;
