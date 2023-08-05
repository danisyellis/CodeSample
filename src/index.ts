import axios from 'axios';
import DateUtils from './DateUtils';
const dateUtils = new DateUtils();

export type ArticleData = {
    timestamp: string;
    views: number;
}
export default class Wrapper {
    async mostViewedArticles(duration:string, startingdate:string) {
        const baseUrl = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/';

        if (duration === 'month') {
            const monthToQuery = dateUtils.formatMonthForMostViewed(startingdate);
            const url = baseUrl + monthToQuery;

            return this.getMostViewedForMonth(url);
        } else if (duration === 'week') {
            return this.getMostViewedForWeek(baseUrl, startingdate);
        } else {
            throw new Error(`Error: you entered ${duration} for duration. Please change it to either the string 'month' or the string 'day'`);
        }
    }

    async articleViewCount(duration:string, startingDate:string, articleId:string): Promise<number> {
        const endingDate = dateUtils.calculateEndingDate(duration, startingDate);
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${articleId}/daily/${startingDate}/${endingDate}`;
        try {
            const response = await this.getFromWikipediaAPI(url);
            const arrayOfViews = response.data.items.map(this.getArticleViewCount);
            const sum:number = arrayOfViews.reduce((total:number, current:number) => {
                return total + current;
            });

            return sum;
        } catch (e: unknown) {
            console.error(`error getting data from this url: ${url}`);
            if (e instanceof Error) {
                const err = e as Error;
                console.error(err.message);
            } else {
                console.error(`Caught something other than an Error: ${JSON.stringify(e)}`);
            }
            throw e;
        }
    }

    async dayOfMostViews(startingDate:string, articleId:string):Promise<Array<string>> {
        const endingDate = dateUtils.calculateEndingDate('month', startingDate);
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/${articleId}/daily/${startingDate}/${endingDate}`;
        let response;

        try {
            response = await this.getFromWikipediaAPI(url);
        } catch (e: unknown) {
            console.error(`error getting data from this url: ${url}`);
            if (e instanceof Error) {
                const err = e as Error;
                console.error(err.message);
            } else {
                console.error(`Caught something other than an Error: ${JSON.stringify(e)}`);
            }
            throw e;
        }

        const arrayOfTimestamps: Array<string> = [];
        const currentHighest = { dates: arrayOfTimestamps, views: 0 };
        const arrayOfArticleData = response.data.items.map(this.getArticleData);

        arrayOfArticleData.forEach((articleData: ArticleData) => {
            if (articleData.views > currentHighest.views) {
                while (currentHighest.dates.length > 0) {
                    currentHighest.dates.pop();
                }
                currentHighest.dates[0] = articleData.timestamp;
                currentHighest.views = articleData.views;
            } else if (articleData.views === currentHighest.views) {
                currentHighest.dates.push(articleData.timestamp);
            }
        });
        const formattedDates = currentHighest.dates.map(date => {
            const slicedDate = date.slice(0, 8);
            const luxonDate = dateUtils.turnWikiDateIntoLuxonDateTime(slicedDate);

            return luxonDate.toFormat('MMMM dd, yyyy');
        });

        return formattedDates;
    }

    private getArticleViewCount(article:any):number {
        return article.views;
    }

    private getArticleData(article:any): ArticleData {
        return { timestamp: article.timestamp, views: article.views };
    }

    private async getMostViewedForMonth(url:string) {
        try {
            const response = await this.getFromWikipediaAPI(url);

            return response.data.items[0].articles;
        } catch (e: unknown) {
            console.error(`error getting data from this url: ${url}`);
            if (e instanceof Error) {
                const err = e as Error;
                console.error(err.message);
            } else {
                console.error(`Caught something other than an Error: ${JSON.stringify(e)}`);
            }
            throw e;
        }
    }

    private async getMostViewedForWeek(baseUrl: string, startingDate:string) {
        const viewTotals = new Map<string, number>();
        const startingDateAsDateTime = dateUtils.turnWikiDateIntoLuxonDateTime(startingDate);
        for (let i = 0; i < 7; i++) {
            const dateI = startingDateAsDateTime.plus({ days: i }).toFormat('yyyy/MM/dd');
            const url = baseUrl + dateI;
            const response = await axios.get(url);
            response.data.items[0].articles.forEach((a: any) => {
                if (viewTotals.has(a.article)) {
                    const currentViewsTotal = viewTotals.get(a.article);
                    viewTotals.set(a.article, currentViewsTotal + a.views);
                } else {
                    viewTotals.set(a.article, a.views);
                }
            });
        }

        const sortedArrayOfTotals = Array.from(viewTotals).sort((a, b) => b[1] - a[1]);

        return sortedArrayOfTotals;
    }

    protected async getFromWikipediaAPI(url: string):Promise<any> {
        const response = await axios.get(url);

        return response;
    }
}
