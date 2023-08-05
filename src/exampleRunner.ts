import Wrapper from '.';

const wrap = new Wrapper();

async function exampleOfGettingMostViewed() {
    try {
        console.log(await wrap.mostViewedArticle('week', '20230701'));
    } catch (e:unknown) {
        console.log('Error calling "mostViewedArticle(\'week\', \'20230701\'))"');
    }
}

async function exampleOfGettingArticleViewCount() {
    try {
        console.log(await wrap.articleViewCount('month', '20230601', 'Yosemite_National_Park'));
    } catch (e:unknown) {
        console.log('There was an Error calling "articleViewCount(\'month\', \'202306\', \'Yosemite_National_Park)". See above for more info.');
    }
}
//5058

async function exampleOfGettingDay() {
    try {
        console.log(await wrap.dayOfMostViews('20230701', 'Pinball'));
    } catch (e:unknown) {
        console.log('There was an Error calling "dayOfMostViews(\'20230701\', \'Pinball\')". See above for more info.');
    }
}
//[ 'July 09, 2023', 'July 17, 2023', 'July 19, 2023', 'July 29, 2023' ]

exampleOfGettingMostViewed();
exampleOfGettingArticleViewCount();
exampleOfGettingDay();
