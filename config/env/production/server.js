module.exports = ({ env }) => ({
    host: env('HOST', '127.0.0.2'),
    port: env.int('PORT', 1337),
    admin: {
      auth: {
        secret: env('ADMIN_JWT_SECRET', '7c86a1953af9a5e06cb0a680fec45976'),
      },
    },
  });
  