const { exec } = require("child_process");

console.log('javascript works now');
console.log('database_url: ' + process.env.DATABASE_URL);
console.log('HEROKU_API_TOKEN: ' + process.env.HEROKU_API_TOKEN);


exec('npm install heroku-client --save',
    (err, stdout, stderr) => {
      if (err) return console.error(`Error: ${stderr}`);
      
      const Heroku = require('heroku-client')
      const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })

      // PATCH requests with body
        heroku.patch('/apps/' + process.env.HEROKU_APP_NAME + '/config-vars',
            {
                body: {
                    "FOO": "bar",
                    "BAZ": "qux"
                }
            }).then(app => {console.log('FOO: ' + process.env.FOO)  })
 

    }
  );