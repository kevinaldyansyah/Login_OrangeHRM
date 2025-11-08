// Base URL endpoint untuk Reqres API
const baseUrl = 'https://reqres.in/api';

// Header yang digunakan pada setiap request API, termasuk API key dan tipe konten JSON
const headers = {
  'x-api-key': 'reqres-free-v1',
  'Content-Type': 'application/json'
};

describe('Reqres.in API Automation Test Suite', () => {

  // Test untuk mengambil daftar pengguna pada halaman 1 menggunakan metode GET
  it('GET list users (page 1)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=1`,
      headers
    }).then((response) => {
      // Verifikasi status response adalah 200 (OK)
      expect(response.status).to.eq(200);
      // Verifikasi bahwa data yang diterima adalah sebuah array
      expect(response.body.data).to.be.an('array');
    });
  });

  // Test untuk mengambil data satu pengguna berdasarkan ID 2 menggunakan metode GET
  it('GET single user', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers
    }).then((response) => {
      // Pastikan status response adalah 200 (OK)
      expect(response.status).to.eq(200);
      // Pastikan data pengguna yang diterima memiliki ID 2
      expect(response.body.data.id).to.eq(2);
    });
  });

  // Test untuk mengambil data pengguna dengan ID yang tidak ada (23), seharusnya menghasilkan 404 Not Found
  it('GET single user not found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers,
      // Memungkinkan Cypress untuk tidak gagal otomatis ketika status bukan 2xx
      failOnStatusCode: false
    }).then((response) => {
      // Pastikan status response adalah 404 (Not Found)
      expect(response.status).to.eq(404);
    });
  });

  // Test untuk membuat pengguna baru menggunakan metode POST dengan data nama dan pekerjaan
  it('POST create user', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers,
      body: {
        name: 'Neo',
        job: 'The One'
      }
    }).then((response) => {
      // Pastikan status response adalah 201 (Created)
      expect(response.status).to.eq(201);
      // Pastikan response body mengandung properti 'id' yang menandakan pengguna berhasil dibuat
      expect(response.body).to.have.property('id');
    });
  });

  // Test untuk memperbarui seluruh data pengguna dengan ID 2 menggunakan metode PUT
  it('PUT update user', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        name: 'Morpheus',
        job: 'Zion Leader'
      }
    }).then((response) => {
      // Pastikan status response adalah 200 (OK) sebagai tanda update berhasil
      expect(response.status).to.eq(200);
    });
  });

  // Test untuk memperbarui sebagian data pengguna dengan ID 2 menggunakan metode PATCH
  it('PATCH update user', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        job: 'Updated Job'
      }
    }).then((response) => {
      // Pastikan status response adalah 200 (OK) sebagai tanda update berhasil
      expect(response.status).to.eq(200);
    });
  });

  // Test untuk menghapus pengguna dengan ID 2 menggunakan metode DELETE
  it('DELETE user', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers
    }).then((response) => {
      // Pastikan status response adalah 204 (No Content) sebagai tanda penghapusan berhasil
      expect(response.status).to.eq(204);
    });
  });

  // Test untuk melakukan registrasi pengguna dengan data lengkap menggunakan metode POST yang berhasil
  it('POST register success', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    }).then((response) => {
      // Pastikan status response adalah 200 (OK)
      expect(response.status).to.eq(200);
      // Pastikan response body mengandung properti 'token' sebagai tanda registrasi berhasil
      expect(response.body).to.have.property('token');
    });
  });

  // Test untuk melakukan registrasi pengguna dengan data tidak lengkap (tanpa password) yang gagal
  it('POST register failed', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers,
      body: {
        email: 'sydney@fife'
      },
      // Memungkinkan test untuk menangani response error (400)
      failOnStatusCode: false
    }).then((response) => {
      // Pastikan status response adalah 400 (Bad Request)
      expect(response.status).to.eq(400);
      // Pastikan response body berisi pesan error 'Missing password'
      expect(response.body.error).to.eq('Missing password');
    });
  });

  // Test untuk login pengguna dengan data lengkap menggunakan metode POST yang berhasil
  it('POST login success', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    }).then((response) => {
      // Pastikan status response adalah 200 (OK)
      expect(response.status).to.eq(200);
      // Pastikan response body mengandung properti 'token' sebagai tanda login berhasil
      expect(response.body).to.have.property('token');
    });
  });

  // Test untuk login pengguna dengan data tidak lengkap (tanpa password) yang gagal
  it('POST login failed', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers,
      body: {
        email: 'peter@klaven'
      },
      // Memungkinkan test untuk menangani response error (400)
      failOnStatusCode: false
    }).then((response) => {
      // Pastikan status response adalah 400 (Bad Request)
      expect(response.status).to.eq(400);
      // Pastikan response body berisi pesan error 'Missing password'
      expect(response.body.error).to.eq('Missing password');
    });
  });

  // Test untuk mengambil daftar pengguna dengan waktu respon tertunda (delay 3 detik)
  it('GET delayed response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers
    }).then((response) => {
      // Pastikan status response adalah 200 (OK)
      expect(response.status).to.eq(200);
      // Pastikan data yang diterima berupa array
      expect(response.body.data).to.be.an('array');
    });
  });
});
