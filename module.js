import Dog from '/dog.js' 
import dogs from '/data.js'

let dogsArray = dogs
console.log(dogs.length)

const getNewDog = () => {
    const nextDogData = dogsArray.shift()
    return nextDogData ? new Dog(nextDogData) : {}
}

let suitor = getNewDog()

document.getElementById("like-btn").addEventListener('click', () => {
    console.log('clicked')
    suitor.hasBeenLiked = true
    console.log(suitor.hasBeenLiked)
    suitor = getNewDog()
    document.getElementById('liked').style.visibility= 'visible'
    setTimeout(() => {render()},1500)
})

document.getElementById("dislike-btn").addEventListener('click', () => {
    console.log('clicked')
    suitor.hasBeenSwiped = true
    console.log(suitor.hasBeenSwiped)
    suitor = getNewDog()
    document.getElementById('disliked').style.visibility= 'visible'
    setTimeout(() => {render()},2000)
})

const render = () => {
    document.getElementById('liked').style.visibility= 'hidden'
    document.getElementById('disliked').style.visibility= 'hidden'
    document.querySelector(".contain-data").innerHTML = suitor.getDogHtml()
}

render()