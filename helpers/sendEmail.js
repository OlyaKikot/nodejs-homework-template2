const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, MY_MAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: `${MY_MAIL}` };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
