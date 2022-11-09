
export let UserProfile = {

    get imageUrl() {
        return this._imageUrl
    },

    set imageUrl(value) {
        this._imageUrl = value
    },

    get name() {
        return this._name
    },

    set name(value) {
        this._name = value
    },

    get gender() {
        return this._gender
    },

    set gender(value) {
        this._gender = value
    },

    get genderType() {
        return this._genderType
    },

    set genderType(value) {
        this._genderType = value
    },

    get birthday() {
        return this._birthday
    },

    set birthday(value) {
        this._birthday = value
    },

    get height() {
        return this._height
    },

    set height(value) {
        this._height = value
    },

    get weight() {
        return this._weight
    },

    set weight(value) {
        this._weight = value
    }
}