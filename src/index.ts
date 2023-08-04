import axios from 'axios';
import { DateTime } from 'luxon';
import DateUtils from './DateUtils';
const dateUtils = new DateUtils();
//import {calculateEndingDate} from 'DateUtils.js';

export type ArticleData = {
    timestamp: string;
    views: number;
}
export default class Wrapper {
    // constructor() {
    //decide whether user will want to pass in duration and articleId once for all 3 functions, or if they should be passed separately each time
    // }
    async mostViewedArticle(duration:string, startdate: string): Promise<string[]> {
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

    async dayOfMostViews(articleId:string):Promise<Array<string>> {
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/${articleId}/daily/2015101300/2015102700`;
        const response = await axios.get(url);

        const arrayOfTimestamps: Array<string> = [];
        const currentHighest = { timestamp: arrayOfTimestamps, views: 0 };
        const arrayOfArticleData = response.data.items.map(this.getArticleData);
        console.log(currentHighest, arrayOfArticleData);

        arrayOfArticleData.forEach((articleData: ArticleData) => {
            if (articleData.views > currentHighest.views) {
                while (currentHighest.timestamp.length > 0) {
                    currentHighest.timestamp.pop();
                }
                currentHighest.timestamp[0] = articleData.timestamp;
                currentHighest.views = articleData.views;
            } else if (articleData.views === currentHighest.views) {
                currentHighest.timestamp.push(articleData.timestamp);
            }
        });
        //console.log(startDate.toFormat('MMMM dd, yyyy'));

        return currentHighest.timestamp;

        //loop through response
        // for each, if views > currentHighest.views, replace info
        //if views === then add to the object

        // At then end, make sure to return as many as are in the object

        // get clarity on "day of the month" and how to format the date that's being returned. Timezones?
        //return 'day';
    }

    private getArticleViewCount(article:any):number {
        return article.views;
    }

    private getArticleData(article:any): ArticleData {
        return { timestamp: article.timestamp, views: article.views };
    }
}
