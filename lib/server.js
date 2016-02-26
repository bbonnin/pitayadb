'use strict'

const Hapi = require('hapi')
const server = new Hapi.Server()

const PitayaDB = require('./pitayadb').PitayaDB

const pitaya = new PitayaDB()
pitaya.init().
    then( () => {

        server.connection({
            host: 'localhost',
            port: 8000
        })

        server.route({
            method: 'GET',
            path: '/_dbs',
            handler: function (request, reply) {
                return reply(myDB.listDatabases())
            }
        })

        server.start( err => {
            if (err) {
                throw err
            }

            console.log('PitayaDB running at: ', server.info.uri)
        })
    })


