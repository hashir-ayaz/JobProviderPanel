const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();
const SENDGRID_API_KEY =
  process.env.SENDGRID_API_KEY ||
  "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";

console.log(SENDGRID_API_KEY);
sgMail.setApiKey(SENDGRID_API_KEY);

const generateProposalAcceptedEmail = ({ jobTitle, freelancerName }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        h1 {
          color: #4CAF50;
          text-align: center;
        }
        p {
          margin-bottom: 20px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 10px;
          font-size: 16px;
          color: white;
          background-color: #4CAF50;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
        }
        .btn:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Congratulations, ${freelancerName}!</h1>
        <p>
          We are excited to inform you that your proposal for the job titled <strong>"${jobTitle}"</strong> has been accepted.
        </p>
        <p>
          You have been assigned to the Job and can start communicating with the client.
        </p>
        <p>
          You can view the job details and communicate with the client through the link below:
        </p>
       
        <p>
          Thank you for choosing Skill Connect. If you have any questions, feel free to contact our support team.
        </p>
        <p>
          Best regards, <br />
          The SkillConnect Team
        </p>
      </div>
    </body>
  </html>
`;

const generateProposalRejectedEmail = ({ candidateName, jobTitle }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        h1 {
          color: #FF6F61;
          text-align: center;
        }
        p {
          margin-bottom: 20px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 10px;
          font-size: 16px;
          color: white;
          background-color: #FF6F61;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
        }
        .btn:hover {
          background-color: #e55b50;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello, ${candidateName}</h1>
        <p>
          We regret to inform you that your proposal for the job titled <strong>"${jobTitle}"</strong> has not been accepted at this time.
        </p>
        <p>
          This decision was not made lightly, and we encourage you to continue applying for other opportunities that match your skills and expertise.
        </p>
        <p>
          If you have any questions or need assistance, feel free to reach out to our support team:
        </p>
      
        <p>
          Thank you for using our platform. We look forward to seeing more of your proposals in the future.
        </p>
        <p>
          Best regards, <br />
          The SkillConnect Team
        </p>
      </div>
    </body>
  </html>
`;

module.exports = generateProposalRejectedEmail;

const sendEmail = async ({
  to,
  from = {
    email: "SkillConnect.info@gmail.com",
    name: "SkillConnect",
  },
  subject,
  html,
}) => {
  const msg = {
    to,
    from,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  generateProposalAcceptedEmail,
  sendEmail,
  generateProposalRejectedEmail,
};
