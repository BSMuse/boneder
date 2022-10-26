import Dog from '/dog.js' 
import dogs from '/data.js'

const likeBtn = document.getElementById("like-btn")
const dislikeBtn = document.getElementById('dislike-btn')

const getNewDog = () => {
    const nextDogData = dogs.shift()
    return nextDogData ? new Dog(nextDogData) : {}
}

let suitor = getNewDog()

likeBtn.addEventListener('click', () => {
    likeBtn.setAttribute('disabled','')
    dislikeBtn.setAttribute('disabled','')
    suitor.hasBeenLiked = true
    console.log(suitor.hasBeenLiked)
    suitor = getNewDog()
    document.getElementById('liked').style.visibility= 'visible'
    new Audio("/bowwow.mp3").play()
    setTimeout(() => {
        likeBtn.removeAttribute('disabled','')
        dislikeBtn.removeAttribute('disabled','')
        render()
    },1500)
})

dislikeBtn.addEventListener('click', () => {
    dislikeBtn.setAttribute('disabled','')
    likeBtn.setAttribute('disabled','')
    suitor.hasBeenSwiped = true
    console.log(suitor.hasBeenSwiped)
    suitor = getNewDog()
    document.getElementById('disliked').style.visibility= 'visible'
    new Audio("/bark.mp3").play()
    setTimeout(() => {
        likeBtn.removeAttribute('disabled','')
        dislikeBtn.removeAttribute('disabled','')
        render()
    },1500)
})

const render = () => {
    document.getElementById('liked').style.visibility= 'hidden'
    document.getElementById('disliked').style.visibility= 'hidden'
    !suitor.getDogHtml ? document.querySelector("main").innerHTML = `
        <div class = "end-text">
        <h1>Looks like we're out of dogs for you to bone!</h1>
        <i class="fa-solid fa-dog"></i>
        <p>Come back later to see what we can scrounge from the pound...</p>
        </div>` 
    :  document.querySelector(".contain-data").innerHTML = suitor.getDogHtml()
}

render()