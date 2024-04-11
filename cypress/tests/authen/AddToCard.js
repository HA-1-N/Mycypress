const { isLoggedIn, login } = require("./LoginTest");
require('cypress-xpath')

describe('Add to Cart Test', () => {
    beforeEach(async () => {
        await cy.visit('/home-page');
        await cy.wait(10000); // Chờ cho trang load hoàn toàn
    });

    it('should be able to add to cart', () => {
        cy.xpath("(//a[text()='Add to cart'])[1]").first().click().then(() => {
            //Kiểm tra xem đã đăng nhập hay chưa
            if(cy.xpath("//button[text()='ĐĂNG NHẬP']").should("be.visible"))
            {
                login('luucong1008@gmail.com', '10072000');
            }else{
                cy.get('.btn.btn-outline-light').contains('Cart 1').should('exist');
            }
            // if (isLoggedIn) {
            //     // Nếu đã đăng nhập, kiểm tra sản phẩm đã được thêm vào giỏ hàng thành công
            //     cy.get('button.btn.btn-outline-light').contains('Cart 1').should('exist');
            // } else {
            //     // Nếu chưa đăng nhập, thực hiện đăng nhập trước khi kiểm tra giỏ hàng
            //     login('username', 'password');
            //     cy.get('.btn.btn-outline-light').contains('Cart 1').should('exist');
            // }
        });
        // cy.get('.text-center').contains('Add to cart').first().click().then(() => {
        //     if (isLoggedIn) {
        //         cy.get('.text-center').contains('Add to cart').first().click();
        //         cy.on('window:alert', alert => {
        //             expect(alert).to.contain('Thêm vào giỏ hàng thành công!');
        //         });
        //     }
        //     cy.get('.btn.btn-outline-light').contains('Cart 1').should('exist');
        // });
    });
    function login(username, password) {
        cy.get('input[formcontrolname="username"]').type(username);
        cy.get('input[formcontrolname="password"]').type(password);
        cy.xpath("(//button[text()='ĐĂNG NHẬP'])[1]").click();
        // cy.on("window:alert", (alert) => {
        //   expect(alert).to.contain(messages);
        // });
      }
});
