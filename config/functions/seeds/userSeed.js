/**
 * An asynchronous seed function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */
module.exports.createUser = async () => {
  // Required fields:
  const params = {
    username: process.env.ADMIN_USER || 'admin',
    password: process.env.ADMIN_PASS || 'admin',
    email: process.env.ADMIN_EMAIL || 'mo@novationtech.co.za',
    blocked: false
  };

  // Check if exist any admin account - NOTE: you can change this query to find by specific email
  const admins = await strapi.query('user', 'admin').find({ _limit: 1 });
  if (!admins.length) {
    params.password = await strapi.admin.services.auth.hashPassword(params.password);
    try {
      // Create admin account
      await strapi.query('user', 'admin').create({
        username: params.username,
        password: params.password,
        email: params.email,
        blocked: params.blocked
      });
    } catch (error) {
      console.error(error);
    }
  }
};