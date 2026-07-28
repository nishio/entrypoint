# Pulsestamp

## index.html

デモ用

## images

デフォルトのトランプ画像はこちらから取ってきた
http://www.xn--eckzb3bzhw32znfcp1zduw.com/data/trump.php

## メモ

2016-01-02 デモ用に1タップだけで判定するようにした

## Windowsでのポートフォワード
管理者として実行: netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=8001 connectaddress=192.168.137.220

状況の確認: netsh interface portproxy show all
