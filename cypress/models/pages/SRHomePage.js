// import { timers } from "cypress/types/jquery";
// import { HeroComponents } from "../components/sr/HeroComponents";
// import { reject, resolve } from "cypress/types/bluebird";

export class SRHomePage {
    getHeroCompTitle() {
        let title = '';
        cy.get('.showcase__hero .card__title').then($title => {
            title = $title.text().trim();
        })
        return new Cypress.Promise(resolve => cy.wrap('').then(() => resolve(title)))
    }
}