export default class DemoBlazePage{
    getAllCardData(){
        let allCardData=[];
        cy.get('cardSel').each()
        return new Cypress.Promise(resolve => {
            cy.wrap('').then(() => resolve(allCardData));
        })
    }
}