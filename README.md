# Heroku Config Bot
* Herokuサーバの環境変数を設定してくれるSlack botです。

## 設定する環境変数
* AUTH_ENABLED ('true' / 'false')
* USER
* PASS

## 初期設定
* `heroku config:set BOT_TOKEN=#{bot作成時に取得したトークン}`
* `heroku config:set APP_TOKEN=#{herokuアプリのトークン}`

## 使えるコマンド

### 設定内容確認
* 今の設定を教えて
  - ユーザ名、パスワード、ベーシック認証の状態を返す。
* ユーザ名を教えて
* パスワードを教えて
* ベーシック認証の状態を教えて

### ユーザ名、パスワードの設定
* ユーザ名を"username"、パスワードを"password"にして
* "username","password"にして
* ユーザ名を"username"にして
* パスワードを"password"にして

### ベーシック認証の設定
* ベーシック認証をかけて
* ベーシック認証を外して
* ベーシック認証をONにして
* ベーシック認証をOFFにして

## License
MIT
