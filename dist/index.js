import 'dotenv/config';
import { Bot } from 'grammy';
import screens from './screens/load.js';
const bot = new Bot(process.env.BOT_TOKEN || '');
const defaultReplyOpts = {
    "parse_mode": "MarkdownV2",
    "disable_web_page_preview": true,
    "reply_markup": {
        "one_time_keyboard": true,
    }
};
const replyOpts = (opts) => {
    const finalOpts = Object.assign({}, defaultReplyOpts);
    if (opts.placeholder) {
        finalOpts.reply_markup.input_field_placeholder = opts.placeholder;
    }
    if (opts.buttons) {
        finalOpts.reply_markup.keyboard = opts.buttons.map(button => [{ text: button }]);
    }
    return finalOpts;
};
bot.command('start', (ctx) => {
    ctx.reply(screens.welcome, replyOpts({
        placeholder: "Start a new game!",
        buttons: ["/pick_class"],
    }));
});
bot.hears('/pick_class', (ctx) => ctx.reply(screens.pickClass, replyOpts({
    placeholder: "Pick a class!",
    buttons: ["🔴 Warrior"],
})));
const warriorDescription = (ctx) => ctx.reply(screens.warrior, replyOpts({
    placeholder: "Start with warrior!",
    buttons: ["/pick_warrior", "/pick_class"],
}));
bot.hears('🔴 Warrior', warriorDescription);
bot.hears('/Warrior', warriorDescription);
bot.start();
process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());
//# sourceMappingURL=index.js.map