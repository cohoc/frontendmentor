import {data} from "./data.js"

loadData()

function loadData(){
    data.forEach(card => {
        let name = card.name;
        let title = card.title;
        let desc = card.description;
        let skills = card.skills;
        let level = card.level;
        let link = card.link;
        let image = `./${name}/design/desktop-design.jpg`
        let url = `${window.location.href}${link}`;
        let html = 
        `
        <li class="card">
            <img class="card__preview" src=${image}></img>
            <article class="card__info">
                <h2 class="card__title heading-resize">${title}</h2>
                <div class="card__description">
                    <p>${desc}</p>
                </div>
                <div class="card__link">
                    <a href="./${name}">Live Demo</a>
                </div>
            </article>
        </li>
        `
        document.querySelector(".cards__list").insertAdjacentHTML("beforeend", html);
    })
}