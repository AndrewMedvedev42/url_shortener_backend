const shortId = require("shortid");

//Generate uniqe ID for the shorten url
const generateUrlKey = () => shortId.generate();

module.exports = { generateUrlKey: generateUrlKey }; 