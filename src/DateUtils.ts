import { DateTime } from 'luxon';

export default class DateUtils {
    formatMonthForMostViewed(startingDate:string):string {
        return startingDate.slice(0, 4) + '/' + startingDate.slice(4, 6) + '/all-days';
    }

    formatDateForMostViewed(date:string):string {
        return date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8);
    }

    calculateEndingDate(duration:string, startingDate:string):string {
        const startDate = this.turnWikiDateIntoLuxonDateTime(startingDate);
        let endingDate = '';
        if (duration === 'week') {
            endingDate = startDate.plus({ days: 6 }).toFormat('yyyyMMdd');
        } else if (duration === 'month') {
            endingDate = startDate.plus({ months: 1 }).minus({ days: 1 })
                .toFormat('yyyyMMdd');
        } else {
            throw new Error(`Error: you entered ${duration} for duration. Please change it to either the string 'month' or the string 'day'`);
        }

        return endingDate;
    }

    turnWikiDateIntoLuxonDateTime(wikiFormattedDate:string):DateTime {
        return DateTime.fromFormat(wikiFormattedDate, 'yyyyMMdd');
    }
}
