// import Dog from '/dog.js'

const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");

class Dog {
  constructor(data) {
    Object.assign(this, data);
  }

  getDogHtml() {
    const { name, avatar, age, bio } = this;

    return `
      <img id="dog" src="${avatar}">
      <div class="details">
        <p id="name">${name}, ${age}</p>
        <p id="tagline">${bio}</p>
      </div>
    `;
  }
}

const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${url}: ${error}`);
    return null;
  }
};

const getNewDog = async () => {
    try {
      const userData = await fetchJson("https://randomuser.me/api/");
      const dogData = await fetchJson("https://dog.ceo/api/breeds/image/random");
      const jokeData = async () => {
        const response = await fetch("https://icanhazdadjoke.com", {
          headers: {
            Accept: 'application/json',
          }
        });
        const data = await response.json();
        return data.joke;
      };
  
      return new Dog({
        name: userData.results[0].name.first,
        age: userData.results[0].dob.age,
        avatar: dogData.message,
        bio: await jokeData(),
        hasBeenSwiped: false,
        hasBeenLiked: false,
      });
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
      throw error;
    }
  };

let suitor = null;

const disableButtons = () => {
  likeBtn.setAttribute("disabled", "");
  dislikeBtn.setAttribute("disabled", "");
};

const enableButtons = () => {
  likeBtn.removeAttribute("disabled");
  dislikeBtn.removeAttribute("disabled");
};

const dogTransition = async () => {
  disableButtons();
  suitor = await getNewDog();
  enableButtons();
};

likeBtn.addEventListener("click", async () => {
  await dogTransition();
  suitor.hasBeenLiked = true;
  document.getElementById("liked").style.visibility = "visible";
  new Audio("/bowwow.mp3").play();
  setTimeout(() => {
    render();
  }, 1500);
});

dislikeBtn.addEventListener("click", async () => {
  await dogTransition();
  suitor.hasBeenSwiped = true;
  document.getElementById("disliked").style.visibility = "visible";
  new Audio("/bark.mp3").play();
  setTimeout(() => {
    render();
  }, 1500);
});

const render = async () => {
  await dogTransition();
  if (!suitor) {
    document.querySelector(".contain-data").innerHTML = `
        <div class = "end-text">
            <h1>Looks like we're out of dogs for you to bone!</h1>
            <i class="fa-solid fa-dog"></i>
            <p>Come back later to see what we can scrounge from the pound...</p>
        </div> 
    `;
    return;
  }

  document.getElementById("liked").style.visibility = "hidden";
  document.getElementById("disliked").style.visibility = "hidden";
  const dogHtml = await suitor.getDogHtml();
  document.querySelector(".contain-data").innerHTML = dogHtml;
};

render();