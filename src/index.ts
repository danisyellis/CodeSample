import axios from 'axios';
//import { DateTime } from 'luxon';
import DateUtils from './DateUtils';
const dateUtils = new DateUtils();

export type ArticleData = {
    timestamp: string;
    views: number;
}
export default class Wrapper {
    async mostViewedArticle(duration:string, startingdate: string): Promise<string[]> {
        const mostViewed = [''];
        // if (duration === 'month') {
        //maybe use the monthly and do only one month???
        //     console.log('m');
        // } else if (duration === 'week') {
        //     console.log('m');
        // }
        const baseUrl = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/';
        const response = await axios.get(baseUrl + '2023/01/01');
        // console.log(response.data);

        return mostViewed;
    }
    async articleViewCount(duration:string, startingDate:string, articleId:string): Promise<number> {
        const endingDate = dateUtils.calculateEndingDate(duration, startingDate);
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${articleId}/daily/${startingDate}/${endingDate}`;
        const response = await axios.get(url);
        const arrayOfViews = response.data.items.map(this.getArticleViewCount);
        const sum:number = arrayOfViews.reduce((total:number, current:number) => {
            return total + current;
        });

        return sum;
    }

    async dayOfMostViews(startingDate:string, articleId:string):Promise<Array<string>> {
        const endingDate = dateUtils.calculateEndingDate('month', startingDate);
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/${articleId}/daily/${startingDate}/${endingDate}`;
        const response = await axios.get(url);

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
}
