import DateUtils from '../DateUtils';
const dateUtils = new DateUtils();

describe('formatting dates for mostViewed', () => {
    it('should format a date correctly for use in the mostViewed function', () => {
        expect(dateUtils.formatDateForMostViewed('20230804')).toBe('2023/08/04');
    });
    it('should format a month correctly for use in the mostViewed function', () => {
        expect(dateUtils.formatMonthForMostViewed('20230801')).toBe('2023/08/all-days');
    });
});

describe('calculating the correct ending date for a week or a month', () => {
    it('should return an ending date 6 days later if the duration = week', () => {
        expect(dateUtils.calculateEndingDate('week', '20230701')).toBe('20230707');
    });
    it('should work over when the week ends in the next month', () => {
        expect(dateUtils.calculateEndingDate('week', '20230726')).toBe('20230801');
    });
    it('should return an ending date that is 1 month away (minus 1 day because of how the wikipedia API uses dates), if the duration = month', () => {
        expect(dateUtils.calculateEndingDate('month', '20230701')).toBe('20230731');
    });
    it('should work over when the sliding month ends in the next calendar month', () => {
        expect(dateUtils.calculateEndingDate('month', '20230726')).toBe('20230825');
    });
    it('should return an error if the duration is anything besides week or month', () => {
        expect(()=> {
            dateUtils.calculateEndingDate('mmmmmth', '20230701');
        }).toThrow('duration. Please change it to either the string \'month\' or the string \'day\'');
    });
});
