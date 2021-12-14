const assert = require('assert')
Feature('Review Restos')

Before(({ I }) => {
  I.amOnPage('/')
})
Scenario('reviewing one resto', async ({ I }) => {
  I.amOnPage('/')

  I.seeElement('.resto__name a')
  I.click(locate('.resto__name a').first())

  const username = 'wqeas-01'
  const review = 'cobain review 1'
  I.seeElement('#username')
  I.fillField('#username', username)
  I.seeElement('textarea[name=review]')
  I.fillField('textarea[name=review]', review)
  I.click('#sendReview')

  I.wait(2)
  I.refreshPage()

  const latestReviewUsername = locate('.resto-review__item h4').last()
  const latestReviewUsernameValue = await I.grabTextFrom(latestReviewUsername)

  assert.strictEqual(username, latestReviewUsernameValue)
})
