# QUEUE — Lessons from practice（nhiro.org/broadlistening/lessons/）

**読み手: galleria の Gemini（Antigravity CLI）。** この QUEUE を上から 1 項目ずつ処理する。Claude 以外が QUEUE を回す最初の例（2026-10-09 西尾決定）。

## 目的

海外の人は西尾を「日本のブロードリスニングの実践者、広聴AI（Kouchou-AI）の人」として見る。広聴AI の開発で実践から得た知見
（公開の開発者 wiki `github.com/nishio/kouchou-ai-developer-wiki` の日本語ページ）を英語で読めるようにし、
nhiro.org/broadlistening/ の下に置く。知見の一覧は英語と日本語の両方で読めるようにする（2026-10-09 西尾）。

## 出力（この branch `lessons-from-practice` の上で）

- `docs/broadlistening/lessons/<slug>.html` — 各ページの英訳（1 項目 = 1 ファイル）
- `docs/broadlistening/lessons/index.html` — 英語の一覧（各ページの英題と 1〜2 文の要約、英訳ページへのリンク）
- `docs/broadlistening/lessons/ja.html` — 日本語の一覧（各ページの日本語の題と要約、**開発者 wiki の原文**へのリンク、英訳へのリンク）
- 最後に `docs/broadlistening/index.html` と `ja.html` の「Read more / 関連」に一覧への 1 行を足す

## 規則

1. **main に push しない。** main への push はそのまま公開になる。この branch に commit・push するまで。公開するかは西尾が見てから決める
2. **ページの形は既存に合わせる**: `docs/broadlistening/index.html` と同じ骨組み（`../../static/site.css`、`<div id="contents">`、上部の
   `[home] [日本語版]` 相当のリンク、`hreflang` の alternate）。JavaScript を使わない。外部の CSS・フォントを足さない
3. **各英訳ページの冒頭に出典を書く**: "Translated from the Japanese original: <開発者 wiki の GitHub 上の URL>（commit `3459fc6`）。
   Machine-translated by Gemini and reviewed by NISHIO Hirokazu." の形。レビュー前は "reviewed" の代わりに "not yet reviewed" と書く
4. **訳の方針**: 意味を足さない・強めない・弱めない。数値・モデル名・コード識別子・ファイル名はそのまま。日本語の固有の語
   （広聴AI、KJ法、いどばた 等）は初出で "Kouchou-AI (広聴AI)" のように併記する。wiki の `[[リンク]]` は、この QUEUE に含まれる
   ページなら英訳ページへの相対リンク、含まれないなら開発者 wiki の原文の URL にする。frontmatter は訳さずに捨て、`summary` だけを冒頭の要約段落として訳す
5. **人名**: 原文に出る個人の名前はそのまま残す（原文が公開されている範囲と同じ）。肩書き・役割を補わない
6. **1 項目を終えたら**: その行を `[x]` にし、`STATUS.md` を上書きし、触ったファイルだけを commit して push する
7. **判断が要るもの**（訳しようのない語、原文の誤りらしきもの、公開に向かないと思える記述）は訳を止めずに、`STATUS.md` の「判断待ち」に 1 行書く
8. **枠**: Gemini の週次の残りが 20% を切ったら新しい項目に入らない（西尾自身が使う分を残す）
9. 原文の版は開発者 wiki の commit `3459fc653917039e8906a2bf09b9164855ee84e3` に固定する（`git show 3459fc653917039e8906a2bf09b9164855ee84e3:wiki/<path>` で読む）
10. **リンク先の path を推測しない**（L01 の検めで追加、2026-10-09）。`[[name]]` の先は `concepts/` `analyses/` `sources/` `entities/` のどれにあるか名前からは決まらない。
    原文の `wiki/index.txt`（全ページの stem と path の表）で path を引いてから URL を作る。URL は
    `https://github.com/nishio/kouchou-ai-developer-wiki/blob/3459fc653917039e8906a2bf09b9164855ee84e3/<path>`。L01 では 7 本中 2 本が推測した誤った directory を指していた
11. **題は slug のままにしない**（L01 の検めで追加）。`<title>` と `<h2>` は slug を英語の語に開いた題にする（例: `analysis-stance` → "Analysis Stance"）。
    `<title>` は `<題> — Lessons from Practice — NISHIO Hirokazu`。原文に無い意味を題に足さない
12. 規則 4 の併記は本文の初出ごとに見落としやすい（L01 で「KJ法」の併記が抜けた）。訳し終えたら、日本語の固有の語が初出で併記されているかを見直す
13. **英訳ページの枠はこの形に揃える**（L01・L02 の検めで追加。2 ページで上部のリンクとフッタが食い違い、L01 の「lessons」は一覧でなく 1 つ上を指し、
    L02 の「日本語版」は日本語の一覧 `ja.html` を指していた）。`<slug>`・`<path>`・`<題>` だけを埋め、本文はこの枠の `<p class="meta">` の後に置く:

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title><題> — Lessons from Practice — NISHIO Hirokazu</title>
      <link rel="stylesheet" href="../../static/site.css" />
      <link rel="alternate" hreflang="en" href="https://nhiro.org/broadlistening/lessons/<slug>.html" />
      <link rel="alternate" hreflang="ja" href="https://github.com/nishio/kouchou-ai-developer-wiki/blob/3459fc653917039e8906a2bf09b9164855ee84e3/<path>" />
    </head>
    <body>

    <div id="contents">

    <a href="../../index.html"><h1>NISHIO Hirokazu</h1></a>
    [<a href="../../index.html">home</a>] [<a href="../index.html">Broad Listening</a>] [<a href="index.html">Lessons from Practice</a>] [<a href="https://github.com/nishio/kouchou-ai-developer-wiki/blob/3459fc653917039e8906a2bf09b9164855ee84e3/<path>">Japanese original</a>]

    <h2><題></h2>

    <p class="meta">
    Translated from the Japanese original: <a href="https://github.com/nishio/kouchou-ai-developer-wiki/blob/3459fc653917039e8906a2bf09b9164855ee84e3/<path>"><path></a> (commit <code>3459fc6</code>).
    Machine-translated by Gemini and not yet reviewed by NISHIO Hirokazu.
    </p>

    （本文）

    </div>
    <hr>
    <div id="footer">
    [<a href="../../index.html">NISHIO Hirokazu's homepage(entrypoint)</a>]<br/>
    Feel free to contact me: nishio (dot) hirokazu (at) gmail (dot) com. Thanks for visiting my site. NISHIO Hirokazu
    </div>

    </body>
    </html>
    ```

    `<path>` は原文の repo 内の path（例 `wiki/concepts/analysis-stance.md`）。frontmatter の `summary` の訳は本文の最初の段落に `<p><strong>Summary:</strong> …</p>` の形で置く

## 項目

- [x] **L01 `analysis-stance`** — 元: `wiki/concepts/analysis-stance.md`
- [x] **L02 `broadlistening`** — 元: `wiki/concepts/broadlistening.md`
- [x] **L03 `pipeline`** — 元: `wiki/concepts/pipeline.md`
- [x] **L04 `extraction-faithfulness-public-models-2026-10-08`** — 元: `wiki/analyses/extraction-faithfulness-public-models-2026-10-08.md`
- [x] **L05 `local-llm-extraction-faithfulness-2026-10-05`** — 元: `wiki/analyses/local-llm-extraction-faithfulness-2026-10-05.md`
- [x] **L06 `label-coverage-policy-2026-05-29`** — 元: `wiki/analyses/label-coverage-policy-2026-05-29.md`
- [x] **L07 `label-quality-rubric-evaluation-2026-05-29`** — 元: `wiki/analyses/label-quality-rubric-evaluation-2026-05-29.md`
- [x] **L08 `human-pairwise-label-preference-experiment-2026-06-02`** — 元: `wiki/analyses/human-pairwise-label-preference-experiment-2026-06-02.md`
- [x] **L09 `labelling-prompt-few-shot-template-confound-2026-06-03`** — 元: `wiki/analyses/labelling-prompt-few-shot-template-confound-2026-06-03.md`
- [x] **L10 `llm-grouping-experiment`** — 元: `wiki/analyses/llm-grouping-experiment.md`
- [x] **L11 `umap-seed-history`** — 元: `wiki/analyses/umap-seed-history.md`
- [x] **L12 `graph-visualization-proposal-2026-05-25`** — 元: `wiki/analyses/graph-visualization-proposal-2026-05-25.md`
- [x] **L13 `public-ui-requirements-for-broadlistening`** — 元: `wiki/analyses/public-ui-requirements-for-broadlistening.md`
- [x] **L14 `kj-method-broadlistening-framing-2026-05-25`** — 元: `wiki/analyses/kj-method-broadlistening-framing-2026-05-25.md`
- [x] **L15 `auto-cluster-defaults`** — 元: `wiki/analyses/auto-cluster-defaults.md`
- [x] **L16 `pipeline-step-addition-framing-2026-05-27`** — 元: `wiki/analyses/pipeline-step-addition-framing-2026-05-27.md`
- [x] **L17 `kouchou-ai-scope-line-from-marketing-to-plugin-2026-06-03`** — 元: `wiki/analyses/kouchou-ai-scope-line-from-marketing-to-plugin-2026-06-03.md`
- [x] **L18 `public-tool-catalog-draft-2026-06-30`** — 元: `wiki/analyses/public-tool-catalog-draft-2026-06-30.md`
- [x] **L19 `broad-listening-book-extractions`** — 元: `wiki/analyses/broad-listening-book-extractions.md`
- [x] **L20 一覧**: `index.html`（英）と `ja.html`（日）を作る。並びは「概念 → 抽出 → ラベル → クラスタリングと可視化 → 公開 UI と範囲 → 周辺」の順
- [x] **L21 入口からのリンク**: `docs/broadlistening/index.html` と `ja.html` に一覧への 1 行を足す
- [x] **L22 同期の手順**: 開発者 wiki の最新と固定 commit を比べ、元が更新されたページの一覧を `STATUS.md` に出す方法を `README.md` に書く（訳し直しは別の QUEUE で）

### 直し（2026-10-09 西尾「もう一度直して」）

**L23 英訳ページの題**: 19 ページすべての `<title>` と `<h2>`（ページの題）を、**原文の H1（`# ` で始まる最初の行）の英訳**にする。
今は slug を整えただけ（例 "Extraction Faithfulness Public Models 2026-10-08"）で、日付まで題に入っている。原文の H1 に日付が無ければ題に日付を入れない。
原文の H1 は `git show <固定 commit>:wiki/<path>` の最初の `# ` 行。英訳は意味を足さず、読者が内容を予想できる自然な英語の見出しにする。本文は変えない
（`<title>` と `<h2>` の 2 か所以外は 1 文字も変えずにファイルの全文を返す）。

- **原文に H1 が無いページ**（galleria の Claude Code が確かめた、2026-10-09）: H1 があるのは `extraction-faithfulness-public-models-2026-10-08` と
  `local-llm-extraction-faithfulness-2026-10-05` の 2 ページだけで、残り 17 ページは frontmatter の直後に本文が始まり、`title:` も無い。
  この 17 ページの題は、**原文の frontmatter の `summary` の主旨を短い英語の見出しにしたもの**にする。summary に無い意味を足さない・強めない、日付を入れない
  （summary の冒頭が「ブロードリスニング — …」のように題の形をしていれば、その部分を英訳する）。西尾が別の題の付け方を選んだら、この規則を直して回し直す
- 19 ページを 1 回の応答で返すと全文で約 31 万字になり、1 回の応答の上限に収まらない。**3 ページずつの項目に分けた**（2026-10-09、galleria の Claude Code）:

- [x] **L23a 題（L01〜L03）**: `analysis-stance`、`broadlistening`、`pipeline`
- [x] **L23b 題（L04〜L06）**: `extraction-faithfulness-public-models-2026-10-08`、`local-llm-extraction-faithfulness-2026-10-05`、`label-coverage-policy-2026-05-29`
- [x] **L23c 題（L07〜L09）**: `label-quality-rubric-evaluation-2026-05-29`、`human-pairwise-label-preference-experiment-2026-06-02`、`labelling-prompt-few-shot-template-confound-2026-06-03`
- [x] **L23d 題（L10〜L12）**: `llm-grouping-experiment`、`umap-seed-history`、`graph-visualization-proposal-2026-05-25`
- [x] **L23e 題（L13〜L15）**: `public-ui-requirements-for-broadlistening`、`kj-method-broadlistening-framing-2026-05-25`、`auto-cluster-defaults`
- [x] **L23f 題（L16〜L18）**: `pipeline-step-addition-framing-2026-05-27`、`kouchou-ai-scope-line-from-marketing-to-plugin-2026-06-03`、`public-tool-catalog-draft-2026-06-30`
- [x] **L23g 題（L19）**: `broad-listening-book-extractions`
- [x] **L24 英語の一覧**: `index.html` の各行の題を L23 の題に揃え、要約を原文の frontmatter の `summary` の忠実な英訳にする（圧縮で留保を落とさない。
  例: L04 は「出力が原文の写しに寄る」を残す）
- [x] **L25 日本語の一覧**: `ja.html` の各行の題を**原文の H1 の日本語のまま**、要約を原文の `summary` の日本語のまま（訳さない）にする。リンクは原文と英訳の両方。
  原文に H1 が無い 17 ページは、L23 で付けた英語の題と同じ内容の短い日本語の見出しにし、語は原文の `summary` の語を使う（意味を足さない）

**L24・L25 は既存のファイルの中の差し替えで、作り直しではない**（galleria の Claude Code、2026-10-09。L24 の 1 回目の応答は `index.html` を
`site.css` も上部のリンクも節も無い別の形に作り直していて、捨てた）:

- 既存の `index.html` / `ja.html` を読み、各 `<li>` の中の**題（`<a href="<slug>.html">…</a>` の文字）と `—` の後の要約だけ**を差し替える。
  それ以外（`<head>`、上部の `[home] …` の行、`<h2>`、導入の段落、`<h3>` の節の名前と並び、各 `<li>` の並びとリンク先、`[原文]` のリンク、フッタ）は 1 文字も変えない
- L24 の題は、各英訳ページ（`docs/broadlistening/lessons/<slug>.html`）の `<h2>` の文字をそのまま写す。要約は原文の `summary` を全文訳す（1〜2 文に縮めない）
- STATUS は、先頭のコードブロック（`state:` などの欄）と「## 判断待ち」「## 直近」の節を残したまま書く。判断待ちの既存の行は消さない

### 直し 2（2026-10-09 西尾「もういちど」— 原文に題を付けてから）

開発者 wiki の 17 ページに題（H1）が付いた（commit `ab10e50eab60db3953631ac09da70977b5474736`）。**題だけはこの commit の H1 を正本にする**（本文の訳の原文は従来の固定 commit のまま。H1 以外の本文は変わっていない）。
各英訳ページの `<title>` と `<h2>` を、その H1 の英訳にする。英訳は意味を足さず、主張の形の題は主張の形のまま訳す（例:「〜は〜ではない」→ "... is ..., not ..."）。題以外は 1 文字も変えない。

- [x] **L26a 題を原文の H1 から**（`analysis-stance`、`broadlistening`、`pipeline`）
- [x] **L26b 題を原文の H1 から**（`label-coverage-policy-2026-05-29`、`label-quality-rubric-evaluation-2026-05-29`、`human-pairwise-label-preference-experiment-2026-06-02`）
- [x] **L26c 題を原文の H1 から**（`labelling-prompt-few-shot-template-confound-2026-06-03`、`llm-grouping-experiment`、`umap-seed-history`）
- [x] **L26d 題を原文の H1 から**（`graph-visualization-proposal-2026-05-25`、`public-ui-requirements-for-broadlistening`、`kj-method-broadlistening-framing-2026-05-25`）
- [x] **L26e 題を原文の H1 から**（`auto-cluster-defaults`、`pipeline-step-addition-framing-2026-05-27`、`kouchou-ai-scope-line-from-marketing-to-plugin-2026-06-03`）
- [x] **L26f 題を原文の H1 から**（`public-tool-catalog-draft-2026-06-30`、`broad-listening-book-extractions`）
- [x] **L27 英語の一覧**: `index.html` の各 `<li>` の題を L26 の題に揃える（要約と、それ以外の行は変えない）
- [x] **L28 日本語の一覧**: `ja.html` の各 `<li>` の題を、commit `ab10e50` の H1 の日本語のまま（訳さない）にする。要約とそれ以外は変えない
- [x] **L26g 題を原文の H1 から（L26f の取りこぼし）**（`broad-listening-book-extractions`）— L26f で返ってこず、`<h2>` が古い "Insights from the Book for Future Development Decisions" のまま。H1 は書名『選挙を変えたブロードリスニング』を含む。書名は意味を足さずに英訳し、題に残す
- [ ] **L27b 英語の一覧の 1 行**: `index.html` の broad-listening-book-extractions.html への `<li>` の題を、L26g の後のそのページの `<h2>` にする（ほかの行と要約は変えない）

## 回答（人間から）

- （なし）
