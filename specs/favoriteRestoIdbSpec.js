import { itActsAsFavoriteRestoModel } from './contract/favoriteRestoContract'
import FavoriteRestoIdb from '../src/scripts/data/database'

describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoIdb.getAllRestos()).forEach(async (resto) => {
      await FavoriteRestoIdb.deleteResto(resto.id)
    })
  })

  itActsAsFavoriteRestoModel(FavoriteRestoIdb)
})
