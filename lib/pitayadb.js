'use strict'

let Storage = require('./storage').Storage
let Database = require('./database').Database

/**
 * Main class that aims to manage the databases.
 */
class PitayaDB {

    constructor(base) {
        this.base = base
        this.storage = new Storage(this.base)
        this.databases = new Set()
    }

    init() {
        return this.storage.load('databases.json')
            .then(  data => this.databases = new Set(JSON.parse(data).databases) )
            .catch( err  => console.warn('Unable to read databases.json, start with an empty list') )
            .then(  ()   => Promise.resolve() )
    }

    listDatabases() {
        return Array.from(this.databases)
    }

    deleteDatabase(dbName) {
        console.info('Delete DB ' + dbName)
        if (this.databases.has(dbName)) {
            this.databases.delete(dbName);
            return this.storage.save('databases.json', JSON.stringify({databases:Array.from(this.databases)}))
        }
        throw new Error('Database does not exist')
    }

    createDatabase(dbName) {
        console.info('Create DB ' + dbName)
        if (!this.databases.has(dbName)) {
            let db = new Database(dbName)
            this.databases.add(dbName)
            return this.storage.createDir(dbName)
                .then( () => this.storage.save('databases.json', JSON.stringify({databases:Array.from(this.databases)})))
                .then( () => Promise.resolve(db))
        }
        throw new Error('Database already exists')
    }
}

module.exports.PitayaDB = PitayaDB

