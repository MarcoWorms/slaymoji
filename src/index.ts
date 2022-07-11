import 'dotenv/config'
import { Context, Telegraf } from 'telegraf'
import screens from './screens/load.js'
const bot = new Telegraf(process.env.BOT_TOKEN || '')

bot.start((ctx) => {
  ctx.replyWithMarkdownV2(screens.welcome, {
    "disable_web_page_preview": true,
    "reply_markup": {
      "one_time_keyboard": true,
      "input_field_placeholder": "Start a new game!",
      "keyboard": [
        [ {text: "/pick_class"} ],
      ]
    }
  })
})

bot.hears('/pick_class', (ctx) => ctx.replyWithMarkdownV2(`
*Pick a class:*

🔴 */Warrior*

⚫ ~*???????*~

⚫ ~*???????*~

⚫ ~*???????*~

⚫ ~*???????*~
`, {
  "reply_markup": {
    "one_time_keyboard": true,
    "input_field_placeholder": "Pick a class!",
    "keyboard": [
      [ {text: "🔴 Warrior"} ],
    ]
  }
}))

const warriorDescription = (ctx: Context) => ctx.replyWithMarkdownV2(`
🔴 *Warrior*

❤️ *50* health points

*Initial Deck:*
👊 Deal 2 damage
👊 Deal 2 damage
👊 Deal 2 damage
✋ Block 6 damage
💪 Other emojis have 2x power this turn

*Initial Artifact:*
💖 Heals 5 hp after every combat

*press /pick\\_warrior to start the game\\!*

or go back to /pick\\_class to choose another one
`, {
  "reply_markup": {
    "one_time_keyboard": true,
    "input_field_placeholder": "Start with warrior!",
    "keyboard": [
      [ {text: "/pick_warrior"} ],
      [ {text: "/pick_class"} ],
    ]
  }
})

bot.hears('🔴 Warrior', warriorDescription)
bot.hears('/Warrior', warriorDescription)

// bot.hears('/pick_warrior', (ctx: Context) => {
//   ctx.replyWithMarkdownV2(`
  
//   `)
// })

bot.launch()
// Enable graceful telegraf stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
