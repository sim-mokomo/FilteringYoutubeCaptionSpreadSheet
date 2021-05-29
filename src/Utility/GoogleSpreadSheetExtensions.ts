export class GoogleSpreadSheetExtensions {
    static getRecordValues(sheet: GoogleAppsScript.Spreadsheet.Sheet, keys: string[]): any[][] {
        const values = sheet.getRange(1,1, sheet.getLastRow(), sheet.getLastColumn()).getValues()
        const header  = values[0]
        const records = values.slice(1, values.length)

        if(header){
            // NOTE: keysの順序に従ったレコードを返す
            const ret : string[][] = []
            for (const record of records) {
                const convertedRecord :string[] = []
                for (const key of keys) {
                    const headerIndex = header.findIndex(x => x == key)
                    convertedRecord.push(record[headerIndex])
                }
                ret.push(convertedRecord)
            }

            console.log(ret)
            return ret
        }

        return []
    }

    static getHeaderValues(sheet: GoogleAppsScript.Spreadsheet.Sheet): string[] {
        const lastColumn: number = sheet.getLastColumn()
        return (<string[]>sheet.getRange(1, 1, 1, lastColumn).getValues().flat())
    }
}