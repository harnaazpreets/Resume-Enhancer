// server/utils/parseResume.js
const pdfParse = require('pdf-parse');

module.exports = async (file) => {
  if (file.mimetype === 'application/pdf') {
    const dataBuffer = file.buffer;
    const data = await pdfParse(dataBuffer);
    return data.text;
  } else {
    // Handle other file types (e.g., .txt, .docx)
    return file.buffer.toString('utf-8');
  }
};
