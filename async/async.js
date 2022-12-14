'use script'




/**
 * Shows how to use sync and setInterval/setTimeout to enable true threading.
 */
class AsyncHandler {

    ITEMS_MANY = 500000
    ITEMS_FEW = 300000

    constructor() {
        this.parent = document.getElementById('output')
    }

    /**
     * Clears all the squares and circles from the html page.
     */
    clear() {
        let elems = this.parent.querySelectorAll('.item-square, .item-circle')
        if (elems.length > 0) {
            elems.forEach((element) => {
                this.parent.removeChild(element)
            })
        }
    }

    /**
     * Runs the asynchronous version.
     */
    startAsync() {
        console.log(`Starting promises...`)

        let promise1 = this.getPromise('T1', 'item-square', this.ITEMS_MANY, 1).then((data) => {
            console.log(data)
        })

        let promise2 = this.getPromise('T2', 'item-circle', this.ITEMS_MANY, 1).then((data) => {
            console.log(data)
        })

        console.log(`Going to sleep, waiting for the tasks to complete...`)

    }

    /**
     * Returns a promise.
     */
    getPromise(id, clazz, amount, interval) {

        return Promise.resolve().then(v => {
            let counter = 0
            let elements = []

            let intervalId = setInterval(() => {
                counter++

                let randX = Math.floor(Math.random() * window.screen.availWidth);
                let randY = Math.floor(Math.random() * window.screen.availHeight);

                elements[elements.length] = this.addElementAt(randX, randY, id + counter, clazz)

                if (counter >= amount) {
                    clearInterval(intervalId)
                }
            }, interval)

            return elements
        })
    }

    /**
     * Adds a new element to the page.
     */
    addElementAt(x, y, title, clazz) {

        let elem = document.createElement('div')
        elem.classList.add(clazz)
        elem.style.left = x
        elem.style.top = y
        elem.textContent = title
        elem.style.backgroundColor = this.randomHexColor()
        this.parent.appendChild(elem)

        return elem
    }

    /**
     * Returns a random hex color.
     */
    randomHexColor() {
        const letters = '0123456789ABCDEF'.split('');
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }

        return color;
    }

    /**
     * Returns a simple promise.
     */
    getSimplePromise(name, millis) {
        return new Promise((resolve, reject) => {
            console.log(`${name}: Started`)

            if (name === 'TE') {
                reject({ id: name, message: 'Name not allowed.' })
            }

            setTimeout(() => {
                console.log(`${name}: Processing data complete.`)
                resolve({ id: name, message: 'Nice work!' })
            }, millis)
        })
    }

    /**
    * Runs in the main thread and freezes the browser.
    */
    startSync() {

        if (!confirm("This action will stall the browser, because updating the browser UI runs in the main thread.\n Do you want to continue?")) {
            return
        }

        for (let i = 0; i < this.ITEMS_FEW; i++) {
            let randX = Math.floor(Math.random() * window.screen.availWidth);
            let randY = Math.floor(Math.random() * window.screen.availHeight);
            this.addElementAt(randX, randY, 'hey', i % 2 ? 'item-square' : 'item-circle')
        }
    }
}
var asyncHandler = new AsyncHandler()
