import sgMail from "@sendgrid/mail";
const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

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
