angular.module('pitayadbApp', [])
    .controller('PitayaDbController', function () {
        var pitayaDB = this

        pitayaDB.databases_view = true
	pitayaDB.stats_view = false
    })
