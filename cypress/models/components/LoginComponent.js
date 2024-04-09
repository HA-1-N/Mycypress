// LoginComponent.js
export default class LoginComponent {
    brandLogo = () => cy.get("a.navbar-brand.router-link-active")
    brandLogoImg = () => cy.get("img.p-1")
    headerMenuItemList = () => cy.get('li.nav-item')
    
    getMenuDetail() {
        let menuDetails = [];
        this.headerMenuItemList().each($item => {
            const style = $item.attr("style");
            if (style === undefined || !style.includes("diplay:none")) {
                menuDetails.push({
                    text: $item.text(),
                    href: $item.attr("href")
                })
            }
        });
        return new Cypress.Promise(resolve => {
            cy.wrap('').then(() => resolve(menuDetails));
        });
    }
}
