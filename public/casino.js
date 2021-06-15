function newDeck(){

    suit = ["H", "D", "S", "C"]
    value = ["A", "J", "K", "Q", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    deck = []

    for (type in suit){
        for (number in value){
            deck.push(suit[type].concat(value[number]))
        }
    }

    /* Fisher-Yates shuffle */
    var index = 52
    while (0 !== index){
        var cardIndex = Math.floor(Math.random() * index)
        index -= 1
        var hold = deck[index]
        deck[index] = deck[cardIndex]
        deck[cardIndex] = hold
    }

    return deck
}

function dealPoints(card, gambler){

    if (card[1] == "J" || card[1] == "Q" || card[1] == "K" || card[1] == "1"){
        gambler.Points += 10
    } else if (card[1] == "A"){
        if (gambler.Points <= 10){
            gambler.Points += 11
        } else {
            gambler.Points += 1
        }
    } else {
        num = parseInt(card[1])
        gambler.Points += num
    }
}

function hitPoints(card, gambler){

    if (card[1] == "J" || card[1] == "Q" || card[1] == "K" || card[1] == "1"){
        gambler.Points += 10
    } else if (card[1] == "A"){
        if (gambler.Points <= 10){
            gambler.Points += 11
        } else {
            gambler.Points += 1
        }
    } else {
        num = parseInt(card[1])
        gambler.Points += num
    }

    if (gambler.points > 21){
        for(card in gambler.Hand){
            if (gambler.Hand[card][1] == "A"){
                gambler.Hand[card][1] = "1"
                gambler.Points -= 10
            }
        }
    }
}

function deal(){

    player.Hand.push(deck.pop())
    house.Hand.push(deck.pop())
    player.Hand.push(deck.pop())
    house.Hand.push(deck.pop())

    for (card in player.Hand){
        dealPoints(player.Hand[card], player)
    }

    for (card in house.Hand){
        dealPoints(house.Hand[card], house)
    }
}

function newGame(){

    player = {Points: 0, Hand: []}
    house = {Points: 0, Hand: []}
    status = "PLAY!"

    deck = newDeck()
    deal()

    if (player.Points == 21){
        status = "BLACKJACK!"
    }

    if (house.Points == 21){
        status = "YOU LOSE!"
    }

    document.getElementById("status").innerHTML = status
    document.getElementById("playerHand").innerHTML = player.Hand
    document.getElementById("playerPoints").innerHTML = player.Points
    document.getElementById("houseHand").innerHTML = house.Hand
    document.getElementById("housePoints").innerHTML = house.Points

}

function dealerTurn(){

    if (status !== "PLAY!"){

    } else {

        if (house.Points >= 16){
            if (house.Points > 21){
                status = "YOU WIN!"
                return
            } else {
                if (house.Points > player.Points){
                    status = "YOU LOSE!"
                    document.getElementById("status").innerHTML = status
                    document.getElementById("houseHand").innerHTML = house.Hand
                    document.getElementById("housePoints").innerHTML = house.Points
                    return}
                if (house.Points = player.Points){
                    status = "DRAW"
                    document.getElementById("status").innerHTML = status
                    document.getElementById("houseHand").innerHTML = house.Hand
                    document.getElementById("housePoints").innerHTML = house.Points
                    return}
                if (house.Points < player.Points){
                    status = "YOU WIN!"
                    document.getElementById("status").innerHTML = status
                    document.getElementById("houseHand").innerHTML = house.Hand
                    document.getElementById("housePoints").innerHTML = house.Points
                    return}
            }
        } else {
            card = deck.pop()
            house.Hand.push(card)
            hitPoints(card, house)
            dealerTurn()
        }

        document.getElementById("status").innerHTML = status
        document.getElementById("houseHand").innerHTML = house.Hand
        document.getElementById("housePoints").innerHTML = house.Points
    }
}

function hitMe(){

    if (status !== "PLAY!"){

    } else {

        card = deck.pop()
        player.Hand.push(card)
        hitPoints(card, player)

        if (player.Points > 21){
            status = "YOU LOSE!"
        }

        document.getElementById("status").innerHTML = status
        document.getElementById("playerHand").innerHTML = player.Hand
        document.getElementById("playerPoints").innerHTML = player.Points
    }
}

document.getElementById('newGame').addEventListener('click', newGame)
document.getElementById('hitMe').addEventListener('click', hitMe)
document.getElementById('stay').addEventListener('click', dealerTurn)
newGame()
