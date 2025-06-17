// ==============================
// 🌱 Sélection des éléments
// ==============================

// Inputs
const inputName = document.querySelector(`.input-name`);
const inputType = document.querySelector(`.type-select`);

// Display
const imagesGallery = document.querySelector(`.select-images-gallery`);
const heroesFightGallery = document.querySelector(`.heroes-fight-gallery`);

// Buttons
const addButton = document.querySelector(`.add-button`);

// ==============================
// 🎊 Variables
// ==============================
const heroesList = [];
const imagesList = [`./img/hero1.png`,`./img/hero2.png`,`./img/hero3.png`,`./img/hero4.png`,`./img/hero5.png`,`./img/hero6.png`,`./img/hero7.png`,`./img/hero8.png`];
// ==============================
// 🎊 Fonctionnalités
// ==============================
class Hero {
    constructor(name, type, image) {
      this.name = name,
      this.life = ``,
      this.strength = ``,
      this.type = type,
      this.emoji = ``,
      this.life = ``,
      this.image = image
    }
    
    attack(target) {
        if (this.isDead()) {return}
        console.log(`⚔️ ${this.name} attaque ${target.name} !`);
        target.getDamages(this.strength);
      }

    isDead() {
        return this.life <= 0;
      }

    getDamages(dgts) {
    this.life -= dgts;
    if (this.life <= 0) {
        this.life = 0;
        console.log(`💀 ${this.name} est tombé au combat ...`);
    } else {
        console.log(`❤️ ${this.name} a encore ${this.life} PV`);
    }
    }
  }

class Guerrier extends Hero {
    constructor(name, type, image) {
        super(name);
        this.life = 100,
        this.strength = 30,
        this.type = type,
        this.emoji = `🗡️`,
        this.life = 100,
        this.image = image
      }

      
}

class Mage extends Hero {
    constructor(name, type, image) {
        super(name);
        this.life = 80,
        this.strength = 20,
        this.type = type,
        this.emoji = `🔮`,
        this.life = 80,
        this.image = image
      }
}

class Vampire extends Hero {
    constructor(name, type, image) {
        super(name);
        this.life = 60,
        this.strength = 15,
        this.type = type,
        this.emoji = `🧛🏼‍♂️`,
        this.life = 60,
        this.image = image
      }
}

// const Guerrier1 = new Guerrier(`Paul`, `Guerrier`, `test`);
// const Vampire1 = new Vampire(`Jean`, `Vampire`, `test`);
// console.log(Vampire1);
// Guerrier1.attack(Vampire1);
// console.log(Vampire1);

// Fonction de création d'un personnage
function createHero(index) {
    if (!inputName.value.trim() || !inputType.type.trim()) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    if (inputType.value === `Guerrier`) {
        heroesList.push(new Guerrier(inputName.value, inputType.value, imagesList[index]))
    }

    else if (inputType.value === `Mage`) {
        heroesList.push(new Mage(inputName.value, inputType.value, imagesList[index]))
    }

    else if (inputType.value === `Vampire`) {
        heroesList.push(new Vampire(inputName.value, inputType.value, imagesList[index]))
    }

    // console.log(heroesList);
    
}

// Fonction d'affichage du choix des images
function displayChoiceImages() {
    imagesGallery.innerHTML = ``;

        imagesList.forEach((image, index) => {
            const newImage = document.createElement(`div`);
            newImage.innerHTML = `<img src="${image}" alt="" data-index="${index}" class="image-element">`
            ;
            newImage.classList.add(`list-image`);
            newImage.dataset.index = index;

            imagesGallery.appendChild(newImage);
        })
;
}


// Fonction d'affichage des personnages dans l'arène
function displayHeroesInArena() {
    heroesFightGallery.innerHTML = ``;

        heroesList.forEach((hero, index) => {
            const newCard = document.createElement(`div`);
            newCard.innerHTML = `
            <img src="${hero.image}" alt="" class="display-hero-image">
            <div class="display-hero-name">${hero.name}</div>
            <div class="health-level">
            ${hero.life} ❤
            </div>
            <div class="display-hero-strength">${hero.strength}</div>
            <div class="target-buttons-container">

            </div>`
            ;
            newCard.classList.add(`"hero-card`);
            newCard.dataset.index = index;

            heroesFightGallery.appendChild(newCard);
        })

        const targetButtonsContainer = document.querySelector(`.target-buttons-container`);

        targetButtonsContainer.innerHTML = ``;

        heroesList.forEach((hero, index) => {
            const newButton = document.createElement(`button`);
            
            newCard.innerHTML = ``
            ;
            newCard.classList.add(`"hero-card`);
            newCard.dataset.index = index;

            targetButtonsContainer.appendChild(newCard);
        })
}

// ==============================
// 🧲 Événements
// ==============================
displayChoiceImages();
const imageElements = document.querySelectorAll(`.image-element`);
let selectedIndex = null;

imagesGallery.addEventListener(`click`, (e) => {
  e.preventDefault();
  if (e.target.closest(`.list-image`)) {

    imageElements.forEach((element) => {
      element.classList.remove(`selected`);
    });

    e.target.classList.add(`selected`);

    if (e.target.matches(`.selected`)) {
      selectedIndex = e.target.closest(".selected").dataset.index;
      
    }
}
});

addButton.addEventListener(`click`, (e) => {
  e.preventDefault();

  console.log(heroesList);
  createHero(selectedIndex);
  console.log(heroesList);
  displayHeroesInArena();
  
  imageElements.forEach((element) => {
      element.classList.remove(`selected`);
    });

    selectedIndex = null;
});