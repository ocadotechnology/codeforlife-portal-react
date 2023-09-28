// TODO: load all environment variables here.
export const SSO_SERVICE_NAME =
  process.env.REACT_APP_SSO_SERVICE_NAME ?? 'sso';
export const SSO_SERVICE_PROTOCOL =
  process.env.REACT_APP_SSO_SERVICE_PROTOCOL ?? 'http';
export const SSO_SERVICE_DOMAIN =
  process.env.REACT_APP_SSO_SERVICE_DOMAIN ?? 'localhost';
export const SSO_SERVICE_PORT =
  Number(process.env.REACT_APP_SSO_SERVICE_PORT ?? '8001');
export const SSO_SERVICE_BASE_URL =
  `${SSO_SERVICE_PROTOCOL}://${SSO_SERVICE_DOMAIN}:${SSO_SERVICE_PORT}/${SSO_SERVICE_NAME}`;
export const SSO_SERVICE_API_URL =
  `${SSO_SERVICE_BASE_URL}/api`;
