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
    if (admins.length) {
        console.error('You can\'t register a new admin');
    } else {

        // Hash password before storing in the database
        params.password = await strapi.admin.services.auth.hashPassword(params.password);

        try {
            // Create admin account
            const admin = await strapi.query('user', 'admin').create({
                username: params.username,
                password: params.password,
                email: params.email,
                blocked: params.blocked
            });

            console.info('(Admin) Account created:', admin);

        } catch (error) {
            console.error(error);
        }
    }
};