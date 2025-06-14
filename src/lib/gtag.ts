// /lib/gtag.js (your GA helper)
export const GA_MEASUREMENT_ID = 'G-6CPSC0FV6H'

export const pageview = async (url: string) => {
  if (typeof window === 'undefined') return; // no window, exit early

  try {
    await waitForGtag();
    console.log('TAGGING', url);
    //@ts-ignore
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  } catch (e) {
    console.warn('gtag not yet available', e);
  }
};
function waitForGtag(retries = 10): Promise<void> {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      console.log('waiting for gtag...', retries);
      //@ts-ignore
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        console.log('gtag is available now');
        clearInterval(interval);
        resolve();
      } else if (--retries <= 0) {
        clearInterval(interval);
        reject(new Error('gtag never became available'));
      }
    }, 200);
  });
}
