const { v4: uuidv4 } = require('uuid');

const generateUIKey = () => {
  const key = 'u' + uuidv4().replaceAll('-', '').substring(0, 10);
  return key;
};

module.exports = { generateUIKey };
