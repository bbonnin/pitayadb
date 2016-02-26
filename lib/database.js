'use strict'

let Collection = require('./collection').Collection


/**
 * A database contains a set of collections.
 */
class Database {

    constructor(name) {
        this.name = name
        this.collections = new Map()
    }

    collection(name) {
        let coll = this.collections.get(name)
        if (!coll) {
            coll = new Collection(name)
            this.collections.set(name, coll)
        }
        return coll
    }

    dropCollection(name) {
        return this.collections.delete(name)
    }
}

module.exports.Database = Database
