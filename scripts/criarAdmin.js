const axios = require('axios');

const API_URL = 'http://localhost:5001/api/auth/register';

const adminData = {
  name: 'Administrador',
  email: 'admin@livroscafe5.com',
  password: 'admin123',
  role: 'admin'
};

(async () => {
  try {
    console.log('👉 Tentando criar admin em:', API_URL);
    const res = await axios.post(API_URL, adminData);
    console.log('✅ Admin criado com sucesso:', res.data);
  } catch (err) {
    console.error('❌ Erro ao criar admin:');
    if (err.response) {
      console.error('↪ Status:', err.response.status);
      console.error('↪ Data:', err.response.data);
    } else if (err.request) {
      console.error('↪ Nenhuma resposta recebida (erro de rede)');
      console.error(err.request);
    } else {
      console.error('↪ Erro inesperado:', err.message);
    }
  }
})();
