// heals player by 50% hp by default
export const heal = (player, percentage=50) => {
  player.health = Math.min(
    player.maxHealth,
    player.health + Math.floor(player.maxHealth/(100/percentage))
  )
}

export const duplicateEmoji = (player, emoji) => {
  player.deck.push(emoji)
}