const DROPDOWN_SEL = "select[id='dropdown']";
describe('Dropdown Handling', () => {
    it('should be able to selec a dropdown option', () => {
        cy.visit("/dropdown");
        //Select by index | Slect option 1 
        cy.get(DROPDOWN_SEL).select(1);

        //Select by value | Slect option 2 
        cy.get(DROPDOWN_SEL).select("2");
        
        //Select by visible text | Slect option 1 
        cy.get(DROPDOWN_SEL).select("Option 1");
        
        //Verify the selected option is now Option 1
        cy.get("select option:selected").invoke("text").should("eq","Option 1");
    });

})