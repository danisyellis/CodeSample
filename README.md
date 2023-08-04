Instructions for running an example that calls each of the 3 endpoints:
`git clone` this repo
`cd` into the new directory
run `npm install`
run `node src/exampleRunner.ts`

Instructions for using the API yourself:
The first step is to import the Wrapper class and create an instance of it - `const myWrapper = new Wrapper()`
There are 3 endpoints.

1. mostViewedArticle

2. articleViewCount
You can use articleViewCount to get the view count of a specific article for a week, or a month.
articleViewCount takes 3 arguments.
- `duration` which should be either the string 'month' or the string 'week'
- `startingDate` which is __________
- `articleId` To get the ID of the article you're interested in, you can go to wikipedia.org, search for the topic you're interested in, and grab the string used to identify the article in the url. For example, if the url is 'https://en.wikipedia.org/wiki/List_of_butterflies_of_the_Iberian_Peninsula', then `articleId = List_of_butterflies_of_the_Iberian_Peninsula` 

3. dayOfMostViews



*Note: For this MVP, you will want the starting date to be the first day of the week or month that you are interested in.*