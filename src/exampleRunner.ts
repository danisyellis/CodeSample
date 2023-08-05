import Wrapper from '.';

const wrap = new Wrapper();

async function exampleOfGettingMostViewedInAWeek() {
    try {
        console.log(await wrap.getListOfMostViewed('20230701', 'week'));
    } catch (e:unknown) {
        console.log('Error calling "getListOfMostViewed"');
    }
}

async function exampleOfGettingMostViewedInAMonth() {
    try {
        console.log(await wrap.getListOfMostViewed('20230701', 'month'));
    } catch (e:unknown) {
        console.log('Error calling "getListOfMostViewed"');
    }
}

async function exampleOfGettingArticleViewCount() {
    try {
        console.log(await wrap.getViewCount('20230601', 'month', 'Yosemite_National_Park'));
    } catch (e:unknown) {
        console.log('There was an Error calling "getViewCount".');
    }
}

async function exampleOfGettingDay() {
    try {
        console.log(await wrap.getDayOfMostViews('20230701', 'Pinball'));
    } catch (e:unknown) {
        console.log('There was an Error calling "dayOfMostViews"');
    }
}

exampleOfGettingMostViewedInAWeek();
exampleOfGettingMostViewedInAMonth();
exampleOfGettingArticleViewCount();
exampleOfGettingDay();
