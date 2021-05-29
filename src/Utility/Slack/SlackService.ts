export class SlackService {
    postMessage(url:string,channel:string,text:string,username:string,icon_emoji:string) : void{
        const payload = {
            "channel": channel,
            "username": username,
            "text": text,
            "icon_emoji": icon_emoji
        }
        const options : GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            "method": "post",
            "contentType": "application/json",
            "payload": JSON.stringify(payload)
        };

        UrlFetchApp.fetch(url, options)
    }
}