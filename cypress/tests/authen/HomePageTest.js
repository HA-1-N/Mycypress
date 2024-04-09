describe('Search Product', () => {
    before(() => {
        cy.visit('/home-page');
        cy.wait(4000);
    });

    it('Search product on website', () => {
        const searchedKeyword = 'cuốn sách';
        cy.get('input[id="mat-input-0"]').type(`${searchedKeyword}{enter}`);
        cy.wait(5000);

        //Xác định phạm vi của kết quả tìm kiếm và kiểm tra từ khóa chỉ sau khi tìm kiếm hoàn tất
        cy.get('.row.gx-4.gx-lg-5.row-cols-2.row-cols-md-3.row-cols-xl-5.justify-content-center.ng-star-inserted').within(() => {
            cy.get('.col.mb-3.p-2').each(($product) => {
                // Lấy nội dung của phần tử chứa tên sản phẩm
                const productName = $product.find('.card-body.p-4 .text-center .fw-bolder').text().trim();

                // Kiểm tra xem từ khóa tìm kiếm có xuất hiện trong tên sản phẩm hay không
                expect(productName.toLowerCase()).to.contain(searchedKeyword.toLowerCase());
            });
        });
    });

    it('Test sorting by price descending', () => {
        // Chọn tùy chọn "Giá giảm dần"
        cy.get('select').select('priceDesc');
    
        // Chờ cho trang web load và hiển thị sản phẩm mới
        cy.wait(5000);
    
        // Hàm kiểm tra sắp xếp giảm dần và di chuyển sang trang tiếp theo nếu có
        const checkSortAndMoveToNextPage = () => {
            // Lấy danh sách các giá của sản phẩm sau khi đã sắp xếp giảm dần
            cy.get('.card.h-100').find('b').then($prices => {
                const prices = $prices.map((index, element) => Cypress.$(element).text().trim()).get();
    
                // Kiểm tra từng cặp giá xem có được sắp xếp giảm dần không
                for (let i = 0; i < prices.length - 1; i++) {
                    const currentPrice = parseFloat(prices[i].replace('₫', '').replace(/,/g, ''));
                    const nextPrice = parseFloat(prices[i + 1].replace('₫', '').replace(/,/g, ''));
    
                    // Kiểm tra xem giá của sản phẩm hiện tại có lớn hơn giá của sản phẩm kế tiếp không
                    expect(currentPrice).to.be.at.least(nextPrice);
                }
            });
    
            // Kiểm tra xem có nút "Trang tiếp theo" không
            cy.get('.ngx-pagination').find('li.pagination-next').then($nextPageButton => {
                // Nếu không có nút "Trang tiếp theo", kết thúc kiểm tra
                if ($nextPageButton.hasClass('disabled')) {
                    cy.log('Đã kiểm tra sắp xếp giảm dần trên tất cả các trang');
                    return;
                }
    
                // Click vào nút "Trang tiếp theo" để chuyển sang trang tiếp theo
                cy.wrap($nextPageButton).click();
                
                cy.wait(5000);
    
                // Gọi lại hàm để kiểm tra và di chuyển sang trang tiếp theo nếu còn
                checkSortAndMoveToNextPage();
            });
        };
    
        // Kiểm tra sắp xếp giảm dần và di chuyển sang trang tiếp theo nếu có
        checkSortAndMoveToNextPage();
    });
    
    it('Test sorting by price ascending on multiple pages', () => {
        // Chọn tùy chọn "Giá tăng dần"
        cy.get('select').select('priceAsc');
    
        // Chờ cho trang web load và hiển thị sản phẩm mới
        cy.wait(5000);
    
        let currentPage = 1; // Biến để lưu trang hiện tại
    
        // Hàm kiểm tra sắp xếp ở trang hiện tại và di chuyển sang trang tiếp theo nếu có
        const checkSortAndMoveToNextPage = () => {
            cy.get('.card.h-100').find('b').then($prices => {
                const prices = $prices.map((index, element) => Cypress.$(element).text().trim()).get();
    
                // Kiểm tra từng cặp giá xem có được sắp xếp tăng dần không
                for (let i = 0; i < prices.length - 1; i++) {
                    const currentPrice = parseFloat(prices[i].replace('₫', '').replace(/,/g, ''));
                    const nextPrice = parseFloat(prices[i + 1].replace('₫', '').replace(/,/g, ''));
    
                    // Kiểm tra xem giá của sản phẩm hiện tại có nhỏ hơn giá của sản phẩm kế tiếp không
                    expect(currentPrice).to.be.at.most(nextPrice);
                }
            });
    
            // Tăng biến currentPage lên 1 để chuyển sang trang tiếp theo
            currentPage++;
    
            // Kiểm tra xem đã ở trang cuối cùng chưa
            cy.get('.ngx-pagination').find('li.pagination-next').then($nextPageButton => {
                // Nếu không có nút "Trang tiếp theo", điều đó có nghĩa là chúng ta đã ở trang cuối cùng
                if ($nextPageButton.hasClass('disabled')) {
                    // Dừng kiểm tra và kết thúc test
                    cy.log('Đã kiểm tra sắp xếp trên tất cả các trang');
                    return;
                }
    
                // Click vào nút "Trang tiếp theo" để chuyển sang trang tiếp theo
                cy.wrap($nextPageButton).click();
                
                // Chờ cho trang web load và hiển thị sản phẩm mới
                cy.wait(5000);
    
                // Gọi lại hàm để kiểm tra và di chuyển sang trang tiếp theo nếu còn
                checkSortAndMoveToNextPage();
            });
        };
    
        // Kiểm tra sắp xếp ở trang hiện tại và di chuyển sang trang tiếp theo nếu có
        checkSortAndMoveToNextPage();
    });
    
    
});
