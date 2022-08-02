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

export default [
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
    icon: '🤞',
    description: caster => `Deal ${6 + caster.attackPower} damage to a random enemy`,
    type: e.ATTACK,
    cast: (caster, targets) => {
      dealDamage(caster, pickRandomAlive(targets), 6)
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
    icon: '✊',
    description: caster => `Block ${7 + caster.blockPower} damage`,
    type: e.SKILL,
    cast: (caster, _targets) => {
      caster.block += 7 + caster.blockPower
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
    icon: '💫',
    type: e.SKILL,
    description: _caster => `A random enemy can't play this turn`,
    cast: (_caster, targets) => {
      pickRandomAlive(targets).stunned += 1
    },
  },
  {
    icon: '💬',
    type: e.SKILL,
    description: _caster => `All enemies can't play skills next turn`,
    cast: (_caster, targets) => {
      targets.forEach(target => target.silenced += 1)
    },
  },
  {
    icon: '👋',
    type: e.SKILL,
    description: _caster => `All enemies can't play attacks next turn`,
    cast: (_caster, targets) => {
      targets.forEach(target => target.disarmed += 1)
    },
  },
  {
    icon: '🧊',
    type: e.SKILL,
    description: caster => `Block ${3 + caster.blockPower} damage, block persists until next turn`,
    cast: (caster, _targets) => {
      caster.block += 3 + caster.blockPower
      caster.fortified = 1
    },
  },
]

// TODO: card types to implement later, initially fixed but maybe this could be dinamically added on emojis through shops and random events
// --- card types
// exhaust: card is removed from deck this floor after playing it once, comes backl next floor
// unique: effect is only applied once even if card is played multiple times ion a turn
// clone: when played add one temporary copy of the card to your deck for this floor


/* emojis for new cards


 🤚 🖐 ✋ 🖖 👌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 
👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 
🤝 🙏 ✍️ 💅 🤳 💪 
🦵 🦶 👂  🧠     

💦💨🌪🔥💥☄️⚡️✨🌋🌌🔊🩸💋🌟
👣👀👅👄🧲🔫💣 🧨🪓🔪🧿💉
*/