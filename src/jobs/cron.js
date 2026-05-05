const corn = require('node-cron');

const { checkApis } = require('../modules/monitoring/monitoring.service');

corn.schedule('* * * * *', async () => {
  console.log('Running API Monitor');

  await checkApis();
});
