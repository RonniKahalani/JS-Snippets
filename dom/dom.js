'use strict'

/**
 * Demonstrate how to manipulate tje Document Object Model. 
 */
class DOM {

    constructor() {
        // Get a reference to the parent node, that will contain this new element.
        this.previewElement = document.getElementById('preview')
        this.bodyElement = document.getElementsByTagName('body')[0]
    }

    /**
     * Clears the preview area.
     */
    clear() {
        this.previewElement.innerHTML = '';
        this.bodyElement.style.backgroundColor = 'white' // Hex color = #FFFFFF
    }
    /**
     * Creates a new image tag.
     */
    createElement() {
        let element = document.createElement('img')
        element.setAttribute('src', './media/kitty.gif')
        this.previewElement.append(element)
    }

    /**
     * Removes the last appended image tag.
     */
    removeElement() {
        let element = document.querySelector('img')

        if (element != null) {
            this.previewElement.removeChild(element)
        } else {
            alert('No element to remove.')
        }
    }

     /**
     * Removes all image tags.
     */
    removeAllElements() {
        let elements = document.querySelectorAll('img')

        if (elements.length === 0) {
            alert('No elements to remove.')
            return
        }

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]
            this.previewElement.removeChild(element)
        }
    }

     /**
     * Sets/toggles the style and class attributes on all image tags.
     */
    setAttribute() {
        let elements = document.querySelectorAll('img')

        if (elements.length === 0) {
            alert('No elements to set attributes on.')
            return
        }

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i]

            if(!element.hasAttribute('style')) {
                element.setAttribute('style', 'border:1px solid #000000')
                element.setAttribute('class', 'wiggle')
            } else {
                element.removeAttribute('style')
                element.removeAttribute('class')
                
            }
        }
    }

     /**
     * Add an event listener to all image tags.
     */
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

     /**
     * Adds event listener to all image tags.
     */

    handleMouseoverEvent(event) {
        alert('Image on mouse over event.')
    }

     /**
     * Removes event listener from all image tags.
     */
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

    /**
     * Sets a random background color on the body HTML tag.
     */
    setStyle() {
        this.bodyElement.style.backgroundColor = this.randomHexColor()
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
}
var dom = new DOM()