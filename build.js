
const fs = require('fs');

// Read the HTML template
let html = fs.readFileSync('src/index.html', 'utf8');

// Read the CSS
const css = fs.readFileSync('src/styles.css', 'utf8');

// Read the JavaScript
const js = fs.readFileSync('src/script.js', 'utf8');

// Read the talks data
const talks = fs.readFileSync('data/talks.json', 'utf8');

// Replace the CSS link with inline CSS
html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`);

// Replace the script src with inline JavaScript
html = html.replace('<script src="script.js"></script>', `<script>${js}</script>`);

// Modify the JavaScript to use the inline data
html = html.replace(
  "fetch('../data/talks.json')",
  "Promise.resolve(new Response(JSON.stringify(talksData)))"
);

// Inject the talks data into the HTML
html = html.replace(
  '</head>',
  `<script>const talksData = ${talks};</script></head>`
);

// Write the final HTML file
fs.writeFileSync('index.html', html);

console.log('Successfully built the serverless index.html file!');
