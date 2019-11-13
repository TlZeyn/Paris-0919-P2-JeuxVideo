// Import librairies
import React from 'react'
import Axios from 'axios'

// Import CSS
import './Map.css'



class Map1 extends React.Component {
    state = {
        textureDatas: '',
        lockMovement: false,
        chestClose: './Database/assets/treasure_closed.png',
        chestOpen: './Database/assets/treasure_open.png',
        top: this.props.top,
        left: this.props.left,
        animation: 'none',
        position: 'top 288px right 416px',
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
        ],
        chestQuote: {
            chestIsOpening: "Vous obtain un cup of café",
            chestIsAlreadyOpened: "There is rien into the coffre",

        },
        isClose: true
    }
    // le dés de rencontre
    dice = 0



    // Call the function that changes the player direction, animation and position
    componentDidMount() {
        document.onkeydown = this.onKeyDown
        document.onkeyup = this.onKeyUp

        // Texture API
        Axios.get('./Database/map.json')
            // Change JSON into JS object
            .then(response => response.data)
            // Give the texture object to the state
            .then(data => {
                this.setState({ textureDatas: data[0] })
            })
        console.log(this.state.textureDatas)
    }

    // active les combats
    componentDidUpdate() {
        if (this.dice === 1) {
            this.props.keepMap(1)
            this.props.newLeft(this.state.left)
            this.props.newTop(this.state.top)
            this.props.newMap(10)
        }
        console.log(this.state.lockMovement)
    }

    // Move the character, change its direction & animation
    onKeyDown = (e) => {
        e.preventDefault()
        switch (e.keyCode) {
            case 90:
            case 38:
                if (this.state.position !== 'top 72px right 416px' && !this.state.lockMovement) {
                    this.setState({ position: 'top 72px right 416px' })
                }

                else if (this.state.top > 1 && !this.state.lockMovement && this.state.map[this.state.top - 2][this.state.left - 1] === 0) {
                    this.setState({ top: this.state.top - 1 })
                    this.dice = Math.floor(Math.random() * 10)
                }

                break
            case 83:
            case 40:
                if (this.state.position !== 'top 288px right 416px' && !this.state.lockMovement) {
                    this.setState({ position: 'top 288px right 416px' })
                }
                else if (this.state.top < 7 && !this.state.lockMovement && this.state.map[this.state.top][this.state.left - 1] === 0) {
                    const down = this.state.top + 1
                    this.setState({ position: 'top 288px right 416px', top: down })
                    this.dice = Math.floor(Math.random() * 10)
                }

                break
            case 81:
            case 37:
                if (this.state.position !== 'top 216px right 416px' && !this.state.lockMovement) {

                    this.setState({ position: 'top 216px right 416px' })
                }
                else if (this.state.left >= 0 && !this.state.lockMovement && (this.state.map[this.state.top - 1][this.state.left - 2] === 0 || this.state.map[this.state.top - 1][this.state.left - 2] === undefined)) {
                    const left = this.state.left - 1
                    this.setState({ position: 'top 216px right 416px', left: left })
                    this.dice = Math.floor(Math.random() * 10)
                }

                break
            case 68:
            case 39:
                if (this.state.position !== 'top 144px right 416px' && !this.state.lockMovement) {
                    this.setState({ position: 'top 144px right 416px', })
                }

                else if (this.state.left < 14 && !this.state.lockMovement && this.state.map[this.state.top - 1][this.state.left] === 0) {
                    const right = this.state.left + 1
                    this.setState({ position: 'top 144px right 416px', left: right })
                    this.dice = Math.floor(Math.random() * 10)
                }

                if (this.state.left > 13) {
                    this.props.newTop(this.state.top)
                    this.props.newLeft(1)
                    this.props.newMap(2)
                }
                break
            // interaction avec l'envirronement
            case 88:
            case 69:
                if (this.state.lockMovement === true) {
                    this.stopTalking()
                    this.stopChesting()
                }
                //interraction pnj
                else if ((this.state.left < 16) && this.state.map[this.state.top - 1][this.state.left] === 2 || this.state.map[this.state.top - 1][this.state.left - 2] === 2 || this.state.map[this.state.top][this.state.left - 1] === 2 || this.state.map[this.state.top - 2][this.state.left - 1] === 2) {
                    this.interactWithNPC(this.props.characters[4])
                }
                else if
                    ((this.state.left < 16) && this.state.map[this.state.top - 1][this.state.left] === 3 || this.state.map[this.state.top - 1][this.state.left - 2] === 3 || this.state.map[this.state.top][this.state.left - 1] === 3 || this.state.map[this.state.top - 2][this.state.left - 1] === 3) {
                    this.interactWithChest()
                }
                break
            default:
                break
        }
    }


    // Deleting the animation on keyUp
    onKeyUp = (e) => {
        if (e.keyCode) {
            this.setState({ animation: 'none' })
        }
    }

    // Display a quote when interacting with the npc
    interactWithNPC = (character) => {
        this.setState({ lockMovement: true })
        document.querySelector('.quoteContainer').style.display = 'block'
        document.querySelector('.quoteContainer').innerHTML = `<h3>${character.name}</h3> <br> <span>${character.quote[0]}</span>`
    }

    stopTalking = () => {
        this.setState({ lockMovement: false })
        document.querySelector('.quoteContainer').style.display = 'none'
        document.querySelector('.quoteContainer').innerHTML = ``
    }

    interactWithChest = () => {
        if (this.state.isClose) {
            this.setState({ lockMovement: true })
            this.setState({ isClose: false })
            document.querySelector('.quoteContainer').style.display = 'block'
            document.querySelector('.quoteContainer').innerHTML = `<span>${this.state.chestQuote.chestIsOpening}</span>`
            document.querySelector('.chest').style.backgroundImage = `url(${this.state.chestOpen})`

        } else {
            this.setState({ lockMovement: true })
            document.querySelector('.quoteContainer').style.display = 'block'
            document.querySelector('.quoteContainer').innerHTML = `<span>${this.state.chestQuote.chestIsAlreadyOpened}</span>`
        }
    }

    stopChesting = () => {
        this.setState({ lockMovement: false })
        document.querySelector('.quoteContainer').style.display = 'none'
        document.querySelector('.quoteContainer').innerHTML = ''
    }

    render() {

        return (
            <div className="map_background" style={{
                backgroundImage: `url(${ this.state.textureDatas.url })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="quoteContainer"></div>
                <div className="profshell" style={{ backgroundImage: this.props.characters.length > 0 ? `url(${ this.props.characters[4].image })` : "" }}></div>
                <div className="Avatar" style={{ animation: this.state.animation, backgroundPosition: this.state.position, gridColumn: this.state.left, gridRow: this.state.top, zIndex: 0 }}></div>
                <div className="chest" style={{ backgroundImage: `url(${ this.state.chestClose })` }}></div>
            </div>



        )
    }
}

export default Map1


