# Google Form Slack 通知ツール

このプロジェクトは、Google Formからの回答を受け取り、Slackへ通知するGoogle Apps Scriptベースのシステムを提供します。特定のフォームからの回答データに基づいてカレンダー予定の作成もサポートします。

## 主な機能

- Google Formからの回答をリアルタイムでSlackに通知
- 回答内容に応じて絵文字を付与し、メッセージの視認性を向上
- 日付と時間の回答がある場合、Googleカレンダーの予定作成リンクを生成
- フォームの公開URLも通知メッセージに添付

## セットアップ

1. Google Apps Scriptのプロジェクトを新規作成します。
2. 上記のコードをコピーし、プロジェクトにペーストします。
3. スクリプトのプロパティに`ACCESS_TOKEN`として、SlackのWebhook URLを追加します。

## 使い方

1. Google Formで回答を受け付けると、指定したSlackチャンネルにリアルタイムで通知されます。
2. 通知には回答の詳細情報、フォームへのリンク、および必要に応じてGoogleカレンダーへのリンクが含まれます。

## 注意点

- SlackのWebhook URLは、公開しないようにしてください。誤って公開すると、不正利用される可能性があります。
- このスクリプトはGoogle Apps Scriptベースなので、Googleの利用制限などに注意してください。

## 寄稿

このプロジェクトはオープンソースです。バグの報告や改善提案などがあれば、Issueを作成してください。

## 画像イメージ

#### Slack通知イメージ
<img width="462" alt="image-slack-form" src="https://github.com/iU-Alumni-Association/form-connect-gas/assets/147612244/d5d67017-a613-496a-bc24-7dc486de2f56">


## コードの概要

### Backend (Google Apps Script)

#### Google Form Slack通知関数

この関数は、Google Formからの回答を受け取り、Slackにメッセージを送信します。また、特定の処理を適用してメッセージを組み立てる機能も持っています。回答に基づいてカレンダーの予定を自動的に作成し、フォームのリンクも生成します。組み立てたメッセージはSlackのWebhook URLを通じてSlackに送信されます。

**主な変数の説明:**
- **form**: 回答があったGoogleフォームのオブジェクト。

- **formTitle**: Googleフォームのタイトル。

- **formUrl**: Googleフォームの公開URL。
  
- **respondentEmail**: 回答者のメールアドレス。
  
- **itemResponses**: すべての回答内容を含む配列。
  
- **message**: Slackに送信するメッセージの内容。
  
- **dateValue**: 日付形式の回答（存在する場合）。
  
- **timeValue**: 時間形式の回答（存在する場合）。
  
- **nameValue**: "名"というタイトルを持つ質問の回答または投稿者のメールアドレス。

**主な機能・処理の流れ:**
1. Google Formからの回答を取得。
2. Slackへの通知メッセージを組み立て。
   - フォームのタイトル、回答者のメールアドレスなどを含める。
   - それぞれの回答に適切な絵文字を挿入。
   - 回答に応じてGoogleカレンダーの予定を自動作成。
3. 組み立てたメッセージをSlackのWebhook URLを通じてSlackに送信。

この関数は、Google Formの回答をリアルタイムで受け取り、その内容をSlackに通知するためのものです。特定の回答データ（例: 日付と時間）を基づいて、Googleカレンダーの予定作成もサポートします。


