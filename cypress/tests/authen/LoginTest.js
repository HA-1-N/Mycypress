let isLoggedIn = false;

const LOGIN_CRED = {
  username: "luucong1008@gmail.com",
  password: "10072000",
};
const messages = {
  success: "Đăng nhập thành công",
  wrongUsername: "Tài khoản không hợp lệ",
  wrongPassword: "Mật khẩu không đúng",
};
// Hàm để thực hiện đăng nhập thành công
function login(username, password) {
  cy.get('input[formcontrolname="username"]').type(username);
  cy.get('input[formcontrolname="password"]').type(password);
  cy.get(".btn.btn-success").click();
  cy.on("window:alert", (alert) => {
    expect(alert).to.contain(messages);
  });
}

// Hàm để thực hiện đăng nhập không thành công
function loginUnsuccessful(username, password, messages) {
  cy.get('input[formcontrolname="username"]').type(username);
  cy.get('input[formcontrolname="password"]').type(password);
  cy.get(".btn.btn-success").click();
  cy.on("window:alert", (alert) => {
    expect(alert).to.contain(messages);
  });
}

function hidepassword(username, password) {
  cy.get('input[formcontrolname="password"]').type(`${LOGIN_CRED.password}`);
  cy.get('input[id="flexCheckChecked"]').check();
  cy.get('input[formcontrolname="password"]').should(
    "have.attr",
    "type",
    "text"
  );
  cy.get('input[id="flexCheckChecked"]').uncheck();
  cy.get('input[formcontrolname="password"]').should(
    "have.attr",
    "type",
    "password"
  );
}

function forgotPassword(username, password) {
  cy.visit("/login");
  cy.get('.row.mt-2.ps-3 a[href="/forgot-password"]')
    .click()
    .then(() => {
      // Thực hiện kiểm tra hoặc hành động tiếp theo ở đây
      cy.url().should("include", "/forgot-password");
    });
}

describe("Login Test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Login success", () => {
    login(LOGIN_CRED.username, LOGIN_CRED.password, messages.success);
    isLoggedIn = true; // Đánh dấu đã đăng nhập thành công
  });

  it("should be able to wrong username", () => {
    loginUnsuccessful(
      `${LOGIN_CRED.username}_WRONG`,
      LOGIN_CRED.password,
      messages.wrongUsername
    );
    isLoggedIn = false; // Đánh dấu đã đăng nhập không thành công
  });

  it("should be able to wrong password", () => {
    loginUnsuccessful(
      LOGIN_CRED.username,
      `${LOGIN_CRED.password}_WRONG`,
      messages.wrongPassword
    );
    isLoggedIn = false;
  });
  it("should be able to not type username", () => {
    loginUnsuccessful("", LOGIN_CRED.password);
    cy.get(".btn.btn-success").should("be.disabled");
    isLoggedIn = false;
  });

  it("should be able to not type password", () => {
    loginUnsuccessful(LOGIN_CRED.username);
    cy.get(".btn.btn-success").should("be.disabled");
    isLoggedIn = false;
  });

  it("should disable login button when username is whitespace only", () => {
    loginUnsuccessful("    ", LOGIN_CRED.password, messages.wrongUsername);
    isLoggedIn = false;
  });
  it("should disable login button when username has leading and trailing whitespace", () => {
    loginUnsuccessful(
      "   " + LOGIN_CRED.username + "   ",
      LOGIN_CRED.password,
      messages.success
    );
    isLoggedIn = true;
  });

  it("should toggle password visibility when clicking on show/hide password checkbox", () => {
    hidepassword();
  });
  it('should redirect to Forgot Password page when "Quên mật khẩu" button is clicked', () => {
    forgotPassword();
  });
});
export { isLoggedIn, login };
