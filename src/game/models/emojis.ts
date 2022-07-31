const randomTarget = targets => targets[Math.floor(Math.random() * targets.length)]

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
  ATTACK,
  SKILL, // skills of all combat participants are played before attacks
}
const e = emojiTypes

export default [
  {
    icon: '👊',
    description: 'Deal 4 damage to the front enemy',
    type: e.ATTACK,
    cast: (caster, targets) => {
      dealDamage(caster, pickFirstAlive(targets), 4)
    },
  },
  {
    icon: '👏',
    description: 'Deal 2 damage to all enemies',
    type: e.ATTACK,
    cast: (caster, targets) => {
      targets.forEach(target => dealDamage(caster, target, 2))
    },
  },
  {
    icon: '✋',
    description: 'Block 5 damage',
    type: e.SKILL,
    cast: (caster, _targets) => {
      caster.block += 5 + caster.blockPower
    },
  },
  {
    icon: '💪',
    type: e.SKILL,
    description: 'Increase your attack power by 1 until the end of this floor',
    cast: (caster, _targets) => {
      caster.attackPower += 1
    },
  },
  {
    icon: '🦵',
    type: e.SKILL,
    description: 'Increase your block power by 1 until the end of this floor',
    cast: (caster, _targets) => {
      caster.blockPower += 1
    },
  },
  // emoji ideas
  { description: 'Enemies deal half damage next turn' },
]

// TODO: card types to implement later, initially fixed but maybe this could be dinamically added on emojis through shops and random events
// exhaust: card is removed from deck this floor after playing it once, comes backl next floor
// unique: effect is only applied once even if card is played multiple times ion a turn
// clone: when played add one temporary copy of the card to your deck for this floor

/* emojis for new cards


👋 🤚 🖐 ✋ 🖖 👌 🤏 ✌️ 🤞 🤟 🤘 🤙 👈 👉 
👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 👐 🤲 
🤝 🙏 ✍️ 💅 🤳 💪 
🦵 🦶 👂  🧠     

💦💨🌪🔥💥☄️⚡️✨🌟💫🌋🌌🔊🩸💋
👣👀👅👄🧲🔫💣 🧨🪓🔪🧿💉
*/