const axios = require('axios');

axios.post(webhookUrl, {
  content: `✅ Os testes do Cypress foram executados com sucesso em ${new Date().toLocaleString()}`
})
.then(() => {
  console.log('Notificação enviada ao Discord.');
})
.catch(err => {
  console.error('Erro ao enviar notificação:', err);
});
