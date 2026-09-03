import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, '../../VectorShift_Executive_Diligence_Report.pdf');
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const targetUrl = process.env.PDF_URL || 'http://localhost:5173/';

console.log(`\n======================================================`);
console.log(`  VECTORSHIFT EXECUTIVE GAZETTE · PDF EXPORT ENGINE   `);
console.log(`======================================================`);
console.log(`Target URL:  ${targetUrl}`);
console.log(`Output File: ${outputPath}`);
console.log(`Rendering high-resolution vector PDF via Headless Chrome...\n`);

try {
  execSync(
    `"${chromePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${outputPath}" --no-pdf-header-footer "${targetUrl}"`,
    { stdio: 'inherit' }
  );
  console.log(`\n✓ SUCCESS: Paginated PDF exported to:`);
  console.log(`  ${outputPath}\n`);
} catch (err) {
  console.error(`\n✖ ERROR during PDF generation:`, err.message);
  process.exit(1);
}
