export default {
  port: 9000,
  log: {
    level: 'info',
    disabled: false,
  },
  cors: {
    origins: ['https://frontendweb-2425-jasperdegeest.onrender.com'],
    maxAge: 3 * 60 * 60,
  },
  auth: {
    jwt: {
      audience: 'portfolio.hogent.be',
      issuer: 'portfolio.hogent.be',
      expirationInterval: 60 * 60, // s (1 hour)
    },
    argon: {
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    maxDelay: 5000,
  },
};
