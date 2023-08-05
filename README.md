# Wikipedia API Wrapper

## Instructions for running an example that calls each of the 3 endpoints:
This was written using npm 18, so it's recommended that you also use that
`git clone` this repo
`cd` into the new directory
run `npm install`
run `npm run build`
run `node src/exampleRunner.ts`

## Instructions for using the API yourself:
The first step is to import the Wrapper class and create an instance of it - `const myWrapper = new Wrapper()`

There are 3 endpoints.
Each endpoint will use all or some of these 3 arguments:
- `duration` which should be either the string 'month' or the string 'week'
- `startingDate` which is the first date you are interested in. At this time, if you want a calendar week or month, you should use the first date of that week or month as your startingDate. This API will simply add 1 week or 1 month to the date you give it. The date should be in the format yyyyMMdd (20230804, for example).
- `articleId` To get the ID of the article you're interested in, you can go to wikipedia.org, search for the topic you're interested in, and grab the string used to identify the article in the url. For example, if the url is 'https://en.wikipedia.org/wiki/List_of_butterflies_of_the_Iberian_Peninsula', then `articleId = List_of_butterflies_of_the_Iberian_Peninsula`

1. mostViewedArticle
`mostViewedArticles` will give you a list of the most viewed articles for a week or a month.
It takes 2 arguments `mostViewedArticles(duration:string, startingdate:string)`.

2. articleViewCount
You can use `articleViewCount` to get the number of views for a specific article over a period of time. You can choose to get the views for either a week or a month.
articleViewCount takes all 3 arguments.
`articleViewCount(duration:string, startingDate:string, articleId:string)` 

3. dayOfMostViews
You can use `dayOfMostViews` to retrieve the day of the month where an article got the most page views
dayOfMostViews takes 2 arguments `dayOfMostViews(startingDate:string, articleId:string)`
NOTE: This call will return an array. If the highest number of views (say 500 views) happened on more than one day that month, the API will return all of those days.

## Next Steps
As this is only a practice project, I left some things undone.
If this were a project that would be used by people, here are some of the things I would do/add:

- get clarity from the project owners/stakeholders on what they would like the outputs to look like exactly (date formatting, number of articles returned from `mostViewedArticles`, etc.). And what is the ideal definition of "a month" and "a week" (a calendar month, or a sliding window of time)?

- `mostViewedArticles`: I would refactor `mostViewedArticles` so that it returns the same data structure whether you ask it for a week or a month. Also, use the new `getFromWikipediaAPI` function for getting info for a week. Also, write tests for `mostViewedArticles`.

- More error handling, possibly with even better error messaging. And checking to make sure the inputs my code receives are valid.

- Make it more typescripty! I would add some more types and interfaces for the response objects coming back from the API.