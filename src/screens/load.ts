import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const welcome = fs.readFileSync(path.join(__dirname, 'welcome.md'), 'utf8')
const pickClass = fs.readFileSync(path.join(__dirname, 'pick_class.md'), 'utf8')
const klass = fs.readFileSync(path.join(__dirname, 'class.md'), 'utf8')


export default {
  welcome,
  pickClass,
  klass,
}
