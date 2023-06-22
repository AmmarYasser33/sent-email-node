const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// const proxyMiddleware = createProxyMiddleware({
//   target: "https://app.ammar.software:3005",
//   changeOrigin: true,
//   secure: true,
// });

app.use(cors());
// app.use(proxyMiddleware);

// Add CORS headers middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Parse JSON bodies
app.use(express.json());

// Routes

app.get("/main", (req, res) => {
  res.send("Hello World!");
});

// send email with given data array
app.post("/send-email", (req, res) => {
  const {
    name,
    phone,
    email,
    result1,
    result2,
    result3,
    result4,
    result5,
    result6,
    result7,
    result8,
    result9,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
      user: "info@ammar.software",
      pass: "Ammar123258@",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "info@ammar.software",
    // to: "info@macanah.com.sa",
    to: "ammar.yassr.858@gmail.com",
    subject: "تقييم نوذج عمل",
    text: `

    الاسم: ${name}
    الجوال: ${phone}
    الايميل: ${email}
    

    شرائح العملاء: ${result1}
    القنوات: ${result2}
    علاقات العملاء: ${result3}
    الموارد الرئيسية: ${result4}
    الأنشطة الرئيسية: ${result5}
    الشركاء الرئيسيون: ${result6}
    مصادر الإيرادات: ${result7}
    هيكل التكاليف: ${result8}
    المنتجات والخدمات: ${result9}
    `,
    html: `<h3>تقييم نموذج عمل شركة ${name}</h3>

    <p style="direction: rtl">
      <strong>الاسم:</strong> ${name}<br>
      <strong>الجوال:</strong> ${phone}<br>
      <strong>الايميل:</strong> ${email}
    </p>
  
    <p style="direction: rtl">
      <strong>شرائح العملاء:</strong> ${result1}<br>
      <strong>القنوات:</strong> ${result2}<br>
      <strong>علاقات العملاء:</strong> ${result3}<br>
      <strong>الموارد الرئيسية:</strong> ${result4}<br>
      <strong>الأنشطة الرئيسية:</strong> ${result5}<br>
      <strong>الشركاء الرئيسيون:</strong> ${result6}<br>
      <strong>مصادر الإيرادات:</strong> ${result7}<br>
      <strong>هيكل التكاليف:</strong> ${result8}<br>
      <strong>المنتجات والخدمات:</strong> ${result9}
    </p>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email", message: error });
    } else {
      // console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
