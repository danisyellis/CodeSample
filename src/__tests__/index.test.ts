import Wrapper from '..';

const mockedAPIResults = { data: { items: [
    { timestamp: '2015101700', views: 2305 },
    { timestamp: '2015101800', views: 2739 },
    { timestamp: '2015101900', views: 3344 },
    { timestamp: '2015102000', views: 3068 },
    { timestamp: '2015102100', views: 3048 },
    { timestamp: '2015102200', views: 1001 },
    { timestamp: '2015102300', views: 2315 },
] } };
class mockWrapper extends Wrapper {
    public async getFromWikipediaAPI() {
        return mockedAPIResults;
    }
}

const mockedAPIResultsWith2HighestDays = { data: { items: [
    { timestamp: '2015101700', views: 2305 },
    { timestamp: '2015101800', views: 2739 },
    { timestamp: '2015101900', views: 3344 },
    { timestamp: '2015102000', views: 3068 },
    { timestamp: '2015102100', views: 3048 },
    { timestamp: '2015102200', views: 3344 },
    { timestamp: '2015102300', views: 2315 },
] } };

class mockWrapperForMultipleHighestViewDays extends Wrapper {
    public async getFromWikipediaAPI() {
        return mockedAPIResultsWith2HighestDays;
    }
}

describe('articleViewCount can get the number of views for a specific article over a period of time', () => {
    it('can get the correct number of views for an article over the course of a week', async () => {
        const fakeWrapper = new mockWrapper();
        const fakeResult = await fakeWrapper.articleViewCount('week', '2015101700', 'fakeArticle');
        expect(fakeResult).toBe(17820);
    });
});

describe('getting the day that an article had the most views', () => {
    it('should return the date with the highest number of views', async () => {
        const fakeWrapper = new mockWrapper();
        const fakeResult = await fakeWrapper.dayOfMostViews('2015101700', 'fakeArticle');
        expect(JSON.stringify(fakeResult)).toBe(JSON.stringify(['October 19, 2015']));
    });
    it('should return multiple dates if more than one day has the highest number of views', async () => {
        const fakeWrapper = new mockWrapperForMultipleHighestViewDays();
        const fakeResult = await fakeWrapper.dayOfMostViews('2015101700', 'fakeArticle');
        expect(JSON.stringify(fakeResult)).toBe(JSON.stringify(['October 19, 2015', 'October 22, 2015']));
    });
});

//Placeholder for tests I didn't write for mostViewedArticle

// describe('', () => {
//     it('', () => {
//         expect().toBe();
//     });
// });
