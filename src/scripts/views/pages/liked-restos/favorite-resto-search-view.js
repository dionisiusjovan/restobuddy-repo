import { restoItemTemplate } from '../../templates/template-creator'

class FavoriteRestoSearchView {
  getTemplate () {
    return `
          <div class="content">
            <div class="query-wrapper">
              <input id="query" type="text" placeholder="Search for Favorite Resto 🔍">
            </div>
            <h2 class="content__heading">Your Favorite Resto</h2>
                <div id="restos" class="restos">
                </div>
          </div>
          `
  }

  runWhenUserIsSearching (callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showRestos (restos) {
    this.showFavoriteRestos(restos)
  }

  showFavoriteRestos (restos = []) {
    let html
    if (restos.length) {
      html = restos.reduce((carry, resto) => carry.concat(restoItemTemplate(resto)), '')
    } else {
      html = this._getEmptyRestoTemplate()
    }
    document.getElementById('restos').innerHTML = html

    document.getElementById('restos').dispatchEvent(new Event('restos:updated'))
  }

  _getEmptyRestoTemplate () {
    return '<div class="resto-item__not__found restos__not__found">Tidak ada Resto untuk ditampilkan</div>'
  }
}

export default FavoriteRestoSearchView
