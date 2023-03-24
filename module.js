import Dog from '/dog.js'

const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

const getNewDog = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();
  const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random');
  const dogData = await dogResponse.json();
  const jokeResponse = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });
  const jokeData = await jokeResponse.json();

  return new Dog({
    name: userData.results[0].name.first,
    age: userData.results[0].dob.age,
    avatar: dogData.message,
    bio: jokeData.joke,
    hasBeenSwiped: false,
    hasBeenLiked: false,
  });
};

let suitor = null;

// this function disables buttons and call's the suitor variable to access the getNewDog function to shift to a new dog
const dogTransition = async () => {
  likeBtn.setAttribute("disabled", "");
  dislikeBtn.setAttribute("disabled", "");
  suitor = await getNewDog();
};

likeBtn.addEventListener("click", async () => {
  await dogTransition(); // Wait for the dogTransition function to complete before proceeding
  suitor.hasBeenLiked = true;
  document.getElementById("liked").style.visibility = "visible";
  new Audio("/bowwow.mp3").play();
  setTimeout(() => {
    likeBtn.removeAttribute("disabled");
    dislikeBtn.removeAttribute("disabled");
    render();
  }, 1500);
});

dislikeBtn.addEventListener("click", async () => {
  await dogTransition(); // Wait for the dogTransition function to complete before proceeding
  suitor.hasBeenSwiped = true;
  document.getElementById("disliked").style.visibility = "visible";
  new Audio("/bark.mp3").play();
  setTimeout(() => {
    likeBtn.removeAttribute("disabled");
    dislikeBtn.removeAttribute("disabled");
    render();
  }, 1500);
});

// render function allows the "stamps" to disappear and set new dog data to method in dog.js
const render = async () => {
    if (!suitor) {
      document.querySelector(".contain-data").innerHTML = `
        <div class="no-data">
          <p>No more dogs to show!</p>
        </div>
      `;
      return;
    }
    document.getElementById("liked").style.visibility = "hidden";
    document.getElementById("disliked").style.visibility = "hidden";
    const dogHtml = suitor.getDogHtml ? await suitor.getDogHtml() : '';
    document.querySelector(".contain-data").innerHTML = dogHtml;
  };
  
// initial render
dogTransition();
render();