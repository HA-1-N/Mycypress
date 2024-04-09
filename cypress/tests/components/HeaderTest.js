import HeaderComponent from "../../models/components/HeaderComponent";

describe('Header Component Test', () => {

    const BRAND_TEXT = 'BOOK SHOP';
    before(()=>{
        cy.visit('/');
    })

    beforeEach(() => {
        cy.visit('/');
    })

    it('Test for brand logo', () => {
        const headerCmp = new HeaderComponent();
        headerCmp.brandLogoImg().should('be.visible')
        headerCmp.brandLogo().should('contain.text','Book Shop')

    });
    it('Test for header menu', () => {
        const headerCmp = new HeaderComponent();
        headerCmp.headerMenuItemList().each(menuItem =>{
            cy.wrap(menuItem).should('not.be.empty')
        })

    });
});