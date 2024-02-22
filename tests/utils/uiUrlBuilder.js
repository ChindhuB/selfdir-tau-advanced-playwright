import uiPages from '../utils/uiPages';
/**
          * @param {import('@playwright/test').Page} page,
          * @param {Record<any, any>} params
          */
export function buildUrl(page, params) {
  const uiPath = uiPages[page];

  const qParams = new URLSearchParams(params);

  const url = params
    ? `${uiPath.concat('?')}${qParams.toString()}`
    : uiPath;

  /**
    * page  bookStore
    * uiPath  /books
    * params  { book: '9781449337711' }
    * qParams  URLSearchParams { 'book' => '9781449337711' }
    * url  /books?book=9781449337711
  */

  return url;
}
