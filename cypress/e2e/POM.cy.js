// Import class LoginPage (POM)
import LoginPage from '../../pages/LoginPage';

describe('OrangeHRM Login Feature dengan Intercept + POM', () => {
  // Inisialisasi objek dari LoginPage
  const loginPage = new LoginPage();

  // TC01 - Berhasil Login dengan Valid Credentials
  it('TC01 - Berhasil Login dengan Valid Credentials', () => {
    // Action: intercept request login API
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: buka halaman login
    loginPage.visit();

    // Action: isi username & password valid
    loginPage.enterUsername('Admin');
    loginPage.enterPassword('admin123');

    // Action: klik tombol login
    loginPage.clickLogin();

    // Assertion: request login sukses (status 200)
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    // Assertion: berhasil redirect ke dashboard
    cy.url().should('include', '/dashboard');

    // Assertion: teks "Dashboard" tampil di header
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });

  // TC02 - Gagal Login dengan Invalid Credentials
  it('TC02 - Gagal Login dengan Invalid Credentials', () => {
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    loginPage.visit();
    loginPage.enterUsername('SalahUser');
    loginPage.enterPassword('SalahPass');
    loginPage.clickLogin();

    // Assertion: request login terkirim (tanpa cek 401, karena server balikin 302)
    cy.wait('@loginRequest');

    // Assertion: pesan error invalid credentials muncul
    loginPage.verifyErrorMessage('Invalid credentials');
  });

 // TC03 - Gagal Login Username Kosong
it('TC03 - Gagal Login Username Kosong', () => {
  loginPage.visit();
  loginPage.enterPassword('admin123'); // hanya isi password
  loginPage.clickLogin();

  // Assertion: muncul pesan "Required" di field username
  loginPage.verifyRequiredMessage('Required');
});

// TC04 - Gagal Login Password Kosong
it('TC04 - Gagal Login Password Kosong', () => {
  loginPage.visit();
  loginPage.enterUsername('Admin'); // hanya isi username
  loginPage.clickLogin();

  // Assertion: muncul pesan "Required" di field password
  loginPage.verifyRequiredMessage('Required');
});

// TC05 - Gagal Login Username & Password Kosong
it('TC05 - Gagal Login Username & Password Kosong', () => {
  loginPage.visit();
  loginPage.clickLogin(); // tidak isi apapun

  // Assertion: pesan error username kosong
  cy.get(loginPage.requiredField).first().should('contain', 'Required');

  // Assertion: pesan error password kosong
  cy.get(loginPage.requiredField).last().should('contain', 'Required');
});
});
