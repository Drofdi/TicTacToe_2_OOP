"use strict";

let selectorsList = {
    gameDivs : document.querySelectorAll('.game_div'),
    winnerDiv : document.querySelector('.winner'),
    restartButton : document.querySelector('.restart'),
    current : document.querySelector('.currentMove'),
}

class SelectorsTicTacToe{
    constructor(){
    this.gameDivs = selectorsList.gameDivs
    this.winnerDiv = selectorsList.winnerDiv
    this.restartButton = selectorsList.restartButton
    this.current = selectorsList.current
    }
}



class ServiceTicTacToe{
    constructor(selectors){
        this.selectors = selectors
        this.setEvents = this.setEvents.bind(this)
        this.reload = this.reload.bind(this)
        this.startGame = this.startGame.bind(this)
        this.victory = this.victory.bind(this)

        this.setEvents()
        this.startGame(this.selectors.gameDivs)
    }
    setEvents(){
        selectors.restartButton.addEventListener('click', this.reload)
    }

    reload(){
        location.reload()
    }

    startGame(gameDivs){
        let i = 0

        for(let gameDiv of gameDivs){
            gameDiv.addEventListener('click', function swithElems(){
                if (startGame.victory(gameDivs)){
                    this.innerHTML = ''
                } else if (i % 2 !== 0){
                    this.innerHTML = '0'
                    startGame.selectors.winnerDiv.innerHTML = 'Текущий ход: Х'
                } else if (i % 2 === 0){
                    this.innerHTML = 'X'
                    startGame.selectors.winnerDiv.innerHTML = 'Текущий ход: 0'
                }
                gameDiv.removeEventListener('click',swithElems)
    
                let lastMove
                if (this.innerHTML != ''){
                    lastMove = this.innerHTML
                } else if (i % 2 === 0) {
                    lastMove = 'X'
                } else {
                    lastMove = '0'
                }
    
                if(startGame.victory(gameDivs)){
                    return startGame.selectors.winnerDiv.innerHTML = `Победитель: ${lastMove}!`
                }
    
                if(startGame.isDraw(gameDivs)){
                    return  startGame.selectors.winnerDiv.innerHTML = 'Ничья'
                }
                i++
            })
        }
    }

    victory(gameDivs){
        let winCombinations = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
        ];
        for(let comb of winCombinations){
            if (gameDivs[comb[0]].innerHTML === gameDivs[comb[1]].innerHTML &&
                gameDivs[comb[1]].innerHTML === gameDivs[comb[2]].innerHTML &&
                gameDivs[comb[0]].innerHTML != '') {
                gameDivs[comb[0]].classList.add('winLine')
                gameDivs[comb[1]].classList.add('winLine')
                gameDivs[comb[2]].classList.add('winLine')
                return true
            }
        }
     return false
    }

    isDraw(gameDivs){
        for(let div of gameDivs){
            if (div.innerHTML == ''){
                return false
            }
        }
        return true
    }
}

let selectors = new SelectorsTicTacToe()
let startGame = new ServiceTicTacToe(selectors)