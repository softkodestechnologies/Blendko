const User = require('../models/user.model'); 

function generateReferralCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}


async function generateUniqueReferralCode() {
  let code = generateReferralCode();
  let isUnique = false;

  while (!isUnique) {
    const existingUser = await User.findOne({ referralCode: code });
    if (!existingUser) {
      isUnique = true;
    } else {
      code = generateReferralCode();
    }
  }

  return code;
}


module.exports = {
  generateUniqueReferralCode,
};
