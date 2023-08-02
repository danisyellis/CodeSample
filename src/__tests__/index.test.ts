import Wrapper from '..';

const testWrap = new Wrapper();

// for testing - regex of the url or a number that was passed in or something
const mockedAPIResults = [
    { timestamp: '2015101700', views: 2305 },
    { timestamp: '2015101800', views: 2739 },
    { timestamp: '2015101900', views: 3344 },
    { timestamp: '2015102000', views: 3068 },
    { timestamp: '2015102100', views: 3048 },
    { timestamp: '2015102200', views: 1001 },
    { timestamp: '2015102300', views: 2315 },
]; //(to be returned by a mocked out getArticleData)

const mockedAPIResultsWith2HighestDays = [
    { timestamp: '2015101700', views: 2305 },
    { timestamp: '2015101800', views: 2739 },
    { timestamp: '2015101900', views: 3344 },
    { timestamp: '2015102000', views: 3068 },
    { timestamp: '2015102100', views: 3048 },
    { timestamp: '2015102200', views: 3344 },
    { timestamp: '2015102300', views: 2315 },
];

test('naive articleViewCount implementation', async () => {
    const result = await testWrap.articleViewCount('day', 'Johann_Wolfgang_von_Goethe');
    expect(result).toBe(42622);
});

describe('getting the day that an article had the most views', () => {
    it('should return the date with the highest number of views', async () => {
        const result = await testWrap.dayOfMostViews('Johann_Wolfgang_von_Goethe');
        expect(result).toBe(['2015101900']);
    });
});
// test the date if just one has the highest views
// test the date if multiple have the highest
