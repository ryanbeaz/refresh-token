const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/identity/v1/oauth2/token',
    createProxyMiddleware({
      target: `${process.env.REACT_APP_PROXY_URL}`,
      changeOrigin: true,
    })
  );
};