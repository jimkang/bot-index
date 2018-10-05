/* global process, __dirname */
var fs = require('fs');

if (process.argv.length < 5) {
  console.error(
    'Usage: node tools/build-index.js <JSON file with bot info> <page template> <entry template> > index.html'
  );
  process.exit();
}

var entries = JSON.parse(fs.readFileSync(__dirname + '/../' + process.argv[2], { encoding: 'utf8' }));
var pageTemplate = fs.readFileSync(__dirname + '/../' + process.argv[3], { encoding: 'utf8' });
var entryTemplate = fs.readFileSync(__dirname + '/../' + process.argv[4], { encoding: 'utf8' });

var entriesHTML = entries.map(makeHTMLForEntry);
console.log(pageTemplate.replace(/__BOT_ENTRIES__/, entriesHTML));

function makeHTMLForEntry(entry) {
  var html = entryTemplate.slice();
  for (var key in entry) {
    let placeholderRegex = new RegExp(`__${key.toUpperCase()}__`, 'g');
    html = html.replace(placeholderRegex, entry[key]);
  }
  return html;
}

