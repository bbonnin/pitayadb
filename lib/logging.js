'use strict'

let colors = require('colors')

class ColoredLogger {

    constructor() {
        this.log = console.log
    }

    now() {
        return new Date().toUTCString()
    }

    error(msg) {
        this.log('[%s] ERROR : %s', this.now(), msg.red)
    }

    warn(msg) {
        this.log('[%s] WARN  : %s', this.now(), msg.yellow)
    }

    info(msg) {
        this.log('[%s] INFO  : %s', this.now(), msg.cyan)
    }
}

class SilentLogger {

    constructor() {
    }

    error(msg) {
    }

    warn(msg) {
    }

    info(msg) {
    }
}

module.exports.SilentLogger = SilentLogger
module.exports.ColoredLogger = ColoredLogger
