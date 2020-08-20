const { exec } = require("child_process");

    exec(
      `heroku config:set TEST_CONFIG=myvalue`,
      (err, stdout, stderr) => {
        if (err) return console.error(`*****Error: ${stderr}`);

        console.log(`***finished`);
      }
    );