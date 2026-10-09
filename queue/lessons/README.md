# 開発者 wiki の更新の同期手順

開発者 wiki の固定 commit から現在までに更新されたページを調べ、再翻訳対象を `STATUS.md` に書き出す手順です。

1. 開発者 wiki のディレクトリ（`C:/Users/nishi/claude-win/kouchou-ai-developer-wiki` 等）に移動します。
2. 以下のコマンドで、固定 commit `3459fc653917039e8906a2bf09b9164855ee84e3` 以降に変更された Markdown ファイルの一覧を取得します。
   galleria の作業ツリーは固定 commit を checkout したままにしてある（runner が原文の版をそれで確かめる）ので、`HEAD` ではなく
   fetch した `origin/main` と比べます。作業ツリーの checkout は動かしません。

   ```bash
   git fetch origin
   git diff --name-only 3459fc653917039e8906a2bf09b9164855ee84e3 origin/main -- wiki/
   ```

3. 出力されたファイルの一覧と、現在の翻訳対象ページ（L01〜L19 の原本パス）を照らし合わせます。
4. 対象ページに変更があった場合、本ディレクトリの `STATUS.md` 内「判断待ち」欄に以下のように書き出します。

   ```markdown
   ## 判断待ち
   
   - 以下は原文が更新されたため再翻訳が必要（別 QUEUE で実施）:
     - `wiki/concepts/broadlistening.md`
   ```
