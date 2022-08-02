export const healthIcon =  '🖤'

// turn packs contains group of enemies that can be used to serve a floor combat.
export const floorMonsterPacks = [
  {
    floor: 1,
    monstersPacks: [ // in this example, floor 1 combat can be one of the 3 below:
      ['🐀', '🐀'],
      ['🐍', '🐍'],
      ['🐀', '🐍'],
    ]
  },
  {
    floor: 2,
    monstersPacks: [
      ['🐀', '🐀', '🐀'],
      ['🐍', '🐍', '🐍'],
      ['🐀', '🐀', '🐍'],
      ['🐀', '🐍', '🐍'],
    ]
  },
  {
    floor: 3,
    monstersPacks: [
      ['🐗', '🐀', '🐀'],
      ['🐗', '🐍', '🐍'],
      ['🐗', '🐀', '🐍'],
      ['🐗', '🐍', '🐍'],
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

export const MONSTERS = [
  {
    icon: '🐀',
    maxHealth: (floor:number) => 9 + floor,
    deck: ['👊','👊','👊','✋'],
  },
  {
    icon: '🐍',
    maxHealth: (floor:number) => 9 + floor,
    deck: ['👊','👊','✋','✋'],
    artifacts: ['🦾'],
  },
  {
    icon: '🐗',
    maxHealth: (floor:number) => 15 + floor,
    deck: ['👊','👊','✋','✋','💪'],
    artifacts: ['🦾'],
  },
  {
    icon: '🐜',
    maxHealth: (floor:number) => 9 + floor,
    deck: ['👊','👊','👊','✋'],
  },
  {
    icon: '🐷',
    maxHealth: (floor:number) => 9 + floor,
    deck: ['👊','👊','✋','✋'],
    artifacts: ['🦾'],
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
😪 😵 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😽 🙀 😿 😾
🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼
*/