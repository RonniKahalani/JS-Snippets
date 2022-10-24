'use script'

class AsyncHandler {

    constructor() {
        this.parent = document.getElementById('output')
    }

    clear() {
        let elems = this.parent.querySelectorAll('.item-square, .item-circle')
        if(elems.length > 0) {
            elems.forEach((element) => {
                this.parent.removeChild(element)
            })
        }
    }
    startAsync() {
        console.log(`Starting promises...`)

        let promise1 = this.getPromise('T1', 'item-square', 10000, 1).then((data) => {
            console.log(data)
        })

        let promise2 = this.getPromise('T2', 'item-circle', 10000, 1).then((data) => {
            console.log(data)
        })

        console.log(`Going to sleep, waiting for the tasks to complete...`)

    }


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
        for (let i = 0; i < 3000; i++) {
            let randX = Math.floor(Math.random() * window.screen.availWidth);
            let randY = Math.floor(Math.random() * window.screen.availHeight);
            this.addElementAt(randX, randY, 'hey', i % 2 ? 'item-square' : 'item-circle')
        }
    }
}
var asyncHandler = new AsyncHandler()
