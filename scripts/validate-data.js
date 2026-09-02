/* Validate public/data JSON against schemas. Compile once per file. Not used in the browser. */
const fs = require('fs');
const path = require('path');

let Ajv;
try {
  Ajv = require('ajv');
} catch (e) {
  console.error('Missing ajv. Run: npm install --save-dev ajv');
  process.exit(1);
}

const root = path.join(__dirname, '..');
const ajv = new Ajv({
  allErrors: true,
  strict: true,
  allowUnionTypes: false
});

function readJson(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) {
    console.error('Missing file:', rel);
    process.exit(1);
  }
  const raw = fs.readFileSync(file, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Invalid JSON in', rel);
    console.error(' ', err.message);
    console.error('  File must start with { not a filename or title.');
    process.exit(1);
  }
}

function check(schemaRel, dataRel) {
  const schema = readJson(schemaRel);
  const data = readJson(dataRel);
  const validate = ajv.compile(schema);
  const ok = validate(data);
  if (!ok) {
    console.error('Schema failed:', dataRel);
    (validate.errors || []).slice(0, 30).forEach(function (err) {
      const where = err.instancePath || '/';
      console.error(' ', where, err.message, JSON.stringify(err.params));
    });
    process.exit(1);
  }
  if (dataRel.indexOf('musicdata') !== -1) {
    console.log('OK', dataRel, Object.keys(data.chords).length, 'chords,', data.modes.length, 'modes');
  } else if (data.lessons) {
    console.log('OK', dataRel, data.lessons.length, 'lessons');
  } else {
    console.log('OK', dataRel);
  }
}

check('schema/musicdata.schema.json', 'public/data/musicdata.json');
check('schema/lessons-v2.schema.json', 'public/data/lessons-v2.json');
