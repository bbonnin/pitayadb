'use strict'

let ColoredLogger = require('../lib/logging').ColoredLogger
let PitayaDB = require('../lib/pitayadb').PitayaDB

let logger = new ColoredLogger()
let mydb = new PitayaDB('0.0.0.0', 6504, '/tmp/db/test', logger)

mydb.init()
    .then( () => mydb.deleteDatabase('test'))
    .catch( err => logger.error('Delete db: ' + err))
    .then( () => mydb.createDatabase('test'))
    .then( db => {
        logger.info('Database created: ' + db.name)
        return db.collection('test').insert({hello:'world'})
    })
    .then( docId => logger.info('Doc inserted: ' + docId))
    .catch( err => logger.error('Something wrong happened: ' + err))
