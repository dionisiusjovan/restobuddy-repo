import API_ENDPOINT from '../globals/api-endpoint'

class DataSource {
  static async popularResto () {
    const response = await fetch(API_ENDPOINT.POPULAR)
    const responseJson = await response.json()
    if (!responseJson.error) return responseJson.restaurants
    else return responseJson.message
  }

  static async detailResto (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
    const responseJSON = await response.json()
    if (!responseJSON.error) return responseJSON.restaurant
    else return responseJSON.message
  }

  static async searchResto (query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query))
    const responseJSON = await response.json()
    if (!responseJSON.error) return responseJSON.restaurants
    else return responseJSON.message
  }

  static async addNewReview (dataJSON) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataJSON)
    })
    const responseJSON = await response.json()
    if (!responseJSON.error) return responseJSON.message
    else return responseJSON.message
  }
}

export default DataSource
