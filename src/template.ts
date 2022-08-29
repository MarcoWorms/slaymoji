import ejs from 'ejs'
import screens from './screens/load.js'
import CLASSES from './game/models/classes.js'

export const renderClass = name => {
  const klass = CLASSES.find(k => k.name === name)!

  const nameUpperCase = klass.name.charAt(0).toUpperCase() + klass.name.slice(1)
  const health = klass.health
  const deck = klass.deck
  const artifacts = klass.artifacts
  const nameLowerCase = klass.name.toLowerCase()

  return ejs.render(screens.klass, {
    nameUpperCase,
    health,
    deck,
    artifacts,
    nameLowerCase,
  })
}
