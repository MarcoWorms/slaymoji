const pickRandomAlive = targets => targets
  .filter(target => target.health > 0)
  [Math.floor(Math.random() * targets.length)]

const dealDamage = (caster, target, damage) => {
  const dmgAfterBlock = damage + caster.attackPower - target.block
  if (dmgAfterBlock > 0) {
    target.health -= dmgAfterBlock
  } else {
    target.block -= damage + caster.attackPower
  }
}

const pickFirstAlive = targets => targets.find(target => target.health > 0) || targets[0] // if none found send a dead one so nothing explodes

export enum emojiTypes {
  SKILL, // skills of all combat participants are played before attacks
  ATTACK,
}
const e = emojiTypes

const EMOJIS = [
  {
    icon: '👊',
    description: caster => `Deal ${3 + caster.attackPower} damage to front enemy`,
    type: e.ATTACK,
    cast: (caster, targets) => {
      dealDamage(caster, pickFirstAlive(targets), 3)
    },
  },
  {
    icon: '👏',
    description: caster => `Deal ${3 + caster.attackPower} damage to all enemies`,
    type: e.ATTACK,
    cast: (caster, targets) => {
      targets.forEach(target => dealDamage(caster, target, 3))
    },
  },
  {
    rare: true,
    icon: '☄️',
    description: caster => `Deal ${7 + caster.attackPower} damage to all enemies`,
    type: e.ATTACK,
    cast: (caster, targets) => {
      targets.forEach(target => dealDamage(caster, target, 7))
    },
  },
  {
    icon: '🤞',
    description: caster => `Deal ${6 + caster.attackPower} damage to a random enemy`,
    type: e.ATTACK,
    cast: (caster, targets) => {
      dealDamage(caster, pickRandomAlive(targets), 6)
    },
  },
  {
    icon: '🤞',
    description: caster => `Deal ${1 + caster.attackPower} damage 4 times too random enemies.`,
    type: e.ATTACK,
    cast: (caster, targets) => {
      dealDamage(caster, pickRandomAlive(targets), 1)
      dealDamage(caster, pickRandomAlive(targets), 1)
      dealDamage(caster, pickRandomAlive(targets), 1)
      dealDamage(caster, pickRandomAlive(targets), 1)
    },
  },
  {
    icon: '✋',
    description: caster => `Block ${4 + caster.blockPower} damage`,
    type: e.SKILL,
    cast: (caster, _targets) => {
      caster.block += 4 + caster.blockPower
    },
  },
  {
    icon: '🧊',
    type: e.SKILL,
    description: caster => `Block ${3 + caster.blockPower} damage and apply 1 FORTIFY`,
    cast: (caster, _targets) => {
      caster.block += 3 + caster.blockPower
      caster.fortified = 1
    },
  },
  {
    rare: true,
    icon: '🛡️',
    description: caster => `Block ${8 + caster.blockPower} damage and apply 1 FORTIFY`,
    type: e.SKILL,
    cast: (caster, _targets) => {
      caster.block += 8 + caster.blockPower
      caster.fortify += 1
    },
  },
  {
    icon: '💪',
    type: e.SKILL,
    description: _caster => `Increase attack power by 1 this floor`,
    cast: (caster, _targets) => {
      caster.attackPower += 1
    },
  },
  {
    icon: '🦵',
    type: e.SKILL,
    description: _caster => `Increase block power by 1 this floor`,
    cast: (caster, _targets) => {
      caster.blockPower += 1
    },
  },
  {
    icon: '🌋',
    type: e.SKILL,
    description: _caster => `Increase attack and block power by 1 this floor`,
    cast: (caster, _targets) => {
      caster.attackPower += 1
      caster.blockPower += 1
    },
  },
  {
    icon: '💫',
    type: e.SKILL,
    description: _caster => `Apply 1 STUNNED to a random enemy`,
    cast: (_caster, targets) => {
      pickRandomAlive(targets).stunned += 1
    },
  },
  {
    icon: '💬',
    type: e.SKILL,
    description: _caster => `Apply 1 SILENCE to all enemies`,
    cast: (_caster, targets) => {
      targets.forEach(target => target.silenced += 1)
    },
  },
  {
    icon: '👅',
    type: e.ATTACK,
    description: caster => `Deal ${2 + caster.attackPower} damage to a random enemy and apply 1 SILENCE`,
    cast: (caster, targets) => {
      const target = pickRandomAlive(targets)
      target.silenced += 1
      dealDamage(caster, target, 2)
    },
  },
  {
    icon: '👋',
    type: e.SKILL,
    description: _caster => `Apply 1 DISARMED to all enemies`,
    cast: (_caster, targets) => {
      targets.forEach(target => target.disarmed += 1)
    },
  },
  {
    icon: '✨',
    type: e.SKILL,
    description: _caster => `Add 1 ❌ to all enemies decks this floor`,
    cast: (_caster, targets) => {
      targets.forEach(target => target.deck.push(EMOJIS.find(emoji => emoji.icon === '❌')))	
    },
  },
  {
    icon: '🔊',
    type: e.SKILL,
    description: _caster => `Apply 2 DAZED to all enemies`,
    cast: (_caster, targets) => {
      targets.forEach(target => target.dazed += 2)
    },
  },
  {
    icon: '❌',
    type: e.SKILL,
    description: _caster => `Does nothing!`,
    cast: (_caster, _targets) => {
    },
  },
  {
    icon: '🩸',
    type: e.ATTACK,
    description: caster => `Apply ${5 + caster.attackPower} POISON to a random enemy`,
    cast: (caster, targets) => {
      pickRandomAlive(targets).poison += 5 + caster.attackPower
    },
  },
  {
    icon: '💉',
    type: e.ATTACK,
    description: caster => `Deal 3 damage to a random enemy and apply ${2 + caster.attackPower} POISON `,
    cast: (caster, targets) => {
      const target = pickRandomAlive(targets)
      dealDamage(caster, target, 3)
      target.poison += 2 + caster.attackPower
    },
  },
]

export default EMOJIS

// TODO: card types to implement later, initially fixed but maybe this could be dinamically added on emojis through shops and random events
// --- card types
// exhaust: card is removed from deck this floor after playing it once, comes backl next floor
// unique: effect is only applied once even if card is played multiple times ion a turn
// clone: when played add one temporary copy of the card to your deck for this floor


/* emojis for new cards


 🤚 🖐 ✋ 🖖 👌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 ✊
👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 
🤝 🙏 ✍️ 💅 🤳 💪 
🦵 🦶 👂  🧠     

💦💨🌪🔥💥☄️⚡️✨🌋🌌🔊💋🌟
👣👀👄🧲🔫💣 🧨🪓🔪🧿
*/