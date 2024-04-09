const generateRandomUser = usernameLength => {
    const ALL_CHARS = "ABCDEFGHIKLMNOPQRTUVXYabcdefghiklmnopqrstuvxy";
    const ALL_CHARS_LENGTH = ALL_CHARS.length;
    let randomUsername ='';
    for(let index = 0; index < usernameLength.length; index++){
        randomUsername += ALL_CHARS.charAt(Math.floor(Math.random()*ALL_CHARS_LENGTH))
    }
    return randomUsername;
}

const SIGN_UP_CRED = {
    username: generateRandomUser(9),
    password: "10072000"
}

describe('Login Test', () => {

    

    beforeEach(() => {
        cy.visit('/login');
    })

    it('should be able to login with correct creds', () => {
        cy.get('input[formcontrolname="username"]').type(`${LOGIN_CRED.username}`);
        cy.get('input[formcontrolname="password"]').type(`${LOGIN_CRED.password}`);
        cy.get('.btn.btn-success').click();
        cy.on('window:alert', alert => {
            expect(alert).to.contain("Đăng nhập thành công")
        })
    });

    it('should be able to wrong username', () => {
        cy.get('input[formcontrolname="username"]').type(`${LOGIN_CRED.username}_WRONG`);
        cy.get('input[formcontrolname="password"]').type(`${LOGIN_CRED.password}`);
        cy.get('.btn.btn-success').click();
        cy.on('window:alert', alert => {
            expect(alert).to.contain("Tài khoản không hợp lệ")
        })
    });

    it('should be able to wrong password', () => {
        cy.get('input[formcontrolname="username"]').type(`${LOGIN_CRED.username}`);
        cy.get('input[formcontrolname="password"]').type(`${LOGIN_CRED.password}_WRONG`);
        cy.get('.btn.btn-success').click();
        cy.on('window:alert', alert => {
            expect(alert).to.contain("Mật khẩu không đúng")
        })
    });

});
