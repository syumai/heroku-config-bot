function MsgGenerator(requestType, data){
    this.requestType = requestType;
    this.data = data;
    this.text = '';
}

MsgGenerator.DataType = {
    USER: 1,
    PASS: 2,
    AUTH_ENABLED: 3
};

MsgGenerator.RequestType = {
    GET: 1,
    PATCH: 2
};

var DataType = MsgGenerator.DataType;
var RequestType = MsgGenerator.RequestType;

MsgGenerator.prototype.append = function(type) {
    if(this.text != ''){
        this.text += '、';
    }
    var connect = ''; //接続詞
    switch(this.requestType) {
        case RequestType.GET:
            connect = 'は';
            break;
        case RequestType.PATCH:
            connect = 'を';
            break;
    }
    switch(type) {
        case DataType.USER:
            this.text += 'ユーザ名' + connect + '"' + this.data.USER + '"';
            break;
        case DataType.PASS:
            this.text += 'パスワード' + connect + '"' + this.data.PASS + '"';
            break;
        case DataType.AUTH_ENABLED:
            this.text += 'ベーシック認証' + connect + ((this.data.AUTH_ENABLED == 'true') ? 'ON':'OFF');
            break;
    }
    return this;
};

MsgGenerator.prototype.get = function() {
    if(this.text == '') {
        return '';
    } else {
        switch(this.requestType) {
            case RequestType.GET:
                this.text += 'になっているわ。';
                break;
            case RequestType.PATCH:
                this.text += 'に変更したわ。';
                break;
        }
        return this.text;
    }
};

module.exports = MsgGenerator;
