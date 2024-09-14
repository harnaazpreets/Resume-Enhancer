// server/services/latexService.js
const hb = require('handlebars');
const latex = require('node-latex');
const path = require('path');
const fs = require('fs');

exports.generatePDF = (enhancedResume) => {
  return new Promise((resolve, reject) => {
    // Load LaTeX template
    const templatePath = path.join(__dirname, '../templates/resumeTemplate.tex');
    const source = fs.readFileSync(templatePath, 'utf-8');

    // Compile template with Handlebars
    const template = hb.compile(source);
    const latexContent = template({ content: enhancedResume });

    // Generate PDF
    const options = {
      // LaTeX options if needed
    };

    const input = Buffer.from(latexContent);
    const pdf = latex(input, options);

    const chunks = [];
    pdf.on('data', (chunk) => chunks.push(chunk));
    pdf.on('error', (err) => reject(err));
    pdf.on('end', () => {
      const result = Buffer.concat(chunks);
      resolve(result);
    });
  });
};
