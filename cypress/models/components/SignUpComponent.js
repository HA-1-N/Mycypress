export default class SignupComponent {
    // Methods to locate elements on the signup page
    fullNameInput = () => cy.get('input[formcontrolname="fullName"]');
    emailInput = () => cy.get('input[formcontrolname="email"]');
    passwordInput = () => cy.get('input[formcontrolname="password"]');
    otpInput = () => cy.get('input[formcontrolname="otp"]');
    addressInput = () => cy.get('input[formcontrolname="address"]');
    phoneInput = () => cy.get('input[formcontrolname="phone"]');
    getOtpButton = () => cy.get('button#get-otp-button');
    submitButton = () => cy.get('button#signup-button');

    // Method to perform signup action
    signup(fullName, email, password, otp, address, phone) {
        this.fullNameInput().type(fullName);
        this.emailInput().type(email);
        this.passwordInput().type(password);
        this.otpInput().type(otp);
        this.addressInput().type(address);
        this.phoneInput().type(phone);
        this.submitButton().click();
    }

    // Method to request OTP
    requestOTP() {
        this.getOtpButton().click();
    }
}
