import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generateInvoice = async (transaction, doctor, user) => {
  const doc = new PDFDocument();
  const filePath = path.join("uploads", `invoice_${transaction._id}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Docmize Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Transaction ID: ${transaction._id}`);
  doc.text(`Doctor: ${doctor.name}`);
  doc.text(`Patient: ${user.name}`);
  doc.text(`Payment Method: ${transaction.paymentMethod}`);
  doc.moveDown();

  doc.text(`Total Amount: ₹${transaction.amount}`);
  doc.text(`Commission (20%): ₹${transaction.commission}`);
  doc.text(`Doctor Earnings: ₹${transaction.doctorEarning}`);
  doc.moveDown();
  doc.text("Thank you for using Docmize!", { align: "center" });

  doc.end();
  return filePath;
};

export default generateInvoice;
