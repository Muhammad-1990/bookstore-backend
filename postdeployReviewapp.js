const https = require('https');
const url = require('url');

/**
 * 
 * eg. DATABASE_URL = postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com: 5432/d516fp1u21ph7b
 * It's read like so: postgres:// USERNAME : PASSWORD @ HOST : PORT : DATABASE_NAME
 * 
 */
let settings = {
    client: 'postgres'
};

const parsed = url.parse(process.env.DATABASE_URL, true);
const [username, password] = parsed.auth.split(':');

settings.host = parsed.hostname;
settings.port = Number(parsed.port);
settings.database = parsed.pathname.substr(1);
settings.username = username;
settings.password = password;
settings.ssl = (parsed.query.ssl === 'true');

var options = {
    'method': 'PATCH',
    'hostname': 'api.heroku.com',
    'path': '/apps/' + process.env.HEROKU_APP_NAME + '/config-vars',
    'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.heroku+json; version=3',
        'Authorization': 'Bearer ' + process.env.HEROKU_API_TOKEN
    }
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());

        console.log("");
        const admins = strapi.query('user', 'admin').find({ _limit: 1 });
        console.log(admins);

    });

    res.on("error", function (error) {
        console.error(error);
    });
});

var postData = JSON.stringify(
    {
        "DATABASE_USERNAME": settings.username,
        "DATABASE_PASSWORD": settings.password,
        "DATABASE_HOST": settings.host,
        "DATABASE_PORT": settings.port,
        "DATABASE_NAME": settings.database
    });

req.write(postData);

req.end();

