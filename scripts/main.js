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
      this.maxlife = ``,
      this.image = image
    }
    
    // Fonction d'attaque avec un ckeck pour voir si le personnage est encore en vie. En paramètre, on met la cible
    attack(target) {
        if (this.isDead()) {return}
        target.getDamages(this.strength);
      }
    
    // Fonction qui permet de vérifier si le joueur est toujours en vie
    isDead() {
        return this.life <= 0;
      }

    // Fonction qui permet d'infliger des dégâtes avec la quantité de dégats en paramètre
    getDamages(dgts) {
    this.life -= dgts;
    if (this.life <= 0) {
        this.life = 0;
    }
    }
  }

// Classe spécifique qui hérite de Hero
class Guerrier extends Hero {
    constructor(name, type, image) {
        super(name);
        this.life = 100,
        this.strength = 30,
        this.type = type,
        this.emoji = `🗡️`,
        this.maxlife = 100,
        this.image = image
      }

      
}

// Classe spécifique qui hérite de Hero
class Mage extends Hero {
    constructor(name, type, image) {
        super(name);
        this.life = 80,
        this.strength = 20,
        this.type = type,
        this.emoji = `🔮`,
        this.maxlife = 80,
        this.image = image
      }

      attack(target) {
        if (this.isDead()) {return}

        target.getDamages(this.strength);

        if (!this.isDead()) {
          target.getDamages(5);
        }
      }
}

// Classe spécifique qui hérite de Hero
class Vampire extends Hero {
    constructor(name, type, image) {
        super(name);
        this.life = 60,
        this.strength = 15,
        this.type = type,
        this.emoji = `🧛🏼‍♂️`,
        this.maxlife = 60,
        this.image = image
      }

      attack(target) {
        if (this.isDead()) {return}

        target.getDamages(this.strength);
        
        if (!this.isDead()) {
          target.getDamages(this.strength);
        }
      }
}

// Fonction de création d'un personnage.
// Elle prend un index en paramètre afin de retrouver l'image selectionnée par l'utilisateur
function createHero(index) {

    // Vérification avant de créer un nouveau personnage
    if (!inputName.value.trim() || !inputType.type.trim() || !index) {
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

}

// Fonction d'affichage du choix des images
function displayChoiceImages() {
    imagesGallery.innerHTML = ``;

        // ici l'index de chaque image sera récupéré en vue d'être réutilisé plus tard
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

        // Ici on utilse le hero et l'index en paramètre pour aller chercher précisément ce qu'on veut dans heroesList
        heroesList.forEach((hero, index) => {
            const newCard = document.createElement(`div`);
            newCard.innerHTML = `
            <img src="${hero.image}" alt="" class="display-hero-image">
            <div class="display-hero-name">${hero.emoji} ${hero.name}</div>
            <div class="life"><div style="width:${((hero.life)/(hero.maxlife)*100)}%"></div></div>
            <div class="display-hero-strength">⚔️ ${hero.strength} ⚔️</div>`
            ;
            newCard.classList.add(`hero-card`);
            newCard.dataset.index = index;

            const newDiv = document.createElement(`div`);

            // Cette fois ci, on crée les boutons d'attaques et on récupère par la même occasion l'index qui nous permettra de retrouver la target
            heroesList.forEach((hero, index) => {
                newDiv.innerHTML += `<button data-index="${index}" class="attack-button">${hero.name}</button>`
              }) 
              
            
            heroesFightGallery.appendChild(newCard);
            newCard.appendChild(newDiv);
        })

    
}

// ==============================
// 🧲 Événements
// ==============================

displayChoiceImages();
const imageElements = document.querySelectorAll(`.image-element`);
let selectedIndex = null;

// On capte la selection de l'utilsateur lorsque ce dernier clique sur une image
// On va injecter et enlever une classe ".selected" pour récupérer l'index du coix de l'utilisateur 
imagesGallery.addEventListener(`click`, (e) => {
  e.preventDefault();
  if (e.target.closest(`.list-image`)) {

    // Retire par défaut toutes les classes ".selected"
    imageElements.forEach((element) => {
      element.classList.remove(`selected`);
    });

    // Injection de la classe ".selected"
    e.target.classList.add(`selected`);

    if (e.target.matches(`.selected`)) {
      selectedIndex = e.target.closest(".selected").dataset.index;
      
    }
}
});

// On capte l'évenement du clic sur le bouton d'ajout d'un personnage
addButton.addEventListener(`click`, (e) => {
  e.preventDefault();

  // Ici on crée un nouveau héro en prendant en paramètre l'index qu'on a extrait plus haut pour injecter la bonne image à chaque héro
  createHero(selectedIndex);

  displayHeroesInArena();
  
  imageElements.forEach((element) => {
      element.classList.remove(`selected`);
    });

    selectedIndex = null;
});

// On capte l'évenement sur le bouton attaquer
heroesFightGallery.addEventListener(`click`, (e) => {
  e.preventDefault();
  if (e.target.matches(`.attack-button`)) {

    // On récupère l'index de la target
    let targetIndex = e.target.closest(".attack-button").dataset.index;

    // On récupère l'index de l'attaquant
    let heroIndex = e.target.closest(`.hero-card`).dataset.index;

    // On utilise ces index dans la fonction attack de la classe Hero
    heroesList[heroIndex].attack(heroesList[targetIndex]);

    displayHeroesInArena();
  }
});