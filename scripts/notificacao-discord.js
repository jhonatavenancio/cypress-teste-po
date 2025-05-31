const axios = require('axios');

const webhookUrl = 'https://discordapp.com/api/webhooks/1378191799020949585/LDKnuNqezL87-4sXl8Bhx7SyOGTa0AZaAp2rkEQsfSw5Cc4aWYpnxYNCnsgAae4JTOlT';

axios.post(webhookUrl, {
  content: `✅ Os testes do Cypress foram executados com sucesso em ${new Date().toLocaleString()}`
})
.then(() => {
  console.log('Notificação enviada ao Discord.');
})
.catch(err => {
  console.error('Erro ao enviar notificação:', err);
});
