describe('Learn about within and find method', () => {
    it('within method', () => {
        cy.visit('https://www.simplyrecipes.com/');
        // cy.get('.card__title').each(($cardTitle, index) => {
        //     cy.log(index);
        // })
        cy.get('.showcase__hero').within(() => {
            cy.get('.card__title').each(($cardTitle, index) => {
                cy.log(index);
            })
        })
    });
    it.only('find method', () => {
        cy.visit('https://www.simplyrecipes.com/');
        cy.get('.showcase__hero').find('.card__title').each(($cardTitle, index) => {
            cy.log(index);
        })
    });

});