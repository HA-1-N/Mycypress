describe('Multiple elems matching interaction', () => {
    it('should be albe to interact with list of element', () => {
        cy.visit("/login")
        // Use eq
        cy.get("input").eq(0).type("tomsmith")
        cy.get("input").eq(1).type("SuperSecretPassword!")
        
        // //Use clousure
        // cy.get("input").then(items => {
        //     cy.get(items[0]).clear()
        //     cy.get(items[0]).type("tomsmith")
        //     cy.get(items[1]).clear()
        //     cy.get(items[1]).type("SuperSecretPassword!")
        // })

        //Use .each
        cy.get("input").each((item, index) =>{
            cy.get(item).type("something")
        })



        cy.get("button[type='submit']").click()
        //DEBUG purpose only 
        cy.wait(3000)
    });
})