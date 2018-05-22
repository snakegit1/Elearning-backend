var request = require('request');
var config = require('../configs/servConfig');

var categories = {
    "Grammar & Punctuation": [
        "Capitalization",
        "Grammar",
        "Punctuation",
        "Punctuation Errors"
    ],
    "Writing Clarity": [
        "Collocations",
        "Miscellaneous",
        "Nonstandard Phrases",
        "Redundant Phrases",
        "Semantic",
        "Style",
        "Typography",
        "Wikipedia"
    ],
    "Spelling & Language": [
        "Commonly Confused Words",
        "Possible Typo"
    ]
};

function completeResult(body) {
    try {
        var obj = JSON.parse(body);
        obj.matches.forEach(element => {
            for (const key in categories) {
                if (categories[key].includes(element.rule.category.name)) {
                    element.rule.category.baseline = key;
                }
            }
        });
        return obj;
    } catch (e) {
        return {};
    }
};



exports.checkText = function (text, callback) {
    request.post({ url: config.langToolUrl, form: { text: text, language: config.langToolLanguage } }, (err, res, body) => {
        if (!err) {
            var res = completeResult(body);
            callback(null, res);
        } else {
            callback(err, null);
        }
    });
};