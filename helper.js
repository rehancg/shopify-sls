import HttpMocks from 'node-mocks-http';
export const generateHttpRequestFromEvent = (event)=> {
    const request = HttpMocks.createRequest({
      url: event.resource,
      params: event.pathParameters,
      query: event.queryStringParameters,
      headers: event.headers,
      method: event.httpMethod,
    });
  
    const response = HttpMocks.createResponse();
    response.set = undefined // workaround to allow shopify lib to set-cookie header in your response object
  
    return { request, response };
};