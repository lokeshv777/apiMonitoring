const corn = require('node-cron');

const { checkApis } = require('../modules/monitoring/monitoring.service');

const isCronEnabled = process.env.ENABLE_CRON === 'true',

if (isCronEnabled) {
  corn.schedule('* * * * *', async () => {
    console.log('Running API Monitor');

    await checkApis();
  });
} else {
  console.log('❌ Cron job disabled');
}
