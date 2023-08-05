import Wrapper from '.';

const wrap = new Wrapper();

async function exampleOfGettingMostViewedInAWeek() {
    try {
        console.log(await wrap.mostViewedArticles('week', '20230701'));
    } catch (e:unknown) {
        console.log('Error calling "mostViewedArticle"');
    }
}

async function exampleOfGettingMostViewedInAMonth() {
    try {
        console.log(await wrap.mostViewedArticles('month', '20230701'));
    } catch (e:unknown) {
        console.log('Error calling "mostViewedArticle"');
    }
}

async function exampleOfGettingArticleViewCount() {
    try {
        console.log(await wrap.articleViewCount('month', '20230601', 'Yosemite_National_Park'));
    } catch (e:unknown) {
        console.log('There was an Error calling "articleViewCount".');
    }
}

async function exampleOfGettingDay() {
    try {
        console.log(await wrap.dayOfMostViews('20230701', 'Pinball'));
    } catch (e:unknown) {
        console.log('There was an Error calling "dayOfMostViews"');
    }
}

exampleOfGettingMostViewedInAWeek();
exampleOfGettingMostViewedInAMonth();
exampleOfGettingArticleViewCount();
exampleOfGettingDay();
