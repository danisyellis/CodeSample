import { DateTime } from 'luxon';

export default class DateUtils {
    calculateEndingDate(duration:string, startingDate:string) {
        const startDate = this.turnWikiDateIntoLuxonDateTime(startingDate);
        let endingDate = '';
        if (duration === 'week') {
            endingDate = startDate.plus({ weeks: 1 }).toFormat('yyyyMMdd');
        } else if (duration === 'month') {
            endingDate = startDate.plus({ months: 1 }).toFormat('yyyyMMdd');
        } else {
            throw new Error(`Error: you entered ${duration} for duration. Please change it to either the string 'month' or the string 'day'`);
        }
        console.log(`END: ${endingDate}`);

        return endingDate;
    }

    turnWikiDateIntoLuxonDateTime(wikiFormattedDate:string) {
        return DateTime.fromFormat(wikiFormattedDate, 'yyyyMMdd');
    }
}
