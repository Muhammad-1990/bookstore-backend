const { exec } = require("child_process");

console.log('javascript works now');
console.log('database_url: ' + process.env.DATABASE_URL);
console.log('HEROKU_API_TOKEN: ' + process.env.HEROKU_API_TOKEN);

var heroku = PlatformAPI.connect_oauth(process.env.HEROKU_API_TOKEN)
  heroku.config_var.update(process.env.DATABASE_URL, 'xxx')
  console.log('database_url: ' + process.env.DATABASE_URL);