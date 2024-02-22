
/**
        @param  {import('@playwright/test').APIRequestContext} apiContext
          * @param {String } requestUrl,
        * @param {String } method,
        *  @param {Object } requestOptions
          
        */
export async function executeRequest(
  apiContext,
  requestUrl,
  method,
  requestOptions
) {
  try {
    const response = await apiContext[method](requestUrl, requestOptions);
    const responseCode = await response.status();
    const responseOk = await response.ok();

    if (!responseOk) {
      // if (responseCode !== 200) {
      const errorStatus = `Code: ${responseCode} \r\n`;
      const responseStatus = `Status: ${responseOk} \r\n`;
      const errorResponse = `Response: ${await response.text()} \r\n`;
      throw `${errorStatus} ${errorResponse} ${responseStatus} `;
    }

    return response;

  } catch (error) {
    const errorRequestUrl = `Request url: ${requestUrl} \r\n`;
    const errorRequestMethod = `Method: ${method} \r\n`;
    const errorRequestOptions = `Request options: ${JSON.stringify(requestOptions)} \r\n`;

    throw new Error(
      `Invalid request! Failed on \'executeRequest\' method. \r\n ${errorRequestUrl} ${errorRequestMethod} ${errorRequestOptions} ${error}`
    );
  }
}

/*
* method delete
* requestUrl https://demoqa.com/BookStore/v1/Books?UserId=2f24c011-a654-4781-9f42-b8b6bfcf7d10
* requestOptions {}

* method post
* requestUrl https://demoqa.com/BookStore/v1/Books
* requestOptions {
    data: {
      userId: '2f24c011-a654-4781-9f42-b8b6bfcf7d10',
      collectionOfIsbns: [ [Object] ]
    }
  }

*/
