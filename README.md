#Express-Pass-Id

Simple express middleware module, inspired by [express-request-id](https://www.npmjs.com/package/express-request-id).

It allows passing prefixes for unique request IDs and using custom headers (because x-request-id is often already used).

##Installation
`npm install express-pass-id`

##Usage
**config.json**
```json
{
  "prefix": "myService1",
  "header": "x-my-id"
}
``` 

**express app file**
```javascript
var 
    express       = require('express'),
    app           = express(),
    config        = require('./config.json'),
    expressPassId = require('express-pass-id.js')(config),
    rp = require('request-promise');

app.use(expressPassId);

app.post('/login', function (req, res) {
  console.log('Processing route /login, id '+req.id); //print custom ID
  
  var options = {
      uri: 'https://google.com',
      headers: req.passHeaders //Here we pass our custom header
  };
   
  rp(options)
    //....
});
```