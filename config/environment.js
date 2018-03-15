const env = process.env.NODE_ENV || 'dev';
const secret = process.env.SECRET || 'Upl8nncH';
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/findmyfood-${env}`;
const port = process.env.PORT || 4000;

module.exports = { secret, dbURI, port, env };
