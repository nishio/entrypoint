# nhiro.org — サイト運用ガイド（AI向け）

このリポジトリ `nishio/entrypoint` は **西尾泰和の個人サイト nhiro.org の中身**。GitHub Pages で配信されている。
遠隔（claude.ai の remote-control 等）でこのサイトを編集する AI は、まずこれを読むこと。

## デプロイの仕組み

- **`main` に push すると GitHub Pages が自動でビルド・公開する。** 特別なデプロイ手順は不要。
- 反映確認: `gh api repos/nishio/entrypoint/pages/builds --jq '.[0]'`（`status` が `built`／`error.message`）。疎通: `curl -s -o /dev/null -w '%{http_code}' https://nhiro.org/<path>`。
- カスタムドメインは `CNAME` ファイル（`nhiro.org`）で指定。**このファイルを消さない・変えない。**

## 構成と、壊さないための注意

- **サイト本体は `docs/` 配下**（Pages のソースは `main` ブランチの `/docs`）。`index.html` / `ja.html` がプロフィール、`static/` が共有アセット、著書ページ（`langbook` `intellitech` `jybook`）、デモ（`learn_language` `idea-generation`）、講義（`kuds2013` `kuds2014` `from_if_to_ml` `titech_hcd` `tech_and_inov`）、小物（`yaruki` `pdf`）。`t/` は `pdf/` の旧名で、直リンク互換のためのコピーとリダイレクトのみ。
- **`index.html` の無いディレクトリはトップ URL が 404 になる**（これは仕様。中の個別ファイルは 200 で配信される）。一覧を見せたいディレクトリには `index.html` を置く。
- **シンボリックリンクを置かない。** GitHub Pages はサイト外を指す symlink でビルドが失敗する（過去に `mitou_timeline` で発生）。
- 100MB 超のファイルは GitHub に置けない。大きなアセットに注意。
- やることリストは `TODO.md`。

## インフラ（触る前に読む）

- ホスティング = GitHub Pages。ドメイン登録 = お名前.com。**DNS の権威 = バリュードメイン（NS は dnsv.jp）**。
- DNS には **このサイトと無関係の別サービス**が同居している: `mail`（旧サーバのメール）、`polis`（AWS）、`mc`（Minecraft, AWS 委任）、`mem`（Vercel）。**DNS を触るときこれらのレコードを絶対に消さない。**

## 非公開情報はここを読め

認証情報・サーバ接続・契約・DNS レジストラ操作・旧 VPS の詳細など、**非公開の運用情報はこのリポジトリには置かない**。すべて private リポジトリ **`nishio/nhiro-org-vps-backup`** の `RUNBOOK.md`（と `HANDOFF.md` / `README.md`）にある。DNS 変更手順・SSH の入り方・退役タスクもそこを参照。
