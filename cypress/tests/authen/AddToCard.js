let productName;
describe("Cart Test", () => {
  beforeEach(() => {
    cy.visit("/home-page");
    cy.wait(10000);
  });

  it("Test 1", () => {
    //Đăng nhập

    cy.get(
      ":nth-child(1) > .card > .card-footer > .text-center > .btn"
    ).click();
    cy.get(".mt-5 > .form-control").type("luucong1008@gmail.com");
    cy.get("#password").type("10072000");
    cy.get(".mt-3 > .btn").click();
    cy.on("window:alert", (alertMessage) => {
      expect(alertMessage).to.equal("Đăng nhập thành công");
    });
    cy.wait(10000);

    //Thêm sp vào giỏ hàng và đặt hàng
    let nameProduct = "5 Centimet Trên Giây";
    cy.xpath(
      `//a[text()='${nameProduct}']/ancestor::div[contains(@class,'card-body')]/following-sibling::*//a[contains(text(),'Add to cart')]`
    ).click();
    ////verìy name produc + quantity
    cy.xpath(`//*[text()='${nameProduct}']`).should("be.visible");
    cy.xpath(
      `//*[contains(text(),'${nameProduct}')]/parent::div/following-sibling::div[1]`
    )
      .getText()
      .equal(1);
    cy.wait(10000);
    // cy.get("a.fw-bolder")
    //   .first()
    //   .invoke("text")
    //   .then((text) => {
    //     productName = text.trim(); // Lưu tên sản phẩm vào biến productName
    //   });
    cy.wait(10000);
    cy.get("#toast-container")
      .should("be.visible")
      .invoke("text")
      .should("contain", "Thêm vào giỏ hàng thành công");
    cy.wait(3000);
    cy.get(".d-flex > .btn").click();
    cy.wait(10000);

    // if (cy.get('.row.product-name').first().then(($product) => {
    //     cy.get('input[name="quantity"]').then(($quantity) => {
    //         const currentQuantity = parseInt($quantity.val());
    //         if (!isNaN(currentQuantity) && currentQuantity > 0) {
    //             // Nếu sản phẩm đã có trong giỏ hàng trước đó
    //             const newQuantity = currentQuantity; // Tăng số lượng lên 1
    //             cy.log('New quantity:', newQuantity);
    //             cy.get('input[name="quantity"]').should('have.value', newQuantity.toString()); // Kiểm tra số lượng mới
    //         } else {
    //             // Nếu sản phẩm chưa có trong giỏ hàng trước đó
    //             cy.get('.row.product-name').contains(productName).should('exist');
    //             cy.get('input[name="quantity"]').should('have.value', '1'); // Kiểm tra số lượng là 1
    //         }
    //     });
    // } else {

    // }

    cy.get(".row.product-name")
      .first()
      .then(($product) => {
        if ($product.length > 0) {
          // Nếu sản phẩm đã có trong giỏ hàng
          cy.get('input[name="quantity"]')
            .first()
            .invoke("val")
            .then((currentQuantity) => {
              const newQuantity = parseInt(currentQuantity) + 1;
              cy.log("New quantity:", newQuantity);
              cy.get('input[name="quantity"]').first().should("have.value", 2); // Kiểm tra số lượng mới
            });
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng
          cy.log("Sản phẩm chưa có trong giỏ hàng");
          // Kiểm tra sản phẩm đã được thêm vào giỏ hàng hay chưa
          cy.get(".cart-icon").click(); // Click vào biểu tượng giỏ hàng để mở giỏ hàng
          cy.get(".row.product-name").contains(productName).should("exist");
          cy.get('input[name="quantity"]').should("have.value", "1"); // Kiểm tra số lượng là 1
        }
      });

    cy.get("#address").clear().type("63 Đại Mỗ");
    cy.get("#phone").clear().type("0396147625");
    cy.get(".col-4 > .btn").click();
    cy.get(".swal2-confirm").click();
    cy.get(".swal2-popup")
      .should("be.visible")
      .invoke("text")
      .should("contain", "Chúc mừng bạn đã đặt hàng thành công");
    cy.get(".swal2-confirm.swal2-styled").click();
    cy.get(".swal2-popup").should("not.exist");
    cy.wait(10000);
    cy.get("div.dropdown > #navbarDropdown").click();
    cy.get(
      "div.dropdown > .dropdown-menu > :nth-child(1) > .dropdown-item"
    ).click();
    cy.wait(10000);

    //Kiểm tra thông tin đơn hàng đã đặt

    cy.get(".col-8.offset-2.mt-4.mb-4").should("be.visible");
    cy.get("table.mat-table").then(($table) => {
      if ($table.find("tbody tr").length > 0) {
        // Nếu có đơn hàng, kiểm tra thông tin của các đơn hàng
        cy.get("tbody tr")
          .first()
          .each(($row, index) => {
            cy.wrap($row)
              .first()
              .within(() => {
                // Kiểm tra thông tin của từng đơn hàng
                // Ví dụ: Kiểm tra các ô trong dòng
                cy.get("td").eq(0).should("not.be.empty"); // Kiểm tra mã đơn hàng
                cy.get("td").eq(1).should("not.be.empty"); // Kiểm tra tổng tiền
                cy.get("td").eq(2).should("not.be.empty"); // Kiểm tra địa chỉ
                cy.get("td").eq(3).should("not.be.empty"); // Kiểm tra số điện thoại
                cy.get("td").eq(4).should("not.be.empty"); // Kiểm tra ngày mua
                cy.get("td").eq(5).should("not.be.empty"); // Kiểm tra trạng thái
                // Kiểm tra có nút chi tiết và huỷ đơn không
                cy.get("td").eq(6).find(".bi-eye-fill").should("exist");
                cy.get("td").eq(7).find(".bi-x-circle-fill").should("exist");
              });
          });
      } else {
        // Nếu không có đơn hàng, đảm bảo rằng không có bất kỳ phần tử nào của lịch sử đơn hàng được hiển thị
        cy.get("table.mat-table").within(() => {
          cy.get("tbody tr").should("not.exist");
        });
      }
    });
  });
});
