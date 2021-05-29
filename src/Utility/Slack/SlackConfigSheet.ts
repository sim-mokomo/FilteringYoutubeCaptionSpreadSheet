import {GoogleSpreadSheetExtensions} from "../GoogleSpreadSheetExtensions";

export class SlackConfigSheet {
    table : SlackConfig[] = []

    constructor(sheetName : string) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)

        const values = GoogleSpreadSheetExtensions.getRecordValues(sheet, [
            "id",
            "webhook_url",
            "message_destination_channel"
        ])

        for (const value of values) {
            const record = new SlackConfig(
                Number(value[0]),
                value[1],
                value[2])
            this.table.push(record)
        }
    }

    findById(id:number) : SlackConfig{
        const record = this.table.find(x => x.id == id)
        if(record == null){
            return new SlackConfig(0, "", "")
        }
        return record
    }
}

export class SlackConfig {
    id : number
    webhookUrl : string
    messageDestinationChannel : string

    constructor(id:number, webhookUrl : string, messageDestinationChannel:string) {
        this.id = id
        this.webhookUrl  =webhookUrl
        this.messageDestinationChannel = messageDestinationChannel
    }
}