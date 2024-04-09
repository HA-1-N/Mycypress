export default class HeaderComponent {
    brandLogo = () => cy.get("a.navbar-brand.router-link-active")
    brandLogoImg = () => cy.get("img.p-1")
    headerMenuItemList = () => cy.get('li.nav-item')
}