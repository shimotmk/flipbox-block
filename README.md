一つのプラグインで複数のブロックを作るテンプレート

## ブロックを追加する手順
1. includes/block-editor/blocks にブロックディレクトリーを追加

block.json,index.js,edit.js,save.jsなどを作る

2. example-plugin.php $blocksにブロック名を追加

3. webpack.config.js のentryにブロック名とパスを追加

4. `npm run build` でbuildディレクトリーにビルドファイルが出来ていればブロックが登録される

## 翻訳のやり方
https://developer.wordpress.org/block-editor/how-to-guides/internationalization/#how-to-use-i18n-in-javascript

1. potファイルを作る
プラグインディレクトリーで実行
`wp i18n make-pot ./ languages/example-plugin.pot`

2. 日本語訳を当てる(potファイルから手作業コピー)
`example-plugin-ja.pot`

3. jsonデータを作る
`wp i18n make-json ./languages/example-plugin-ja.po --no-purge`

