/**
 * Google Formからの回答を受け取り、Slackにメッセージを送信する関数
 * イベントオブジェクトから回答データを取得し、特定の処理を適用してメッセージを組み立てる
 * カレンダーの予定を自動で作成する機能あり
 * フォームへのリンク等も生成する
 * 組み立てたメッセージはSlackのWebhook URLを通じてSlackへ送信される
 * 変数:
 *  - form: 回答があったGoogleフォームのオブジェクト
 *  - formTitle: Googleフォームのタイトル
 *  - formUrl: Googleフォームの公開URL
 *  - respondentEmail: 回答者のメールアドレス
 *  - itemResponses: すべての回答内容を含む配列
 *  - message: Slackに送信するメッセージの内容
 *  - dateValue: 日付形式の回答（存在する場合）
 *  - timeValue: 時間形式の回答（存在する場合）
 *  - nameValue: "名"というタイトルを持つ質問の回答または投稿者のメールアドレス
 */

function onFormSubmit(event) {
    const form = event.source;
    const formTitle = form.getTitle();
    const formUrl = form.getPublishedUrl();
    const respondentEmail = event.response.getRespondentEmail();
    const itemResponses = event.response.getItemResponses();

    let message = `:gopher-dance: *${formTitle} - 回答通知* :gopher-dance:\n\n`;

  // フォームがメールを収集している場合のみ表示
    if (respondentEmail) {
        message += `:email: 投稿者: ${respondentEmail}\n\n`;
    }

    let dateValue = null;
    let timeValue = null;
    // 名前情報の初期設定。後で「名」フィールドが見つかった場合に更新される
    let nameValue = respondentEmail || null; 

    for (let item of itemResponses) {
        let emoji = ":speech_balloon:";
        const title = item.getItem().getTitle();
        let response = item.getResponse();
        // 回答が空の場合は処理をスキップ
        if (!response) {
            continue;
        }
         // 絵文字の判定と名前の設定
        if (title.includes("名")) {
            emoji = ":bust_in_silhouette:";
            nameValue = response; 
        } else if (title.includes("メール")) {
            emoji = ":email:";
        } else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(response)) {
            emoji = ":spiral_calendar_pad:";
            dateValue = response;
        } else if (/^\d{1,2}:\d{2}$/.test(response)) {
            emoji = ":hourglass:";
            timeValue = response;
        }
         // ファイルの添付処理
        if (Array.isArray(response)) { 
            let fileLinks = [];
            for (let fileId of response) {
                const file = DriveApp.getFileById(fileId);
                const fileName = file.getName();
                const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
                fileLinks.push(`<${fileUrl}|${fileName}>`);
            }
            response = fileLinks.join(', ');
        } else if (/^[a-zA-Z0-9-_]{33}$/.test(response)) { 
            const file = DriveApp.getFileById(response);
            const fileName = file.getName();
            const fileUrl = `https://drive.google.com/file/d/${response}/view`;
            response = `<${fileUrl}|${fileName}>`;
        } else if (emoji === ":speech_balloon:" && (response.length > 100 || response.includes("\n"))) { 
          // 長い回答または改行を含む回答をコードブロックで囲む
            response = "```\n" + response + "\n```";
        }

        message += `${emoji} *${title}*: ${response}\n`;
    }
   // 日付と時間の情報が存在する場合、Googleカレンダーの予定を作成するURLを生成
    if (dateValue && timeValue) {
        const startTime = new Date(`${dateValue} ${timeValue}`);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // +1 hour
        const formattedStartTime = startTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const formattedEndTime = endTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        let calendarTitle = formTitle;
        if (nameValue) {
            calendarTitle += ` - ${nameValue}`; 
        }
        const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&dates=${formattedStartTime}/${formattedEndTime}`;
        message += `\n\n:calendar: <${calendarUrl}|Googleカレンダーで予定を作成>`;
    }

    message += `\n:link: <${formUrl}|フォームのリンク>`;

    const webhookUrl = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");
    const options = {
        "method" : "POST",
        "contentType" : "application/json",
        "payload" : JSON.stringify({"text": message})
    };

    UrlFetchApp.fetch(webhookUrl, options);
}