'use strict'

class HistoryHandler {

    constructor() {

    }

    forward() {
        history.forward()
    }
    back() {
        history.back()
    }

    go() {

        let value = $('#goCount').val()
        history.go(parseInt(value))
    }

}
var historyHandler = new HistoryHandler()