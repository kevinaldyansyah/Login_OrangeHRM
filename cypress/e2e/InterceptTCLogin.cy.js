describe('OrangeHRM Login Feature dengan Intercept', () => {

  // TC01 - Berhasil Login dengan Valid Credentials
  it('TC01 - Berhasil Login dengan Valid Credentials', () => {
    // Action: buka halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Setup intercept
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: input username & password valid
    cy.get("input[name='username']").type('Admin');
    cy.get("input[name='password']").type('admin123');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: request login berhasil (status 200/302 redirect)
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

    // Assertion: URL dashboard terbuka
    cy.url().should('include', '/dashboard');
  });


  // TC02 - Gagal Login dengan Password Salah
  it('TC02 - Gagal Login dengan Password Salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.intercept('POST', '/web/index.php/auth/validate').as('loginRequest');

    // Action: input username valid & password salah
    cy.get("input[name='username']").type('Admin');
    cy.get("input[name='password']").type('salahPassword');

    cy.get("button[type='submit']").click();

    // Assertion: request login tetap terjadi
    cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);

    // Assertion: muncul error "Invalid credentials"
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });


  // TC03 - Gagal Login dengan Username Kosong
  it('TC03 - Gagal Login dengan Username Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: hanya isi password
    cy.get("input[name='password']").type('admin123');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: validasi "Required" muncul di username
    cy.get('.oxd-input-group:has(input[name="username"]) .oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  });


  // TC04 - Gagal Login dengan Password Kosong
  it('TC04 - Gagal Login dengan Password Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: hanya isi username
    cy.get("input[name='username']").type('Admin');

    // Action: klik tombol login
    cy.get("button[type='submit']").click();

    // Assertion: validasi "Required" muncul di password
    cy.get('.oxd-input-group:has(input[name="password"]) .oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  });


  // TC05 - Gagal Login dengan Username & Password Kosong
  it('TC05 - Gagal Login dengan Username & Password Kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // Action: klik tombol login tanpa isi apapun
    cy.get("button[type='submit']").click();

    // Assertion: validasi "Required" muncul di username
    cy.get('.oxd-input-group:has(input[name="username"]) .oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');

    // Assertion: validasi "Required" muncul di password
    cy.get('.oxd-input-group:has(input[name="password"]) .oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  });
});

