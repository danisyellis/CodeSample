import Wrapper from '.';

const wrap = new Wrapper();

// async function exampleOfGettingMostViewed() {
//     console.log(await wrap.mostViewedArticle('day', 'hi'));
// }

// async function exampleOfGettingArticleViewCount() {
//     console.log(await wrap.articleViewCount('week', '20230701', 'Pinball'));
// }
//5058

async function exampleOfGettingDay() {
    console.log(await wrap.dayOfMostViews('20230701', 'Pinball'));
}

//exampleOfGettingMostViewed();
// exampleOfGettingArticleViewCount();
exampleOfGettingDay();
