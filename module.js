import Dog from '/dog.js' 
import dogs from '/data.js'

const likeBtn = document.getElementById("like-btn")
const dislikeBtn = document.getElementById('dislike-btn')

// this function allows each of the buttons to shift through the objects in data's array
// ternary operator will return the next dog object through the Dog class if there is data left in the object after shift
// otherwise, it returns an empty object
const getNewDog = () => {
    const nextDogData = dogs.shift()
    return nextDogData ? new Dog(nextDogData) : {}
}

let suitor = getNewDog()

// this function disables buttons and call's the suitor variable to access the getNewDog function to shift to a new dog
const dogTransition = () => {
    likeBtn.setAttribute('disabled','')
    dislikeBtn.setAttribute('disabled','')
    suitor = getNewDog()
}

likeBtn.addEventListener('click', () => {
    dogTransition()
    suitor.hasBeenLiked = true
    document.getElementById('liked').style.visibility = 'visible'
    new Audio("/bowwow.mp3").play()
    setTimeout(() => {
        likeBtn.removeAttribute('disabled','')
        dislikeBtn.removeAttribute('disabled','')
        render()
    },1500)
})

dislikeBtn.addEventListener('click', () => {
    dogTransition()
    suitor.hasBeenSwiped = true
    document.getElementById('disliked').style.visibility = 'visible'
    new Audio("/bark.mp3").play()
    setTimeout(() => {
        likeBtn.removeAttribute('disabled','')
        dislikeBtn.removeAttribute('disabled','')
        render()
    },1500)
})

// render function allows the "stamps" to disappear and set new dog data to method in dog.js 
// ternary operator will detect if there is no new dog data to post, and if so, post the html below
const render = () => {
    document.getElementById('liked').style.visibility = 'hidden'
    document.getElementById('disliked').style.visibility = 'hidden'
    !suitor.getDogHtml ? document.querySelector("main").innerHTML = `
        <div class = "end-text">
        <h1>Looks like we're out of dogs for you to bone!</h1>
        <i class="fa-solid fa-dog"></i>
        <p>Come back later to see what we can scrounge from the pound...</p>
        </div>` 
    :  document.querySelector(".contain-data").innerHTML = suitor.getDogHtml()
}

render()