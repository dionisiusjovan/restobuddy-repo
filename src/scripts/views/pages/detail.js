import DataSource from '../../data/data-source'
import FavoriteRestoIdb from '../../data/database'
import UrlParser from '../../routes/url-parser'
import LikeButtonPresenter from '../../utils/like-button-presenter'
import { restoDetailTemplate } from '../templates/template-creator'

const Detail = {
  async render () {
    return `
        <div id="resto" class="resto"></div>
        <div id="likeButtonContainer"></div>
      `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const resto = await DataSource.detailResto(url.id)
    const restoContainer = document.querySelector('#resto')
    restoContainer.innerHTML = restoDetailTemplate(resto)

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestos: FavoriteRestoIdb,
      resto: {
        id: resto.id,
        name: resto.name,
        pictureId: resto.pictureId,
        rating: resto.rating,
        city: resto.city
      }
    })

    document.querySelector('#sendReview').addEventListener('click', _ => {
      const formData = new FormData(document.querySelector('#addReview'))
      const object = {}
      for (const pair of formData.entries()) {
        object[pair[0]] = pair[1]
      }
      DataSource.addNewReview(object).then(resp => {
        if (resp === 'success') location.reload(true)
      }).catch(err => alert(err))
    })
  }
}

export default Detail
