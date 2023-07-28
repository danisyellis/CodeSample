import Wrapper from '.';

const wrap = new Wrapper();

async function exampleOfGettingArticleViewCount() {
    console.log(await wrap.articleViewCount('day', 'Johann_Wolfgang_von_Goethe'));
}

exampleOfGettingArticleViewCount();
