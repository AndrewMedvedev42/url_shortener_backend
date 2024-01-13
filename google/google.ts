const axios = require("axios");

module.exports = function googleSafeBrowse(url){
    try {
        axios.post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_KEY}`,
            {
                "client": {
                  "clientId":"andrew",
                  "clientVersion": "1.5.2"
                },
                "threatInfo": {
                  "threatEntries": [
                    {"url": url}
                  ]
                }
            }
        )
            .catch(err => err);
        return true
    } catch (error) {
      return false
    }
}