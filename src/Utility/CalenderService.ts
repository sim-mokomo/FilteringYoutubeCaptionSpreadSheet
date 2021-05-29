export class CalenderService {
    static isBusinessDay(date: Date) : boolean{
        if(this.isWeekend(date)){
            return  false;
        }

        const japaneseCalender = CalendarApp.getCalendarById("ja.japanese#holiday@group.v.calendar.google.com")
        if(japaneseCalender.getEventsForDay(date).length > 0){
            return false;
        }
        return true;
    }

    static isWeekend(date:Date) : boolean{
        return date.getDay() == 0 || date.getDay() == 6
    }
}