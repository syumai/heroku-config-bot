var Botkit = require('botkit');
var CurlRequest = require('./curl-request');
var MsgGenerator = require('./msg-generator');

var DataType = MsgGenerator.DataType;
var RequestType = MsgGenerator.RequestType;
var token = process.env.BOT_TOKEN;

if(!token){
    console.log('Please set your BOT_TOKEN to environmental variables.');
    process.exit();
}

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: token
}).startRTM(function(err){
    if(err) {
        throw new Error(err);
    }
});

controller.hears(['おはよう', 'こんにちは', 'こんばんは', 'おつかれ', 'お疲れ'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    bot.api.reactions.add({
        timestamp: msg.ts,
        channel: msg.channel,
        name: '+1'
    });

    var reply = '';
    if (msg.text.indexOf('おはよう') > -1) reply += 'おはようございます！';
    else if (msg.text.indexOf('こんにちは') > -1) reply += 'こんにちは！';
    else if (msg.text.indexOf('こんばんは') > -1) reply += 'こんばんは！';
    else if ((msg.text.indexOf('お疲れ') > -1) || (msg.text.indexOf('おつかれ') > -1)) {
        reply += 'お疲れさまです！';
    }
    bot.reply(msg, reply);
});


controller.hears(['今の設定を教えて'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var req = new CurlRequest();
    req.get(function(data){
        var reply = new MsgGenerator(RequestType.GET, data)
            .append(DataType.USER)
            .append(DataType.PASS)
            .append(DataType.AUTH_ENABLED)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['ユーザ名を教えて'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var req = new CurlRequest();
    req.get(function(data){
        var reply = new MsgGenerator(RequestType.GET, data)
            .append(DataType.USER)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['パスワードを教えて'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var req = new CurlRequest();
    req.get(function(data){
        var reply = new MsgGenerator(RequestType.GET, data)
            .append(DataType.PASS)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['ベーシック認証の状態を教えて'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var req = new CurlRequest();
    req.get(function(data){
        var reply = new MsgGenerator(RequestType.GET, data)
            .append(DataType.AUTH_ENABLED)
            .get();
        bot.reply(msg, reply);
    });
});


controller.hears(['ユーザ名を"(.*)"にして'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var matches = msg.text.match(/ユーザ名を"(.*)"にして/i);
    var user = matches[1];
    var req = new CurlRequest();
    req.patch({'USER': user}, function(data){
        var reply = new MsgGenerator(RequestType.PATCH, data)
            .append(DataType.USER)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['パスワードを"(.*)"にして'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var matches = msg.text.match(/パスワードを"(.*)"にして/i);
    var pass = matches[1];
    var req = new CurlRequest();
    req.patch({'PASS': pass}, function(data){
        var reply = new MsgGenerator(RequestType.PATCH, data)
            .append(DataType.PASS)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['ベーシック認証を(.*)にして'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var matches = msg.text.match(/ベーシック認証を(.*)にして/i);
    var auth = (matches[1] == 'ON') ? 'true':'false';
    var req = new CurlRequest();
    req.patch({'AUTH_ENABLED': auth}, function(data){
        var reply = new MsgGenerator(RequestType.PATCH, data)
            .append(DataType.AUTH_ENABLED)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['ベーシック認証をかけて'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var auth = 'true';
    var req = new CurlRequest();
    req.patch({'AUTH_ENABLED': auth}, function(data){
        var reply = new MsgGenerator(RequestType.PATCH, data)
            .append(DataType.AUTH_ENABLED)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['ベーシック認証を外して'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var auth = 'false';
    var req = new CurlRequest();
    req.patch({'AUTH_ENABLED': auth}, function(data){
        var reply = new MsgGenerator(RequestType.PATCH, data)
            .append(DataType.AUTH_ENABLED)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['ユーザ名を"(.*)"、パスワードを"(.*)"にして'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var matches = msg.text.match(/ユーザ名を"(.*)"、パスワードを"(.*)"にして/i);
    var user = matches[1];
    var pass = matches[2];
    var req = new CurlRequest();
    req.patch({'USER': user, 'PASS': pass}, function(data){
        var reply = new MsgGenerator(RequestType.PATCH, data)
            .append(DataType.USER)
            .append(DataType.PASS)
            .get();
        bot.reply(msg, reply);
    });
});

controller.hears(['"(.*)","(.*)"にして'], ['direct_message', 'direct_mention', 'mention'], function(bot, msg) {
    var matches = msg.text.match(/"(.*)","(.*)"にして/i);
    var user = matches[1];
    var pass = matches[2];
    var req = new CurlRequest();
    req.patch({'USER': user, 'PASS': pass}, function(data){
        var reply = new MsgGenerator(RequestType.PATCH, data)
            .append(DataType.USER)
            .append(DataType.PASS)
            .get();
        bot.reply(msg, reply);
    });
});
