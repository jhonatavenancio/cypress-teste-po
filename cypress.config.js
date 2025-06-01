const { defineConfig } = require('cypress');
require('dotenv').config();
const axios = require('axios');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    timestamp: 'longDate'
  },
  env: {
    baseUrl: 'https://fastidious-daifuku-af366c.netlify.app'
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('after:spec', async (spec, results) => {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        const status = results.stats.failures > 0 ? '❌ Falhou' : '✅ Sucesso';

        const reportLink = `file://${process.cwd()}/cypress/reports/html/${spec.name}.html`;

        const message = {
          embeds: [{
            title: `${spec.name} - ${status}`,
            description: `Executado em: ${new Date().toLocaleString()}`,
            color: results.stats.failures > 0 ? 15158332 : 3066993
          }]
        };

        if (webhookUrl) {
          try {
            await axios.post(webhookUrl, message);
            console.log('🔔 Notificação com link enviada ao Discord.');
          } catch (err) {
            console.error('Erro ao enviar para Discord:', err);
          }
        }
      });

      return config;
    }
  }
});
