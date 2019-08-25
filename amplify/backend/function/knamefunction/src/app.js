/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var api_url = 'https://kapi.kakao.com/v1/translation/translate';
var kakao_api_key = 'KakaoAK 4256ba98f2b7a4540345527c2944cc2d';

// declare a new express app
var app = express()

// Enable CORS for all methods
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(awsServerlessExpressMiddleware.eventContext())

/****************************
* Example post method *
****************************/

app.post('/kname', async function(req, res) {
  const { query, srcLang } = req.body;

  request.post(api_url, {
      headers: {
          'Authorization': kakao_api_key,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      form: {
          src_lang: srcLang,
          target_lang: 'kr',
          query: decodeURI(query)
      },
      json: true
  }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.json({err: null, success: 'post call succeed!', body });
      } else {
        res.json({ err: error });
      }
  });
});

app.listen(3000, function() {
    console.log('App started')
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
