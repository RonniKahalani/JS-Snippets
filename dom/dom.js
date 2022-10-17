'use strict'

class DOM {

    constructor() {
        // Get a reference to the parent node, that will contain this new element.
        this.parentElement = document.getElementById('view')
    }

    /**
     * 
     */
    clear() {
        this.parentElement.innerHTML = '';
        let elements = document.getElementsByTagName('body')

        elements[0].style.backgroundColor = 'white' // Hex color = #FFFFFF
    }
    /**
     It is common for interactive websites to create new elements dynamically on user's actions and use them.
     To create a new element in the DOM, we need to use the document.createElement() method and pass the name of the element as an argument.
     Look at the example below:
     */
    createElement() {

        // Use the global document to create a new element.
        // Note: The element needs to be added, as a child, to an existing element node, to be added to the DOM and visual.
        let element = document.createElement('img')

        // Set the element properties.
        element.setAttribute('src', './kitty.gif')

        this.parentElement.append(element)
    }

    removeElement() {
        let element = document.querySelector('img')

        if (element != null) {
            this.parentElement.removeChild(element)
        } else {
            alert('No element to remove.')
        }
    }

    removeAllElements() {
        let elements = document.querySelectorAll('img')

        if (elements.length === 0) {
            alert('No elements to remove.')
            return
        }

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            this.parentElement.removeChild(element)
        }
    }

    toggleAttributes() {
        let elements = document.querySelectorAll('img')

        if (elements.length === 0) {
            alert('No elements to set attributes on.')
            return
        }

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]

            if(!element.hasAttribute('style')) {
                element.setAttribute('style', 'margin:auto;width:800px;height:600px;')
            } else {
                element.removeAttribute('style')
            }
        }
    }

    addEventListener() {
        let elements = document.querySelectorAll('img')

        if (elements.length === 0) {
            alert('No elements to add event listeners to.')
            return
        }

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            element.addEventListener('mouseover', this.handleMouseoverEvent)
        }
    }

    handleMouseoverEvent(event) {
        alert('Image on mouse over event.')
    }

    removeEventListener() {
        let elements = document.querySelectorAll('img')

        if (elements.length === 0) {
            alert('No elements to remove event listeners from.')
            return
        }

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            element.removeEventListener('mouseover', this.handleMouseoverEvent)
        }
    }

    changeStyle() {
        let elements = document.getElementsByTagName('body')

        elements[0].style.backgroundColor = this.randomHexColor()
    }

    randomHexColor() {
        const letters = '0123456789ABCDEF'.split('');
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }

        return color;
    }
}
var dom = new DOM()