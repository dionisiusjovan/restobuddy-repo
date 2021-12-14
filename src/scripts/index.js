import 'regenerator-runtime' /* for async await transpile */
import '../styles/main.css'
import '../styles/responsive.css'
import '../scripts/component/resto-list.js'
import '../scripts/component/search-bar.js'
import App from './views/app'
import swRegister from './utils/sw-register'

const hamburgerBtn = document.querySelector('#hamburgerButton')
const mainContent = document.querySelector('#mainContent')
const navDrawer = document.querySelector('#navigationDrawer')

const app = new App({
  button: hamburgerBtn,
  drawer: navDrawer,
  content: mainContent
})

window.addEventListener('hashchange', () => {
  // searchElement.style.display = 'none'
  // searchResultContainer.style.display = 'none'
  // document.querySelector('search-bar').value = ''
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})
