// The Happy Plates menu checks. GitHub runs this on every pull request (see .github/workflows/menu-checks.yml).
// Usage: node .github/checks/menu-check.mjs prices|alt|photos
import { readFileSync, existsSync, appendFileSync } from 'node:fs';

const which = process.argv[2];
const FILE = 'index.html';
const lines = readFileSync(FILE, 'utf8').split('\n');
const problems = [];
const passed = [];
const bad = (line, msg, fix) => problems.push({ line, msg, fix });

// A leftover conflict marker breaks the whole page, so every check stops on it.
lines.forEach((text, i) => {
  if (/^\s*(<{7}|={7}|>{7})/.test(text)) {
    bad(i + 1, `A conflict marker (${text.trim().slice(0, 7)}) is still in index.html.`,
      'Delete the three marker lines: the one starting with <<<<<<<, the ======= line and the one starting with >>>>>>>.');
  }
});

// Read every dish: <article class="dish"> ... </article>
const dishes = [];
let cur = null;
lines.forEach((text, i) => {
  if (text.includes('<article class="dish">')) {
    if (cur) bad(cur.start, `The dish block that starts on line ${cur.start} never closes: line ${i + 1} starts a new dish before its </article>.`,
      'Every dish needs all 6 lines: <article class="dish">, the photo, the name, the description, the price, and </article>.');
    cur = { start: i + 1, name: '(no name)' };
  }
  if (!cur) return;
  let m;
  if ((m = text.match(/<h3>(.*?)<\/h3>/))) cur.name = m[1].trim();
  if (text.includes('<img')) {
    cur.imgLine = i + 1;
    cur.src = (text.match(/src="([^"]*)"/) || [])[1];
    const a = text.match(/alt="([^"]*)"/);
    cur.alt = a ? a[1].trim() : null;
  }
  if ((m = text.match(/<p class="price">(.*?)<\/p>/))) { cur.priceLine = i + 1; cur.price = m[1].trim(); }
  if (text.includes('</article>')) { dishes.push(cur); cur = null; }
});
if (cur) bad(cur.start, `The dish block that starts on line ${cur.start} never closes.`, 'Add </article> as the last line of that dish.');

if (!problems.length) for (const d of dishes) {
  if (which === 'prices') {
    if (d.price === undefined) bad(d.start, `"${d.name}" has no price.`, 'Add a line like <p class="price">$12.50</p> inside the dish block.');
    else if (!/^\$\d{1,2}\.\d{2}$/.test(d.price)) bad(d.priceLine, `"${d.name}" has the price "${d.price}".`, 'Write it like $12.50: a dollar sign, the dollars, a dot, then two digits for the cents.');
    else if (+d.price.slice(1) < 5 || +d.price.slice(1) > 25) bad(d.priceLine, `"${d.name}" costs ${d.price}.`, 'Every dish needs a real price between $5.00 and $25.00.');
    else passed.push(`${d.name}: ${d.price}`);
  }
  if (which === 'alt') {
    const words = (d.alt || '').split(/\s+/).filter(Boolean);
    if (d.imgLine === undefined) bad(d.start, `"${d.name}" has no photo.`, 'Add an <img> line with a photo from the photos folder.');
    else if (d.alt === null || !words.length) bad(d.imgLine, `"${d.name}" has a photo with no alt text.`, 'Inside the <img> tag, add alt="..." with a few words that describe the photo.');
    else if (words.length < 3 || /^(photo|image|picture|food|dish)$/i.test(d.alt)) bad(d.imgLine, `"${d.name}" has the alt text "${d.alt}", which is too short.`, 'Describe what is in the photo in at least 3 words.');
    else passed.push(`${d.name}: "${d.alt}"`);
  }
  if (which === 'photos') {
    if (d.imgLine === undefined) bad(d.start, `"${d.name}" has no photo.`, 'Add an <img> line with a photo from the photos folder.');
    else if (!d.src || !d.src.startsWith('photos/') || !existsSync(d.src)) bad(d.imgLine, `"${d.name}" uses ${d.src || 'no file'}, which isn't in the photos folder.`, 'Pick a file name from the photos folder and spell it exactly, like photos/fish-tacos.jpg.');
    else passed.push(`${d.name}: ${d.src}`);
  }
}

const title = { prices: 'Prices look like $12.50', alt: 'Every photo has alt text', photos: 'Every photo file exists' }[which];
console.log(`${title}: checked ${dishes.length} dishes in ${FILE}`);
for (const p of passed) console.log(`  ✓ ${p}`);
for (const p of problems) console.log(`::error file=${FILE},line=${p.line},title=Line ${p.line}::Line ${p.line}: ${p.msg} Fix: ${p.fix}`);
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, problems.length
    ? `### ✗ ${title}\n\n${problems.map(p => `- **Line ${p.line}:** ${p.msg} Fix: ${p.fix}`).join('\n')}\n`
    : `### ✓ ${title}\n\nAll ${dishes.length} dishes passed.\n`);
}
if (problems.length) { console.log(`${problems.length} problem${problems.length > 1 ? 's' : ''} found. Fix the line${problems.length > 1 ? 's' : ''} above, commit to your branch, and this check runs again.`); process.exit(1); }
console.log(`All ${dishes.length} dishes passed.`);
