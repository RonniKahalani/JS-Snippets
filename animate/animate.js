'use strict'

class BubbleSpawner {

    constructor() {
        
        this.audioBubbles = document.getElementById('audio-bubbles')
        this.audioOrangeFish = document.getElementById('audio-fish')
        this.audioBlueFish = document.getElementById('audio-blue-fish')
        this.audioRedFish = document.getElementById('audio-red-fish')
        this.audioWhiteFish = document.getElementById('audio-white-fish')
        this.bubbleField = document.getElementById('bubble-field');

        let orangeFish = document.querySelector('.fish')
        orangeFish.addEventListener('click', (event) => {
            this.audioOrangeFish.play()
        })
        let blueFish = document.querySelector('.blue-fish')
        blueFish.addEventListener('click', (event) => {
            this.audioBlueFish.play()
        })
        let redFish = document.querySelector('.red-fish')
        redFish.addEventListener('click', (event) => {
            this.audioRedFish.play()
        })
        let whiteFish = document.querySelector('.white-fish')
        whiteFish.addEventListener('click', (event) => {
            this.audioWhiteFish.play()
        })
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

    playBubbles() {
        this.audioBubbles.play()
    }

    pauseBubbles() {
        this.audioBubbles.pause()

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