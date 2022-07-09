import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import parseMD from 'parse-md';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { content: welcome } = parseMD(fs.readFileSync(path.join(__dirname, 'welcome.md'), 'utf8'));
export default {
    welcome,
};
//# sourceMappingURL=load.js.map