var Curl = require('node-libcurl').Curl;

var url = 'https://api.heroku.com/apps/webcamsample/config-vars';
var accept = 'Accept: application/vnd.heroku+json; version=3';
var bearerToken = process.env.APP_TOKEN;
var authorization = 'Authorization: Bearer ' + bearerToken;
var contentType = 'Content-Type: application/json';

function CurlRequest(){
    this.curl = new Curl();
    this.curl.setOpt(Curl.option.URL, url);
}

CurlRequest.prototype.get = function(callback){
    this.curl.setOpt(Curl.option.HTTPHEADER, [accept, authorization]);
    this.curl.on('end', function(statusCode, body, headers) {
        if(statusCode == 200) {
            var data = JSON.parse(body);
            callback(data);
        } else {
            console.error(body);
        }
        this.close();
    });
    this.curl.on('error', function(err) {
        console.error('Error: ', err);
        this.close();
    });
    this.curl.perform();
};

CurlRequest.prototype.patch = function(data, callback){
    this.curl.setOpt(Curl.option.CUSTOMREQUEST, 'PATCH');
    this.curl.setOpt(Curl.option.POSTFIELDS, JSON.stringify(data));
    this.curl.setOpt(Curl.option.HTTPHEADER, [accept, authorization, contentType]);
    this.curl.on('end', function(statusCode, body, headers) {
        if(statusCode == 200) {
            var data = JSON.parse(body);
            callback(data);
        } else {
            console.error(body);
        }
        this.close();
    });
    this.curl.on('error', function(err) {
        console.error('Error: ', err);
        this.close();
    });
    this.curl.perform();
};

module.exports = CurlRequest;
