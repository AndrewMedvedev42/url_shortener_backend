const axios = require("axios");

//Check if url is safe using Google Safe Browsing
module.exports = async function isGoogleSafeBrowse (url) {
    try {
      await axios.post(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_KEY}`,
        {
          "client": {
            "clientId":`andrew`,
            "clientVersion": "1.5.2"
          },
          "threatInfo": {
            "threatEntries": [
              {"url": `${url}`}
            ]
          }
        }
      ).catch(err => {
        throw new Error("Validation failed")
      });
        return true
    } catch (err){
        return false
    }
}
