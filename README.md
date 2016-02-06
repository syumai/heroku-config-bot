# Heroku Config Bot
* Herokuサーバの環境変数を設定してくれるSlack botです。

## 設定する環境変数
* AUTH_ENABLED ('true' / 'false')
* USER
* PASS

## 初期設定
* `heroku config:set BOT_TOKEN=#{bot作成時に取得したトークン}`
* `heroku config:set APP_TOKEN=#{herokuアプリのトークン}`

## License
MIT
