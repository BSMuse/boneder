class Dog {
    constructor(data) {
      Object.assign(this, data);
    }
  
    getDogHtml() {
      const { name, avatar, age, bio } = this;
  
      return `
        <img id="dog" src="${avatar}" onerror="imgError(this)>
        <div class="details">
          <p id="name">${name}, ${age}</p>
          <p id="tagline">${bio}</p>
        </div>
      `;
    }
  }

export default Dog