import FavoriteRestoIdb from '../../src/scripts/data/database'
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter'

const createLikeButtonPresenterWithResto = async (resto) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestos: FavoriteRestoIdb,
    resto
  })
}

export { createLikeButtonPresenterWithResto }
