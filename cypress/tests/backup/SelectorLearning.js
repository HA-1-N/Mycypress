describe('Element interaction', () => {
    it('should be albe to complete the form', () =>{
        //Open the login form page
        cy.visit("/login")

        //find usernam by ID then input the text 
        cy.get("#username").type("tomsmith")
        //find usernam by attribute then input the text 
        cy.get("[name='password']").type("SuperSecretPassword!")
        //find usernam by attribute and tag name then click
        cy.get("button[type='submit']").click()
        //DEBUG purpose only 
        cy.wait(3000)

    }
    );
})