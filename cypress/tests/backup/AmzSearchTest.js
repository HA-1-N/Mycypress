import AmazonHomePage from "../models/pages/LoginPage"
import AmazonSearchResultPage from "../models/pages/AmazonSearchResultPage"
describe('Amz search', () => {
    it('should be able to search dining table', () => {
        const SEARCH_TEXT = "Dining table";
        
        cy.visit("/");
        let amzHomePage = new AmazonHomePage();
        amzHomePage.searchTxtBxElm.type(SEARCH_TEXT);
        amzHomePage.searchBtnElm.click();

        let amazSearchResultPage = new AmazonSearchResultPage();
        amazSearchResultPage.searchItemElmList.should("not.have.length",1);
    });

})