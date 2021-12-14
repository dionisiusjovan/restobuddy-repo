import DataSource from '../../data/data-source'
import { restoItemTemplate } from '../templates/template-creator'

const Popular = {
  async render () {
    return `
        <search-bar></search-bar>
        <div class="search-content" id="searchResultContainer">
            <h2 class="content__heading">Search Results</h2>
            <p id="result_counter">Counter</p>
            <resto-list class="restos"></resto-list>
        </div>
        <div class="content">
            <h2 class="content__heading">Popular Resto</h2>
            <div id="restos" class="restos">
    
            </div>
        </div>
        `
  },

  async afterRender () {
    const restos = await DataSource.popularResto()
    const restosContainer = document.querySelector('#restos')
    restos.forEach(resto => {
      restosContainer.innerHTML += restoItemTemplate(resto)
    })

    const searchElement = document.querySelector('search-bar')
    const searchResultContainer = document.querySelector('#searchResultContainer')
    const restoListElement = document.querySelector('resto-list')
    searchElement.style.display = 'block'

    searchElement.addEventListener('change', _ => {
      if (!searchElement.value) searchResultContainer.style.display = 'none'
      else searchResultContainer.style.display = 'block'
    })
    const onButtonSearchClicked = _ => {
      const renderResult = results => {
        if (searchResultContainer.style.display === 'none') searchResultContainer.style.display = 'block'
        restoListElement.restos = results
        document.getElementById('result_counter').innerText = `${results.length} resto ditemukan...`
      }
      const fallbackResult = errormsg => { restoListElement.renderError(errormsg) }
      DataSource.searchResto(searchElement.value).then(renderResult).catch(fallbackResult)
    }
    searchElement.clickEvent = onButtonSearchClicked
  }
}

export default Popular
