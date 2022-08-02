export enum artifactTriggers {
  COMBAT_WON,
  EVERY_TURN,
}
const t = artifactTriggers

const dealDamageWithoutAttackPower = (_caster, target, damage) => {
  const dmgAfterBlock = damage - target.block
  if (dmgAfterBlock > 0) {
    target.health -= dmgAfterBlock
  } else {
    target.block -= damage
  }
}

const dealDamage = (caster, target, damage) => {
  const dmgAfterBlock = damage + caster.attackPower - target.block
  if (dmgAfterBlock > 0) {
    target.health -= dmgAfterBlock
  } else {
    target.block -= damage + caster.attackPower
  }
}

export default [
  {
    icon: '💖',
    description: _caster => 'Heals 5 hp after every combat won',
    trigger: t.COMBAT_WON,
    cast: (caster, _targets) => {
      caster.health += 5
      caster.health = Math.min(caster.health, caster.maxHealth)
    }
  },
  {
    icon: '🦾',
    description: caster => `Deal ${1 + caster.attackPower} damage to the all enemies every turn`,
    trigger: t.EVERY_TURN,
    cast: (caster, targets) => {
      targets.forEach(target => dealDamage(caster, target, 1))
    }
  },
  {
    icon: '🦿',
    description: caster => `Block ${2 + caster.blockPower} damage every turn`,
    trigger: t.EVERY_TURN,
    cast: (caster, _targets) => {
      caster.block += 2 + caster.blockPower
    }
  },
  // artifact ideas
  { description: 'Deal x damage to a random target every turn' },
  { description: 'Increase gold gained every combat by X' },
  { description: 'Rewards show 1 more option' },
  { description: 'Random Events will no longet be combats' },
  { description: 'Permanently increase attack power by 1' },
  { description: 'Permanently increase block power by 1' },
  { rare: true, description: 'Purge all curse cards from deck, can no longer be cursed' }, // curse cards are emojis that are added to your deck on bad event
  { rare: true, description: 'Cast 1 extra emoji every turn' },
] as artifact[]

export type artifact = {
  icon: string,
  description: (caster) => string,
  trigger: artifactTriggers,
  rare?: boolean,
  cast: (caster, targets) => void,
}

/* emojis for new artifacts
🦿

🌊☂️☔️💧❄️☀️🌈⭐️🪐🌍🌕🌑☘️🍀🎄🌵🌫👺👹🦴🦷

🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🥭 🍍 
🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🌽 🥕 🧄 🧅 🥔
🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 
🍖 🦴 🌭 🍔 🍟 🍕 🥪 🥙 🧆 🌮 🌯 🥗 🥘 🥫
🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢
🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 
🥜 🍯 🥛 🍼  ☕️ 🍵 🧃 🥤 🍶 🍺 🍻 🥂 🍷 🥃 🍸
🍹 🧉 🍾 🧊 🥄 🍴 🍽 🥣 🥡 🥢 🧂

⚗️ 🪒 🧽 🧸 📌 📍 ✂️ ✒️📭 📮


⚽️ 🏀 🏈 ⚾️ 🥎 🎾 🏐 🏉 🥏 🎱 🪀 🏓
🥁 🎷 🎺 🎸 🪕 🎻 🎲 ♟ 🎯 🎳 🎮 🎰 🧩
*/