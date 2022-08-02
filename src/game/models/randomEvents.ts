export const randomEvents = [
  {
    choices: [
      {
        description: 'Remove 1 random emoji from the deck',
        effect: () => {},
      },
      {
        description: 'Add 1 random emoji on your deck',
      },
    ]
  },
  {
    choices: [
      {
        description: 'Add 1 random artifact',
      },
      {
        description: 'Add 3 attack emojis on your deck',
      },
      {
        description: 'Add 3 skill emojis on your deck',
      },
    ]
  },
  {
    choices: [
      {
        description: 'Add 1 random artifact, Remove 1 random artifact',
      },
      {
        description: 'Remove 1 random emoji from the deck, Add 1 random emoji on your deck',
      },
    ]
  },
  {
    choices: [
      {
        description: 'Duplicate all attacks in your deck',
      },
      {
        description: 'Duplicate all skills in your deck',
      },
      {
        description: 'Do nothing',
      },
    ]
  },
  {
    redirectToRoom: 'shop',
  },
  {
    redirectToRoom: 'combat',
  },
  {
    redirectToRoom: 'miniboss',
  },
]