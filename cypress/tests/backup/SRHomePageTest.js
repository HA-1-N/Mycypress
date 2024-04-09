import { SRHomePage } from "../models/pages/SRHomePage";

// describe('SR Homepage test', () => {
//     it('should be albe to print all the titles', () => {
//         cy.visit('https://www.simplyrecipes.com/');
//         cy.get('.card__title').each(($title, index) => {
//             cy.log(index);
//             cy.log($title.text().trim())
//         })
//     });
//     it.only('should be albe to interact with a component', () => {
//         cy.visit('https://www.simplyrecipes.com/');
//         const srHomePage = new SRHomePage();
//         srHomePage.heroComponents().cardTitle.each(($title, index) => {
//             cy.log(index);
//             cy.log($title.text().trim())
//         })
//     });
// });

describe('SR Homepage test', () => {
    it('should be albe to get hero card title', () => {
        cy.visit("https://www.simplyrecipes.com/");
        new SRHomePage().getHeroCompTitle().then(title =>{
            cy.wrap('').then(() => {
                expect(title).to.be.eq('This 100-Year-Old Cake Recipe Is Just as Delicious Today')
            })
        })
        
    });
});