'use strict'

class BubbleSpawner {

    constructor() {
        
        this.audio = document.getElementById('audio')
        this.bubbleField = document.getElementById('bubble-field');
    }

    spawn() {

        let bubbleCount = parseInt(document.getElementById('bubbleCount').value)
        let randomFactor = parseInt(document.getElementById('randomFactor').value)
        let duration = parseInt(document.getElementById('duration').value)
        let color = document.getElementById('color').value
        let letter = document.getElementById('letter').value

        //generate bubbles with randomly timed animation durations
        for (let i = 0; i < bubbleCount; i++) {
            let randNum = Math.floor(Math.random() * randomFactor) + 1;
            let animDur = duration + (0.5 * randNum);
            let moveEl = document.createElement('div');
            moveEl.setAttribute('class', 'bubble-rise');
            moveEl.setAttribute('style', 'animation-duration: ' + animDur + 's;');

            let bubbleEl = document.createElement('div');
            bubbleEl.setAttribute('class', 'bubble');
            bubbleEl.style.color = color
            bubbleEl.style.backgroundColor = color
            let bubbleElContent = document.createTextNode(letter);
            bubbleEl.appendChild(bubbleElContent);
            bubbleEl.addEventListener('click', () => {
                alert('Got it!')
                moveEl.removeChild(bubbleEl)    
            })

            moveEl.appendChild(bubbleEl)
            this.bubbleField.appendChild(moveEl);
        }
    }

    play() {
        this.audio.play()
    }

    pause() {
        this.audio.pause()

    }
}
var bubbleSpawner = new BubbleSpawner()

window.addEventListener('load', (event) => {
    bubbleSpawner.spawn()
})

document.forms['form-bubbles'].addEventListener('submit', (event) => {
    event.preventDefault()
    bubbleSpawner.spawn();
})