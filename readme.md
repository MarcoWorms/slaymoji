# ⚔️ Slaymoji

Descend into increasingly hard procedural dungeons and build unique emojis decks!

## ❔ How to play

1) Message [@slaymoji_bot](https://t.me/slaymoji_bot) on telegram to start **(not working yet, come back later!)**
2) Pick one of the available classes to play with
3) Descend into a 45 floors dungeon!
    - Each floor present you with simple micro choices that stack into complex macro strategy. Can you reach the end alive??
    - If you die go back to step 2 and try again with the same or another class!
    - If you win you will also go back to step 2, but things will get harder 😈

Each class has a unique initial emoji deck and artifact, and all floor rewards given are based on the class you picked.

## 👊 Emoji Deck, Combat, and Artifacts

Every emoji deck starts with 5 emojis. When you face an enemies in combat the combat system will automatically play all turns and return who won.

![](https://i.imgur.com/q5xrqfu.png)

👊 In each combat turn: 3 random emojis from your deck will be played, and each enemy will play 1 emoji.  
🖐️ Emojis may deal or block damage, as well as inflict status changes like poison, stun, burn, and other common RPG tropes.  
⚔️ A Combat ends when either the player or all enemies reach Health 0. If the player wins he/she will go to the next floor with the same amount of current Health.  
🎲 In the end of every combat: the player can choose 1 of 3 emojis shown to add to the deck, or there is an option to skip and maintain the deck unaltered.  
💖 Artifacts apply a constant effect throughout the entire gameplay. For example, the initial Warrior artifact heals the player for a fixed amount every time a combat is won.  

## 🏛️ Floor Types

When the player moves to the next floor, sometimes more than one option emerges for what should happen next: each option will correspond to one of the below floor types:

### ⚔️ **Combat**
Normal combat, enemies vary depending on the floor, the deeper into the dungeon the harder they get, always rewards with a "pick one out of 3 emojis or skip". Also rewards a bit of gold.

### ☠️ **Miniboss**
Harder than usual combat, but rewards an random artifact (or skip) and the same rewards as a combat would.

### 💀 **Boss**
Every 15th floor is a boss, it's a harder than usual combat, but rewards an "pick one out of 3 artifacts or skip" and the same rewards as a Miniboss combat would (random artifact + pick emoji). Player is fully healed after winning.

### 💰 **Shop**
Trade gold for emojis and artifacts, or burn emojis from your deck.

### 🏕️ **Rest**
Heal 50% total health, "pick one out of 3 emojis or skip".

### 🎲 **Random Event**
Who knows what weird choices you'll have to take here?? Sometimes good, sometimes bad, sometimes neutral. 

## 😈 Acsensions

When the player beats floor 45, ascensions are unlocked. When replaying the game with the same class used before to win, the player can choose to up the difficulty notch by 1. Each time the player beats floor 45 in the current ascension, the next ascension difficulty is unlocked and every previous difficulty modifier stack:

**Acsension 1** 😈: Start dungeon with 50% health. Boss fights only heal up to 50% health.  
**Acsension 2** 😈😈: Boss fights no longer heal. (+ asc 1)  
**Acsension 3** 😈😈😈: Combat monsters have 50% more hp (+ asc 1, 2)  
**Acsension 4** 😈😈😈😈: Miniboss monsters have 50% more hp (+ asc 1, 2, 3)  
**Acsension 5** 😈😈😈😈😈: Boss monsters have 50% more hp (+ asc 1, 2, 3, 4)  

> The above are just examples and not the actual ascention modifiers. The number of total ascensions and their effects will depend on how the gameplay turn out, it's something that can't be predicted before the combat system is working and we play the game 

## 🏗️ Release Schedule

Stay in touch with our community and release dated by joining the groups below:  
[🚨 Slaymoji Announcements](https://t.me/slaymoji)  
[💬 Slaymoji Community Chat](https://t.me/slaymoji_chat)  

### 🧱 **Early Alpha**
Admin still creating code and testing rudimentary things.

### 🔒 **Closed Beta**
Admin invite-only period.

### 🔓 **Open Beta**
Members open to inviting other members period.

### 🌍 **Full Release**
Fully open to play! 

## 🌟 Inspiration

Slaymoji draws great inspiration from many roguelikes and idle games, but most notably it's inspired by:

- [Slay the Spire](https://store.steampowered.com/app/646570/Slay_the_Spire/) - Fused card games and roguelikes together to make the best single player deckbuilder they could, we believe they succeeded!
- [Telemmo](https://github.com/telemmo/telemmo) - Idle MMORPG that @derekstavis and I did in the past, now discontinued, had a fully idle combat that we mixed with Slay The Spire and removed the MMO aspects

## 📖 License & Disclaimers

Everything in this repository is licensed under [GPL-3](https://www.gnu.org/licenses/gpl-3.0.en.html), feel free to fork it and make

The following telegram groups and bots are managed by @marcoworms, which also happens to maintain the code for this repo along with @evaporei:

- Slaymoji Game Bot: https://t.me/slaymoji_bot  
- Slaymoji Announcements Group: https://t.me/slaymoji  
- Slaymoji Community Chat Group: https://t.me/slaymoji_chat  

Any other group or bot is not maintained by us.

Feel free to fork the code and redistribute it even if commercially, if you do it please let us know on the above channels! We'd like to support you and create channels for the communities to coexist.

## 🔧 Develop

Set up the telegram bot token by creating a `.env` file in the project root with `BOT_TOKEN = 'TELEGRAM_BOT_TOKEN_FROM_BOTFATHER'`. To make a new bot just talk to the BotFather: https://t.me/botfather

- `npm i` install dependencies
- `npm start` start development environment, updates automatically on saving file

We still don't have vercel/gcp infrastructure for deployment, when this is done we will update this file with instructions on how to self host your version of this bot.