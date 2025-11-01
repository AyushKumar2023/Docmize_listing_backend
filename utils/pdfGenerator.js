import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generatePrescriptionPDF = async (doctor, user, consultation) => {
  const doc = new PDFDocument();
  const filePath = path.join("uploads", `prescription_${consultation._id}.pdf`);
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("Docmize Digital Prescription", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Doctor: ${doctor.name}`);
  doc.text(`Specialization: ${doctor.specialization}`);
  doc.text(`Patient: ${user.name}`);
  doc.text(`Consultation Type: ${consultation.consultationType}`);
  doc.moveDown();
  doc.fontSize(14).text("Diagnosis:");
  doc.fontSize(12).text(consultation.diagnosis || "N/A");
  doc.moveDown();
  doc.fontSize(14).text("Prescription:");
  doc.fontSize(12).text(consultation.prescription || "N/A");
  doc.moveDown();
  doc.fontSize(14).text("Advice:");
  doc.fontSize(12).text(consultation.advice || "N/A");

  doc.end();
  return filePath;
};

export default generatePrescriptionPDF;
