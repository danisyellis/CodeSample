import axios from 'axios';

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

    async dayOfMostViews(articleId:string):Promise<string> {
        // get clarity on "day of the month" and how to format the date that's being returned
        return 'day';
    }

    getArticleViewCount(article:any):number {
        return article.views;
    }
}

// for testing - regex of the url or a number that was passed in or something
