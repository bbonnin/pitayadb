'use strict'

let Storage = require('./storage').Storage
let Database = require('./database').Database


/**
 * Main class that aims to manage the databases.
 */
class PitayaDB {

    constructor(host, port, base, logger) {
        this.base = base
        this.logger = logger
        this.storage = new Storage(this.base)
        this.databases = new Set()
    }

    init() {
        this.logger.info('PitayaDB init...')
        return this.storage.load('databases.json')
            .then(  data => this.databases = new Set(JSON.parse(data).databases) )
            .catch( err  => this.logger.warn('Unable to read databases.json, start with an empty list') )
            .then(  ()   => Promise.resolve(this) )
    }

    start() {
        //TODO: something to do ?
    }

    stop() {
        //TODO: dump data on files, stop services
    }

    listDatabases() {
        return Array.from(this.databases)
    }

    deleteDatabase(dbName) {
        this.logger.info('Delete DB ' + dbName)
        if (this.databases.has(dbName)) {
            this.databases.delete(dbName);
            return this.storage.save('databases.json', JSON.stringify({databases:Array.from(this.databases)}))
        }
        throw new Error('Database does not exist')
    }

    createDatabase(dbName) {
        this.logger.info('Create DB ' + dbName)
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

function create(host, port, dataPath, logger) {
    return new PitayaDB(host, port, dataPath, logger)
        .init()
        .then( (db) => {
            logger.info("PitayaDB started, enjoy !")
            return db
        })
}

module.exports.PitayaDB = PitayaDB
module.exports.PitayaDB.create = create


