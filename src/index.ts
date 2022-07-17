import 'dotenv/config'
import { Context, Bot } from 'grammy'
import screens from './screens/load.js'
const bot = new Bot(process.env.BOT_TOKEN || '')

// // Example:
// {
//   "placeholder": "Start with warrior!",
//   "buttons": ["/pick_warrior", "/pick_class"],
// }
interface ReplyOpts {
  placeholder?: string,
  buttons?: string[],
}

interface GrammyButton {
  text: string,
}

interface GrammyReplyMarkup {
  one_time_keyboard: boolean,
  input_field_placeholder?: string,
  keyboard?: [GrammyButton][]
}

interface GrammyReplyOpts {
  parse_mode: string,
  disable_web_page_preview: boolean,
  reply_markup: GrammyReplyMarkup,
}

const defaultReplyOpts: GrammyReplyOpts = {
  "parse_mode": "MarkdownV2",
  "disable_web_page_preview": true,
  "reply_markup": {
    "one_time_keyboard": true,
    // // Example:
    // "input_field_placeholder": "Start with warrior!",
    // "keyboard": [
    //   [ {text: "/pick_warrior"} ],
    //   [ {text: "/pick_class"} ],
    // ]
  }
}

const replyOpts = (opts: ReplyOpts): Object => {
  const finalOpts = Object.assign({}, defaultReplyOpts)

  if (opts.placeholder) {
    finalOpts.reply_markup.input_field_placeholder = opts.placeholder
  }

  if (opts.buttons) {
    finalOpts.reply_markup.keyboard = opts.buttons.map(button => [{text: button}])
  }

  return finalOpts
}

bot.command('start', (ctx) => {
  ctx.reply(screens.welcome, replyOpts({
    placeholder: "Start a new game!",
    buttons: ["/pick_class"],
  }))
})

bot.hears('/pick_class', (ctx) => ctx.reply(screens.pickClass, replyOpts({
  placeholder: "Pick a class!",
  buttons: ["🔴 Warrior"],
})))

const warriorDescription = (ctx: Context) => ctx.reply(screens.warrior, replyOpts({
  placeholder: "Start with warrior!",
  buttons: ["/pick_warrior", "/pick_class"],
}))

bot.hears('🔴 Warrior', warriorDescription)
bot.hears('/Warrior', warriorDescription)

// bot.hears('/pick_warrior', (ctx: Context) => {
//   ctx.reply(`
//     Floor
//   `)
// })
bot.start()

// Enable graceful grammY stop
process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
