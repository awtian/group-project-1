const axios = require('axios')

class musicController {

  static search_by(req, res) {
    let url = ``    
    if (req.query.artistName) {
      url += `https://itunes.apple.com/search?term=${req.query.artistName}&limit=50`
    }
    else if (req.query.trackName) {
      url += `https://itunes.apple.com/search?term=${req.query.trackName}&limit=50`
    }
    else if (req.query.collectionName) {
      url += `https://itunes.apple.com/search?term=${req.query.collectionName}&limit=50`
    }
    else if (req.query.musicVideo) {
      url += `https://itunes.apple.com/search?term=${req.query.q}&entity=musicVideo`
    }
    axios.get(url)
      .then(response => res.send(response.data))
      .catch((err) => res.status(500).send(err))
  }

}

module.exports = musicController;