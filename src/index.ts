import axios from 'axios';

export type ArticleData = {
    timestamp: string;
    views: number;
}
export default class Wrapper {
    // constructor() {
    //decide whether user will want to pass in duration and articleId once for all 3 functions, or if they should be passed separately each time
    // }
    async mostViewedArticle(duration:string): Promise<string[]> {
        const mostViewed = [''];
        // if (duration === 'month') {
        //     console.log('m');
        // } else if (duration === 'week') {
        //     console.log('m');
        // }

        return mostViewed;
    }
    async articleViewCount(duration:string, articleId:string): Promise<number> {
        // TODO: USE DATES
        // TODO: document how to get the articleId for passing in
        const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/de.wikipedia/all-access/user/${articleId}/daily/2015101300/2015102700`;

        const response = await axios.get(url);
        console.log(response.data);
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

        return currentHighest.timestamp;

        //loop through response
        // for each, if views > currentHighest.views, replace info
        //if views === then add to the object

        // At then end, make sure to return as many as are in the object

        // get clarity on "day of the month" and how to format the date that's being returned. Timezones?
        //return 'day';
    }

    getArticleViewCount(article:any):number {
        return article.views;
    }

    getArticleData(article:any): ArticleData {
        return { timestamp: article.timestamp, views: article.views };
    }
}
