const axios = require('axios')
const key = "&apiKey=3de8c4841f374df1948cc06d7b299022"
class newsController {

  static headline(req, res) {
    let country = req.query.country || 'id'
    axios.get('https://newsapi.org/v2/top-headlines?country='+ country + key)
      .then(response => {
        res.send(response.data)
      })
      .catch(err => res.status(500).send(err))
  }



  static search(req, res) { 
    let url = 'https://newsapi.org/v2/everything?q=' +
              req.query.q +
              '&sortBy=publishedAt' +
              key

    axios.get(url)
      .then(response => res.send(response.data))
      .catch((err) => res.status(500).send(err))
  }


}

module.exports = newsController;