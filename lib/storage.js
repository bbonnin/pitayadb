'use strict'

let bson = require('bson')
let fs = require('fs')
let fsp = require('fs-promise')
let path = require('path')

/**
 * Storage : in charge of loading/writing db files.
 */
class Storage {

    constructor(path) {
        this.path = path
    }

    init() {
        return fsp.mkdirs(this.path)
    }

    createDir(dirName) {
        let fullDirName = this.path + '/' + dirName
        return fsp.mkdirs(fullDirName)
    }

    load(filename) {
        let fullFilename = this.path + '/' + filename
        return fsp.readFile(fullFilename)
    }
        
    save(filename, data) {
        let fullFilename = this.path + '/' + filename
        return fsp.writeFile(fullFilename, data)
    }
}

module.exports.Storage = Storage;

