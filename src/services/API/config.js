const configAPI = {};
/* 
  in order to fetch locally you need to use your local ip 
  (command on linux: $ifconfig)
*/
// configAPI.serverRoute = 'http://staging.atixlabs.com:7777/api/v1';
configAPI.serverRoute = 'http://staging.atixlabs.com:7777/api/v1';

export const handleErrors = function(response) {
  if (!response.ok) {
    console.log('[handleErrors]', response);
    throw Error(response.statusText);
  }
  return response;
};

export default configAPI;
