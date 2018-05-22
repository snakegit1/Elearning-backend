var nlp = require('compromise');

class CompromiseDOC {

    constructor(text) {
        this.doc = nlp(text);
    }

    getPeople() {
        return this.doc.people();
    }

    getPlaces() {
        return this.doc.places();
    }

    getNouns() {
        return this.doc.nouns();
    }

    getVerbs() {
        return this.doc.verbs();
    }

    getValues() {
        return this.doc.values();
    }

    getAdjectives() {
        return this.doc.adjectives();
    }

    getDates() {
        return this.doc.dates();
    }

    getHashtags() {
        return this.doc.hashtags()
    }

    getPhoneNumbers() {
        return this.doc.phoneNumbers();
    }

    getLists() {
        return this.doc.lists();
    }

    getClauses() {
        return this.doc.clauses()
    }

    getQuestions() {
        return this.doc.questions();
    }
}

module.exports = CompromiseDOC;