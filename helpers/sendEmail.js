import sgMail from "@sendgrid/mail";
const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const msg = {
//   to: "mases35050@nimadir.com", // Change to your recipient
//   from: SENDGRID_EMAIL_FROM, // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

export const sendEmail = (data) => {
  sgMail
    .send({ ...data, from: SENDGRID_EMAIL_FROM })
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};
