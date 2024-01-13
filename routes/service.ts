const validate = require("validate.js");
const ShortUniqueId = require("short-unique-id");

const validateUrl = (url = "") => {
    return validate({ website: url }, {
        website: {
            url: {
                allowLocal: true
            }
        }
    });
}

const generateUrlKey = () => new ShortUniqueId({ length: 6 });

module.exports = { validateUrl, generateUrlKey: generateUrlKey }; 