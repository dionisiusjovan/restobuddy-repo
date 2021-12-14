/* eslint-disable no-new */
import FavoriteRestoIdb from '../../data/database'
import FavoriteRestoSearchPresenter from './liked-restos/favorite-resto-search-presenter'
import FavoriteRestoSearchView from './liked-restos/favorite-resto-search-view'
import FavoriteRestoShowPresenter from './liked-restos/favorite-resto-show-presenter'

const view = new FavoriteRestoSearchView()

const Favorite = {
  async render () {
    return view.getTemplate()
  },

  async afterRender () {
    new FavoriteRestoShowPresenter({ view, favoriteRestos: FavoriteRestoIdb })
    new FavoriteRestoSearchPresenter({ view, favoriteRestos: FavoriteRestoIdb })
  }
}

export default Favorite
