import 'dotenv/config';
import { Bot } from 'grammy';
import screens from './screens/load.js';
const bot = new Bot(process.env.BOT_TOKEN || '');
bot.command('start', (ctx) => {
    ctx.reply(screens.welcome, {
        "parse_mode": "MarkdownV2",
        "disable_web_page_preview": true,
        "reply_markup": {
            "one_time_keyboard": true,
            "input_field_placeholder": "Start a new game!",
            "keyboard": [
                [{ text: "/pick_class" }],
            ]
        }
    });
});
bot.hears('/pick_class', (ctx) => ctx.reply(`
*Pick a class:*

🔴 */Warrior*

⚫ ~*???????*~

⚫ ~*???????*~

⚫ ~*???????*~

⚫ ~*???????*~
`, {
    "parse_mode": "MarkdownV2",
    "reply_markup": {
        "one_time_keyboard": true,
        "input_field_placeholder": "Pick a class!",
        "keyboard": [
            [{ text: "🔴 Warrior" }],
        ]
    }
}));
const warriorDescription = (ctx) => ctx.reply(`
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
    "parse_mode": "MarkdownV2",
    "reply_markup": {
        "one_time_keyboard": true,
        "input_field_placeholder": "Start with warrior!",
        "keyboard": [
            [{ text: "/pick_warrior" }],
            [{ text: "/pick_class" }],
        ]
    }
});
bot.hears('🔴 Warrior', warriorDescription);
bot.hears('/Warrior', warriorDescription);
bot.start();
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
//# sourceMappingURL=index.js.map