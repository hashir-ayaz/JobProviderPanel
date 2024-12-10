const sgMail = require("@sendgrid/mail");
const {
  generateProposalAcceptedEmail,
  generateProposalRejectedEmail,
  sendEmail,
} = require("../src/email/sendgrid");

jest.mock("@sendgrid/mail");

describe("Email Utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateProposalAcceptedEmail", () => {
    it("should generate the correct email HTML for a proposal acceptance", () => {
      const emailData = {
        jobTitle: "Software Development",
        freelancerName: "John Doe",
      };

      const emailHtml = generateProposalAcceptedEmail(emailData);

      expect(emailHtml).toContain("Congratulations, John Doe!");
      expect(emailHtml).toContain(
        'your proposal for the job titled <strong>"Software Development"</strong> has been accepted.'
      );
    });
  });

  describe("generateProposalRejectedEmail", () => {
    it("should generate the correct email HTML for a proposal rejection", () => {
      const emailData = {
        candidateName: "Jane Doe",
        jobTitle: "Web Design",
      };

      const emailHtml = generateProposalRejectedEmail(emailData);

      expect(emailHtml).toContain("Hello, Jane Doe");
      expect(emailHtml).toContain(
        'your proposal for the job titled <strong>"Web Design"</strong> has not been accepted'
      );
    });
  });

  describe("sendEmail", () => {
    it("should send an email using SendGrid", async () => {
      sgMail.send.mockResolvedValueOnce();

      const emailDetails = {
        to: "test@example.com",
        subject: "Test Email",
        html: "<p>This is a test email.</p>",
      };

      await sendEmail(emailDetails);

      expect(sgMail.send).toHaveBeenCalledWith({
        to: emailDetails.to,
        from: {
          email: "SkillConnect.info@gmail.com",
          name: "SkillConnect",
        },
        subject: emailDetails.subject,
        html: emailDetails.html,
      });
    });

    it("should log an error if sending email fails", async () => {
      const mockError = new Error("Failed to send email");
      sgMail.send.mockRejectedValueOnce(mockError);

      console.error = jest.fn();

      const emailDetails = {
        to: "test@example.com",
        subject: "Test Email",
        html: "<p>This is a test email.</p>",
      };

      await sendEmail(emailDetails);

      expect(console.error).toHaveBeenCalledWith(
        "Error sending email:",
        mockError
      );
    });
  });
});
