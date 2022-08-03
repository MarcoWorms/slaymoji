export const healthIcon =  '🖤'

// turn packs contains group of enemies that can be used to serve a floor combat.
export const floorMonsterPacks = [
  {
    floor: 1,
    monsters: [
      { allow: ['🐀','🐍'], count: 2, },
    ]
  },
  {
    floor: 2,
    monsters: [
      { allow: ['🐀','🐍'], count: 3, },
    ]
  },
  {
    floor: 3,
    monsters: [
      { allow: ['🐜'], count: 1, },
      { allow: ['🐀','🐍'], count: 2, },
    ]
  },
  {
    floor: 4,
    monsters: [
      { allow: ['🐜','🐷'], count: 2, },
      { allow: ['🐀','🐍'], count: 1, },
    ]
  },
]

export type monster = {
  name: string,
  icon: string,
  maxHealth: (floor:number) => number,
  health: number,
  deck: string[],
  emojisPerTurn: number,
  artifacts: string[],
  attackPower: number,
  blockPower: number,
  block?: number,
}

export default [
  {
    icon: '🐀',
    getMaxHealth: (floor:number) => 9 + floor,
    deck: ['👊','👊','👊','✋'],
  },
  {
    icon: '🐍',
    getMaxHealth: (floor:number) => 6 + floor,
    deck: ['👊','👊','✋','✋','🦵'],
    artifacts: ['🦿'],
  },
  {
    icon: '🐜',
    getMaxHealth: (floor:number) => 9 + floor,
    deck: ['👊','👊','👊','✋','🦵','💪'],
    artifacts: ['🦾'],
  },
  {
    icon: '🐷',
    getMaxHealth: (floor:number) => 20 + floor,
    deck: ['👊','👊','✋','✋','💪'],
  },
  {
    icon: '🐗',
    getMaxHealth: (floor:number) => 30 + floor,
    deck: ['👊','👊','✋','✋','💪', '🛡️'],
    artifacts: ['🦾', '🦿'],
    miniboss: true,
  },
]

/* emoji to use for new monsters
🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐽 🐸 🐵 🙈 🙉 🙊 
🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐞 
 🦟 🦗 🕷 🕸 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡 🐠 🐟 
🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🐃 🐂 
🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🦮 🐕‍🦺 🐈 🐈‍ 🐓 🦃 🦚 🦜 🦢 
🐇 🦝 🦨 🦡  🐁 🐀  🦔  🐉 🐲 🌞 🌝 🌛 🌜 🌚 🌕

// miniboss/boss

😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 
😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 
🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢
😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🤗 🤔
🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤
😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑  😽 🙀 😿 😾
🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 🤠
*/