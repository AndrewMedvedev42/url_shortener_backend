const validate = require("validate.js");
import { nanoid } from 'nanoid'

const validateUrl = (url = "") => {
    return validate({ website: url }, {
        website: {
            url: {
                allowLocal: true
            }
        }
    });
}

module.exports = { validateUrl, generateUrlKey: nanoid(6)}; 