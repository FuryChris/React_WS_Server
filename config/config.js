const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://twoja-strona.netlify.app'] // frontend w prod
    : ['http://localhost:3000']; // lokalnie

module.exports = {
  port: process.env.PORT || 5000,
  allowedOrigins,
};
