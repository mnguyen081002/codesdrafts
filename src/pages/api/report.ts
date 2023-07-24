// pages/api/report.ts
import chromeLauncher from 'chrome-launcher';
import type { Flags } from 'lighthouse';
import lighthouse from 'lighthouse';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options: Flags = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse('https://codedrafts.com', options);

  await chrome.kill();

  res.status(200).json({
    reportHtml: runnerResult?.report,
    finalDisplayedUrl: runnerResult?.lhr.finalDisplayedUrl,
    performanceScore: runnerResult?.lhr.categories.performance?.score,
  });
}
