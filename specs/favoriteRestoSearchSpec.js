import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restos/favorite-resto-search-presenter'
import FavoriteRestoIdb from '../src/scripts/data/database'
import FavoriteRestoSearchView from '../src/scripts/views/pages/liked-restos/favorite-resto-search-view'

describe('Searching resto', () => {
  let presenter
  let favoriteRestos
  let view

  const setRestoSearchContainer = () => {
    view = new FavoriteRestoSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  const constructPresenter = () => {
    // spyOn(FavoriteRestoIdb, 'searchRestos')
    favoriteRestos = spyOnAllFunctions(FavoriteRestoIdb)
    presenter = new FavoriteRestoSearchPresenter({ favoriteRestos, view })
  }

  beforeEach(() => {
    setRestoSearchContainer()
    constructPresenter()
  })

  const searchRestos = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestos('resto a')

      expect(presenter.latestQuery)
        .toEqual('resto a')
    })
    it('should ask the model to search for liked restos', () => {
      searchRestos('resto a')

      expect(favoriteRestos.searchRestos)
        .toHaveBeenCalledWith('resto a')
    })
    it('should show the found restos', () => {
      presenter._showFoundRestos([{ id: 1 }])
      const foundRestos = document.querySelectorAll('.resto-item')
      expect(foundRestos.length).toEqual(1)

      presenter._showFoundRestos([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }])
      expect(document.querySelectorAll('.resto-item').length).toEqual(2)
    })
    it('should show the name of the found restos', () => {
      presenter._showFoundRestos([{ id: 1, name: 'Satu' }])
      expect(document.querySelectorAll('.resto__name').item(0).textContent)
        .toEqual('Satu')

      presenter._showFoundRestos(
        [{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }]
      )

      const restoNames = document.querySelectorAll('.resto__name')
      expect(restoNames.item(0).textContent).toEqual('Satu')
      expect(restoNames.item(1).textContent).toEqual('Dua')
    })
    // it('should show - for found resto without name', () => {
    //   presenter._showFoundRestos([{ id: 1 }])

    //   expect(document.querySelectorAll('.resto__name').item(0).textContent)
    //     .toEqual('-')
    // })
    it('should show the resto found by Favorite Restos', (done) => {
      document.getElementById('restos')
        .addEventListener('restos:updated', () => {
          const restoNames = document.querySelectorAll('.resto__name')
          expect(restoNames.item(0).textContent).toEqual('resto abc')
          expect(restoNames.item(1).textContent).toEqual('ada juga resto abcde')
          expect(restoNames.item(2).textContent).toEqual('ini juga boleh resto a')

          done()
        })
      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([
        { id: 111, name: 'resto abc' },
        { id: 222, name: 'ada juga resto abcde' },
        { id: 333, name: 'ini juga boleh resto a' }
      ])

      searchRestos('resto a')
    })
  })

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestos(' ')
      expect(presenter.latestQuery.length).toEqual(0)
      searchRestos('     ')
      expect(presenter.latestQuery.length).toEqual(0)
      searchRestos('')
      expect(presenter.latestQuery.length).toEqual(0)
      searchRestos('\t')
      expect(presenter.latestQuery.length).toEqual(0)
    })
    it('should show all favorite restos', () => {
      searchRestos('    ')

      expect(favoriteRestos.getAllRestos).toHaveBeenCalledTimes(1)
    })
  })

  describe('When no favorite restos could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restos')
        .addEventListener('restos:updated', () => {
          expect(document.querySelectorAll('.resto-item__not__found').length)
            .toEqual(1)
          done()
        })

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([])

      searchRestos('resto a')
    })
    it('should not show any resto', (done) => {
      document.getElementById('restos').addEventListener('restos:updated', () => {
        expect(document.querySelectorAll('.resto').length).toEqual(0)
        done()
      })

      favoriteRestos.searchRestos.withArgs('resto a').and.returnValues([])

      searchRestos('resto a')
    })
  })
})
