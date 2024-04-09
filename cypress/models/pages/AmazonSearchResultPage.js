const SEARCH_RESULT_ITEM_SEL = 'div[cel_widget_id^="MAIN_SEARCH_RESULTS"]';

class AmazonSearchResultPage {
    get searchItemElmList() {
        return cy.get(SEARCH_RESULT_ITEM_SEL);
    }

}
module.exports = AmazonSearchResultPage