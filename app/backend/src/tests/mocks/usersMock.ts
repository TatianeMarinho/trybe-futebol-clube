export const userMock = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  }

  export const userReturnVerify = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  }

export const messageErrorLogin = { message: 'All fields must be filled' };

export const messageInvalidLogin = { message: 'Invalid email or password' };

export const messageErrorValidateToken = { message: 'Token must be a valid token' };

export const messageErrorInterno = { message: 'Internal Server Error'};