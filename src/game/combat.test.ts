import initPrompt from 'prompt-sync'
import EMOJIS, { emojiTypes } from './models/emojis.js'
import { unwrapIcons, run } from './combat.js'
import CLASSES from './models/classes.js'
const prompt = initPrompt()

let floor = 1
let mockPlayer = CLASSES.find(clas => clas.name === 'Warrior')
let testCombat = {} as any
let loop = true
while(loop) {
  testCombat = run({ player: testCombat.player ? testCombat.player : mockPlayer , floor })
  console.log(testCombat.log)
  let input = parseInt(prompt(
    `Current Health:${
      testCombat.player.health}/${testCombat.player.maxHealth
      }\nCurrent Deck:${
        testCombat.player.deck.sort().join('')
      }\nPick one:\n`
      + unwrapIcons(testCombat.rewards?.pickOneEmoji, EMOJIS).map((emoji, index) => `${index+1}: ${emoji.icon} ${emoji.description(testCombat.player)}`).join('\n')
      + '\n'
      + '4: skip'
      + '\n',
    '-1'
  ))
  if (input === 1 || input === 2 || input === 3) {
    const reward = testCombat.rewards?.pickOneEmoji[input - 1]
    testCombat.player.deck.push(reward)
  }
  if (input === 0) {
    loop = false
    break
  }
  floor += 1
}
