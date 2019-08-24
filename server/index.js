var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var request = require('request');
var api_url = `https://kapi.kakao.com/v1/translation/translate`;

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
}
app.use(allowCrossDomain);
app.set('port', (process.env.PORT || 4000));
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.post('/kname', function (req, res) {
    const { query, srcLang } = req.body;
    request.post(api_url, {
        headers: {
            'Authorization': 'KakaoAK 4256ba98f2b7a4540345527c2944cc2d',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        form: {
            src_lang: srcLang,
            target_lang: 'kr',
            query: decodeURI(query)
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            // console.log('error = ' + response.statusCode);
        }
    });
});

app.listen(app.get('port'));