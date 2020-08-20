const { exec } = require("child_process");

console.log('javascript works now');
console.log('database_url: ' + process.env.DATABASE_URL);
console.log('HEROKU_API_TOKEN: ' + process.env.HEROKU_API_TOKEN);


// exec('npm install heroku-client --save',
//     (err, stdout, stderr) => {
//       if (err) return console.error(`Error: ${stderr}`);
      
//       const Heroku = require('heroku-client')
//       const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })

//       // PATCH requests with body
//         heroku.patch('/apps/' + process.env.HEROKU_APP_NAME + '/config-vars',
//             {
//                 body: {
//                     "FOO": "bar",
//                     "BAZ": "qux"
//                 }
//             }).then(app => {console.log('FOO: ' + process.env.FOO)  })
 

//     }
//   );

const https = require('https');

var options = {
  'method': 'PATCH',
  'hostname': 'api.heroku.com',
  'path': '/apps/'+process.env.HEROKU_APP_NAME+'/config-vars',
  'headers': {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.heroku+json; version=3',
    'Authorization': 'Bearer ' + process.env.HEROKU_API_TOKEN
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({"abc":"xyz"});

req.write(postData);

req.end();