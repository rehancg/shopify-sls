import Shopify, {ApiVersion} from '@shopify/shopify-api';
import {generateHttpRequestFromEvent} from './helper';

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_SCOPES,
  SHOPIFY_HOST,
  SHOPIFY_APP_NAME
} = process.env;

Shopify.Context.initialize({
  API_KEY: SHOPIFY_API_KEY,
  API_SECRET_KEY: SHOPIFY_API_SECRET_KEY,
  SCOPES: [SHOPIFY_SCOPES],
  HOST_NAME: SHOPIFY_HOST.replace(/https:\/\//, ''),
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.January22,
});

export const auth = async (event, context) => {
  const {request, response} = generateHttpRequestFromEvent(event);

  const { query } = request;
  
  const redirectUrl = await Shopify.Auth.beginAuth(
    request,
    response,
    query.shop,
    '/auth/callback',
    false, // Online or Offline Token: Offline = false
  );

  console.log("redirectUrl",redirectUrl);

  return {
    statusCode: 302,
    headers: {
      ...response.getHeaders(),
      Location: redirectUrl
    }
  };
};


export const authCallback = async (event, context) => {
  const {request, response} = generateHttpRequestFromEvent(event);

  const { query } = request;
  
  const session = await Shopify.Auth.validateAuthCallback(
    request,
    response,
    query,
  );

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: session,
    }),
  };
};