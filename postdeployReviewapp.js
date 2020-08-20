const { exec } = require("child_process");

console.log('javascript works now');
console.log('database_url: ' + process.env.DATABASE_URL);

exec('heroku config:set TEST_ENV=hello_config',
    (err, stdout, stderr) => {
      if (err) return console.error(`Error: ${stderr}`);

      console.log('it worked: ' + process.env.TEST_ENV);
    }
  );