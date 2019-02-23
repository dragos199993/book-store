export const CONFIG: { [key: string]: string } = {
  app: process.env.APP || 'dev',
  port: process.env.PORT || '4000',
  jwt_encryption: process.env.JWT_ENCRYPTION || 'something_very_secret',
  jwt_expiration: process.env.JWT_EXPIRATION || '10000' 
};
