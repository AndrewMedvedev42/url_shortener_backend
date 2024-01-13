const axios = require("axios");

//Check if url is safe using Google Safe Browsing
module.exports = function googleSafeBrowse(url){
    try {
        axios.post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_KEY}`,
            {
                "client": {
                  "clientId":`${process.env.USER_NAME}`,
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

    } catch (err) {
      return null

    }
}