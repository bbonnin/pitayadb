'use strict'

let MyNoSqlDB = require('./lib/mynosqldb').MyNoSqlDB

let mynosql = new MyNoSqlDB('/tmp/db/test')

mynosql.init()
    .then( () => mynosql.deleteDatabase('test'))
    .then( () => mynosql.createDatabase('test'))
    .then( db => {
        console.info('Database created: ' + db.name)
        return db.collection('test').insert({hello:'world'})
    })
    .then( docId => console.info('Doc inserted: ' + docId))
    .catch( err => console.error('Something wrong happened: ' + err))
