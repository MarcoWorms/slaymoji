import classes, { gameClass } from './models/classes'

export default {
  getClasses: classes,
  getInitialClassState: (className: string) => classes.find(gameClass => gameClass.name === className),
  generateMonster: (turn: number) => {},
  generateNextRooms: (turn: number) => {},
  generateRewards: (className: string) => {},
  executeCombat: (player:gameClass, monster:gameClass) => {},
}