import Wrapper from '.';

const wrap = new Wrapper();

async function exampleOfGettingMostViewed() {
    console.log(await wrap.mostViewedArticle('week', '20230701'));
}

async function exampleOfGettingArticleViewCount() {
    console.log(await wrap.articleViewCount('month', '20230601', 'Yosemite_National_Park'));
}
//5058

async function exampleOfGettingDay() {
    console.log(await wrap.dayOfMostViews('20230701', 'Pinball'));
}
//[ 'July 09, 2023', 'July 17, 2023', 'July 19, 2023', 'July 29, 2023' ]

exampleOfGettingMostViewed();
exampleOfGettingArticleViewCount();
exampleOfGettingDay();
