import Dog from '/dog.js'

const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

// this function allows each of the buttons to shift through the objects in data's array
// ternary operator will return the next dog object through the Dog class if there is data left in the object after shift
// otherwise, it returns an empty object

const bioJoke = async () => {
  const response = await fetch("https://icanhazdadjoke.com", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) { // Use the 'ok' property instead of 'status === 200'
    return data.joke;
  } else {
    throw new Error("Error retrieving dad joke!");
  }
};

const getNewDog = async () => {
    const [userData, dogData, jokeData] = await Promise.all([
      fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => ({
          name: data.results[0].name.first,
          age: data.results[0].dob.age,
        })),
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => ({
          avatar: data.message,
        })),
      fetch('https://icanhazdadjoke.com', {
        headers: {
          Accept: 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => ({
          bio: data.joke,
        })),
    ]);
  
    return new Dog({
      ...userData,
      ...dogData,
      ...jokeData,
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
// ternary operator will detect if there is no new dog data to post, and if so, post the html below
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
    document.querySelector(".contain-data").innerHTML = await suitor.getDogHtml();
  };
  
  // initial render
  dogTransition();
  render();