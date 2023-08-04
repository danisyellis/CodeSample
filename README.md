Instructions for running an example that calls each of the 3 endpoints:
`git clone` this repo
`cd` into the new directory
run `npm install`
run `npm run build`
run `node src/exampleRunner.ts`

Instructions for using the API yourself:
The first step is to import the Wrapper class and create an instance of it - `const myWrapper = new Wrapper()`
There are 3 endpoints.
Each endpoint will use all or some of these 3 arguments:
- `duration` which should be either the string 'month' or the string 'week'
- `startingDate` which is the first date you are interested in. At this time, if you want a calendar week or month, you should use the first date of that week or month as your startingDate. This API will simply add 1 week or 1 month to the date you give it.
- `articleId` To get the ID of the article you're interested in, you can go to wikipedia.org, search for the topic you're interested in, and grab the string used to identify the article in the url. For example, if the url is 'https://en.wikipedia.org/wiki/List_of_butterflies_of_the_Iberian_Peninsula', then `articleId = List_of_butterflies_of_the_Iberian_Peninsula`

1. mostViewedArticle

2. articleViewCount
You can use `articleViewCount` to get the number of views for a specific article over a period of time. You can choose to get the views for either a week or a month.
articleViewCount takes all 3 arguments.
`articleViewCount(duration:string, startingDate:string, articleId:string)` 

3. dayOfMostViews
You can use `dayOfMostViews` to retrieve the day of the month where an article got the most page views
dayOfMostViews takes 2 arguments `dayOfMostViews(startingDate:string, articleId:string)`
NOTE: This call will return an array. If the highest number of views (say 500 views) happened on more than one day that month, the API will return all of those days.
