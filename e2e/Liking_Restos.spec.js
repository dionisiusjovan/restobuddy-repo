const assert = require('assert')
Feature('Liking Restos')

Before(({ I }) => {
  I.amOnPage('/#/favorite')
})

Scenario('Show empty liked restos', ({ I }) => {
  I.seeElement('#query')
  I.see('Tidak ada Resto untuk ditampilkan', '.resto-item__not__found')
})

Scenario('liking one resto', ({ I }) => {
  I.see('Tidak ada Resto untuk ditampilkan', '.resto-item__not__found')

  I.amOnPage('/')

  I.seeElement('.resto__name a')
  I.click(locate('.resto__name a').first())

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.resto-item')
})

Scenario('liking one resto', async ({ I }) => {
  I.see('Tidak ada Resto untuk ditampilkan', '.resto-item__not__found')

  I.amOnPage('/')

  I.seeElement('.resto__name a')

  const firstResto = locate('.resto__name a').first()
  const firstRestoName = await I.grabTextFrom(firstResto)
  I.click(firstResto)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.resto-item')
  const likedRestoName = await I.grabTextFrom('.resto__name')

  assert.strictEqual(firstRestoName, likedRestoName)
})

Scenario('unliking one favorite resto', async ({ I }) => {
  I.amOnPage('/')

  I.seeElement('.resto__name a')
  I.click(locate('.resto__name a').first())

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.resto__name a')

  I.click(locate('.resto__name a').first())
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.see('Tidak ada Resto untuk ditampilkan', '.resto-item__not__found')
})

Scenario('searching restos', async ({ I }) => {
  I.see('Tidak ada Resto untuk ditampilkan', '.resto-item__not__found')

  I.amOnPage('/')

  I.seeElement('.resto__name a')

  const titles = []

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.resto__name a').at(i))
    I.seeElement('#likeButton')
    I.click('#likeButton')
    titles.push(await I.grabTextFrom('.resto__title'))
    I.amOnPage('/')
  }

  I.amOnPage('/#/favorite')
  I.seeElement('#query')

  const searchQuery = titles[1].substring(1, 3)
  const matchingRestos = titles.filter((title) => title.indexOf(searchQuery) !== -1)

  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  const visibleLikedResto = await I.grabNumberOfVisibleElements('.resto-item')
  assert.strictEqual(matchingRestos.length, visibleLikedResto)

  matchingRestos.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.resto__name').at(index + 1))
    assert.strictEqual(title, visibleTitle)
  })
})
