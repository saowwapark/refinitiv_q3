var arg = process.argv.slice(2);
var target = arg[0];

const https = require('https');
const options = {
  hostname: 'codequiz.azurewebsites.net',
  port: 443,
  path: '/',
  method: 'GET',
  headers: {
    Cookie: 'hasCookie=true',
  },
};

const req = https.request(options, (res) => {
  res.on('data', (data) => {
    var dString = data.toString();

    var results = dString.match(/<\s*td[^>]*>(.*?)<\s*\s*\/td>/g).map((val) => {
      return val.replace(/<\/?td>/g, '');
    });

    for (let i = 0; i < results.length; i++) {
      if (results[i].toLowerCase().trim() === target.toLowerCase().trim()) {
        console.log(results[i + 1]);
        break;
      }
    }
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
