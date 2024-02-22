
import { buildUrl } from '../../utils/apiUrlBuilder';
import { executeRequest } from '../../utils/apiRequestUtils';
import endpoints from '../../utils/apiEndpoints';
import methods from '../../utils/apiMethods';

async function deleteAllBooksByUser(apiContext, userId) {
  const method = methods.delete;
  const requestOptions = {};
  const requestUrl = buildUrl(endpoints.books.delete, userId);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}

async function deleteBookAPIByIsbn(apiContext, userId, isbn) {
  const method = methods.delete;
  const requestOptions = { data: { isbn: isbn, userId: userId } };
  const requestUrl = buildUrl(endpoints.books.delete);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}

export default { deleteAllBooksByUser, deleteBookAPIByIsbn };
