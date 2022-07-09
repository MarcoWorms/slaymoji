import 'dotenv/config'
import { Telegraf } from 'telegraf'
import screens from './screens/load.js'
const bot = new Telegraf(process.env.BOT_TOKEN || '')

bot.start((ctx) => {
  ctx.replyWithMarkdownV2(screens.welcome, {
    "reply_markup": {
      "one_time_keyboard": true,
      "input_field_placeholder": "Pick a class!",
      "keyboard": [
        [ {text: "🔴 Warrior"} ],
        [ {text: "🔒 Ranger"} ],
        [ {text: "🔒 Wizard"} ],
        [ {text: "🔒 Necromancer"} ],
        [ {text: "🔒 Priest"} ],
      ]
    }
  })
})

bot.hears('🔴 Warrior', (ctx) => ctx.reply(`
🔴 Warrior

Health: 
❤️ 50 health points

Initial Deck:
👊 Deal 2 damage
👊 Deal 2 damage
👊 Deal 2 damage
✋ Block 6 damage
💪 Other emojis have 2x power this turn

Initial Artifact: 
💖 Heals 5 hp after every combat
`))

bot.launch()
// Enable graceful telegraf stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
