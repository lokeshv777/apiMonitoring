const corn = require('node-cron');

const { checkApis } = require('../modules/monitoring/monitoring.service');

if (process.env.CRONJOB === true) {
  corn.schedule('* * * * *', async () => {
    console.log('Running API Monitor');

    await checkApis();
  });
} else {
  console.log('Cron job disabled by env variable');
}
