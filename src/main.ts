class Video {
    title: string
    url :string

    constructor(title: string, url: string) {
        this.title = title
        this.url = url
    }
}

function uploadToSpreadSheet(sheetName:string, videos : Video[]) {
    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
    let sheet = spreadSheet.getSheetByName(sheetName)
    if(sheet == null){
        sheet = spreadSheet.insertSheet(sheetName)
    }
    const headerRange = sheet.getRange(1,1,1,2)
    const headerValues = []
    headerValues.push(["title", "url"])
    headerRange.setValues(headerValues)

    const contentRange = sheet.getRange(2, 1, videos.length, 2)
    const contentValues = []
    for (const video of videos) {
        contentValues.push([video.title, video.url])
    }
    contentRange.setValues(contentValues)
}

function test()
{
    const videos : Video[] = []
    videos.push(new Video("test1", "a"))
    videos.push(new Video("test2", "b"))
    videos.push(new Video("test3", "c"))
    uploadToSpreadSheet("test", videos)
}

class UploadVideosRequest
{
    sheetName:string
    videos:Video[]

    constructor() {
        this.sheetName = ""
        this.videos = []
    }
}

function doPost(e) {
    const request : UploadVideosRequest = JSON.parse(e.postData.contents);
    uploadToSpreadSheet(request.sheetName, request.videos)

    const response = ContentService.createTextOutput()
    response.setMimeType(ContentService.MimeType.JSON)
    response.setContent(JSON.stringify(request));
    return response
}

