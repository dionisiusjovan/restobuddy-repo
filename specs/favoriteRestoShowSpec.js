import FavoriteRestoIdb from '../src/scripts/data/database'
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restos/favorite-resto-search-view'
import FavoriteRestoShowPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-show-presenter'

describe('Showing all favorite restos', () => {
  let view

  const renderTemplate = _ => {
    view = new FavoriteRestoSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  beforeEach(() => {
    renderTemplate()
  })

  describe('When no restos have been liked', () => {
    it('should ask for the favorite movies', () => {
      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)

      new FavoriteRestoShowPresenter({ view, favoriteRestos })

      expect(favoriteRestos.getAllRestos).toHaveBeenCalledTimes(1)
    })
    it('should show the information that no restos have been liked', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto-item__not__found').length)
          .toEqual(1)

        done()
      })

      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)
      favoriteRestos.getAllRestos.and.returnValues([])

      new FavoriteRestoShowPresenter({ view, favoriteRestos })
    })
  })
  describe('When favorite restos exist', () => {
    it('should show the restos', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto-item').length).toEqual(2)
        done()
      })

      const favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)
      favoriteRestos.getAllRestos.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, pictureId: 'Sebuah film A', city: 'Jakarta Utara'
        },
        {
          id: 22, name: 'B', rating: 4, pictureId: 'Sebuah film B', city: 'Jakarta Selatan'
        }
      ])

      new FavoriteRestoShowPresenter({ view, favoriteRestos })
    })
  })
})
