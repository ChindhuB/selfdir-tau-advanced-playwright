import { buildUrl } from './uiUrlBuilder';
/**
          * @param {import('@playwright/test').Page} page,
          * @param {Object} PageObjectParam,
          * @param {String} targetPage,
          * @param {Record<any, any>} params
          */
// 
async function beforeEach(
  page,
  PageObjectParam,
  targetPage,
  params
) {
  await page.goto(buildUrl(targetPage, params));
  //console.log(page.url());
  const pageObject = await new PageObjectParam(page);
  return pageObject;
}

export default { beforeEach };
