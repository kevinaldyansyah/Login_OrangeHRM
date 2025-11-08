// Page Object untuk halaman Login OrangeHRM
// Semua selector & aksi disimpan di sini agar reusable dan mudah dirawat

class LoginPage {
  // Selector elemen
  usernameField = "input[placeholder='Username']";
  passwordField = "input[placeholder='Password']";
  loginButton   = "button[type='submit']";
  errorMessage  = ".oxd-alert-content-text";
  requiredField = ".oxd-input-group > .oxd-text";

  // Action: buka halaman login
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  // Action: isi username
  enterUsername(username) {
    cy.get(this.usernameField).type(username);
  }

  // Action: isi password
  enterPassword(password) {
    cy.get(this.passwordField).type(password);
  }

  // Action: klik tombol login
  clickLogin() {
    cy.get(this.loginButton).click();
  }

  // Assertion: cek error message "Invalid credentials"
  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('contain', message);
  }

  // Assertion: cek pesan "Required" (validasi field kosong)
  verifyRequiredMessage(message) {
    cy.get(this.requiredField).should('contain', message);
  }
}

export default LoginPage;
