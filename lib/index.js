'use strict'

/**
 * Index contains the link between a document key and the store that holds the value.
 */
Class Index {

    constructor(collection, storage) {
        this.collection = collection
	this.keyStore = new Map()
	this.load()
    }

    getStore(key) {
        return this.keyStore(key)
    }

    addKey(key, store) {
        this.keyStore.put(key, store)
    }

    load() {
    () {
            this.logger.info('PitayaDB init...')
	            return this.storage.load('databases.json')
		                .then(  data => this.databases = new Set(JSON.parse(data).databases) )
				            .catch( err  => this.logger.warn('Unable to read databases.json, start with an empty list') )
					                .then(  ()   => Promise.resolve(this) )
							    }
    }
}

