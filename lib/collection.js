'use strict'

let intformat = require('biguint-format')
let FlakeId = require('flake-idgen')
let flakeId = new FlakeId()

const IN_MEMORY = 'in-memory'
const ON_DISK = 'on-disk'

/**
 * Contains data.
 */
class Collection {

    constructor(db, name) {
        this.db = db
        this.name = name
        this.documents = new Map()
    }

    count() {
        return this.documents.size()
    }

    insert(doc, options) { // options : { ack_when: 'in-memory' or 'on-disk' }
        if (doc) {
            options = options ? options : { ack_when: IN_MEMORY }
            doc._db = this.db.name
            doc._collection = this.name
            if (!doc._version) {
                doc._version = 1
            }
            else {
               doc._version++
            }
            if (!doc._id) { // No _id, we provide one
                doc._id = intformat(flakeId.next(), 'dec')
            }
            this.documents.set(doc._id, doc)
            if (options.ack_when === IN_MEMORY) {
                console.log('Insert doc: ' + doc._id)
                return Promise.resolve(doc._id)
            }
            else {
                throw new Error('Not supported')
            }
        }
        throw new Error('Empty doc')
    }

    update(doc, options) {
        // The doc must contain an _id field
        //
        if (!doc || !doc._id) {
            throw new Error('No doc or no _id')
        }

        let currentDoc = this.documents.get(doc._id)

        if (!currentDoc) {
            return insert(doc, options)
        }

        // Check if '_version' is present : if yes, compare the value with the one in db
        // - if it is the same : continue the process
        // - if it is not the same : stop the process and throw an error
        //
        if (doc._version && doc._version !== currentDoc._version) {
            throw new Error('Mismatched version: ' + doc._version + ' vs ' + currentDoc._version)
        }

        return insert(doc, options)
    }

    delete(docId) {
        return this.documents.delete(docId)
    }

    get(docId) {
        return this.documents.get(docId)
    }
}

module.exports.Collection = Collection
