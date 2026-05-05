const axios = require('axios');
const Log = require('../logs/logs.model');
const Api = require('../api/api.model');
const User = require('../auth/auth.model');
const sendEmail = require('../../utils/email');

// Check All APIs
const checkApis = async () => {
  console.log('🔍 Checking APIs...');
  try {
    const apis = await Api.find({ isActive: true });

    for (const api of apis) {
      const startTime = Date.now(); // ⏱️ start timer
      try {
        const response = await axios({
          method: api.method,
          url: api.url,
          timeout: 5000,
        });

        const responseTime = Date.now() - startTime;

        const isSuccess = response.status === api.expectedStatus;

        console.log(
          isSuccess ? `✅ API UP: ${api.url}` : `❌ API DOWN: ${api.url}`,
        );

        if (isSuccess) {
          console.log(`✅ API UP : ${api.url}`);

          // If previously DOWN → send recovery email
          if (api.isAlertSent) {
            const user = await User.findById(api.userId);
            if (!user) {
              console.log('User not found for Api', api.url);
              continue;
            }
            await sendEmail(
              user.email, // later dynamic
              'API RECOVERED ✅',
              `API is back UP: ${api.url}`,
            );
            api.isAlertSent = false;
            await api.save();
            console.log('Sending email to:', user.email);
          }
        }

        await Log.create({
          apiId: api._id,
          userId: api.userId,
          status: isSuccess ? 'UP' : 'DOWN',
          statusCode: response.status,
          responseTime,
        });
      } catch (error) {
        const responseTime = Date.now() - startTime;

        console.log(`❌ API ERROR: ${api.url}`);

        // Send alert only once
        if (!api.isAlertSent) {
          const user = await User.findById(api.userId);
          if (!user) {
            console.log('User not found for Api', api.url);
            continue;
          }
          await sendEmail(
            user.email,
            'API DOWN ALERT',
            `API is DOWN: ${api.url}`,
          );

          api.isAlertSent = true;
          await api.save();
          console.log('Sending email to:', user.email);
        }

        await Log.create({
          apiId: api._id,
          userId: api.userId,
          status: 'DOWN',
          statusCode: error.response?.status || null,
          responseTime,
          error: error.message,
        });
      }
    }
  } catch (error) {
    console.log('Monitoring error:', error.message);
  }
};

module.exports = { checkApis };
