import { CheckboxProps } from '@mui/material';
import theme from '../../app/theme';

export const RapidRouterGameTabs = {
  gettingStarted: {
    name: 'Getting started',
    color: theme.palette.success.light,
    levels: [
      {
        levelNumber:  '1',
        name: 'Can you help the van get to the house?'
      },
      {
        levelNumber:  '2',
        name: 'This time the house is further away'
      },
      {
        levelNumber:  '3',
        name: 'Can you make the van turn right?'
      },
      {
        levelNumber:  '4',
        name: "You are getting good at this! Let's try turning left"
      },
      {
        levelNumber:  '5',
        name: 'Good work! You are ready for something harder'
      },
      {
        levelNumber:  '6',
        name: "Well done! Let's use all three blocks"
      },
      {
        levelNumber:  '7',
        name: 'This road is more complicated'
      },
      {
        levelNumber:  '8',
        name: 'The warehouse is not always in the same place'
      },
      {
        levelNumber:  '9',
        name: 'Can you go from right to left?'
      },
      {
        levelNumber:  '10',
        name: ' Well done! How about another go?'
      },
      {
        levelNumber:  '11',
        name: ' Snail maze!'
      },
      {
        levelNumber:  '12',
        name: ' This road is more complicated'
      }
    ]
  },
  shortestRoute: {
    name: 'Shortest route',
    color: theme.palette.success.light,
    levels: [
      {
        levelNumber:  '13',
        name: 'Multiple routes'
      },
      {
        levelNumber:  '14',
        name: 'Can you spot the shortest route?'
      },
      {
        levelNumber:  '15',
        name: 'What if there is more than one delivery?'
      },
      {
        levelNumber:  '16',
        name: 'This time there are even more houses'
      },
      {
        levelNumber:  '17',
        name: 'House overload!'
      },
      {
        levelNumber:  '18',
        name: 'This one is quite a tangle'
      }
    ]
  },
  loopsAndRepetitions: {
    name: 'Loops and repetitions',
    color: theme.palette.success.light,
    levels: [
      {
        levelNumber:  '19',
        name: 'Repeating yourself is boring'
      },
      {
        levelNumber:  '20',
        name: 'Use the Repeat block to make your sequence shorter and simpler'
      },
      {
        levelNumber:  '21',
        name: 'Four leaf clover'
      },
      {
        levelNumber:  '22',
        name: 'Now things are getting quite long and complicated'
      },
      {
        levelNumber:  '23',
        name: 'Sssssssssnake!'
      },
      {
        levelNumber:  '24',
        name: 'The road is very long and very bendy'
      },
      { levelNumber:  '25', name: 'Waterfall level' },
      { levelNumber:  '26', name: 'Winter wonderland!' },
      { levelNumber:  '27', name: 'Farmyard' },
      { levelNumber:  '28', name: 'The big city' }
    ]
  },
  loopsAndConditions: {
    name: 'Loops and conditions',
    color: theme.palette.success.light,
    levels: [
      { levelNumber:  '29', name: 'No need for numbers' },
      { levelNumber:  '30', name: 'Can you do that again?' },
      { levelNumber:  '31', name: 'Practice makes perfect' },
      { levelNumber:  '32', name: "Uh oh, it's Until fever!" }
    ]
  },
  ifOnly: {
    name: 'If... only',
    color: theme.palette.secondary.light,
    levels: [
      {
        levelNumber:  '33',
        name: "Now it's time to try the If block"
      },
      { levelNumber:  '34', name: 'Multiple Ifs' },
      { levelNumber:  '35', name: "Let's put it all together!" },
      { levelNumber:  '36', name: "What else? If-else, that's what!" },
      { levelNumber:  '37', name: 'A bit longer' },
      { levelNumber:  '38', name: 'Third time lucky!' },
      { levelNumber:  '39', name: 'Dead ends!' },
      { levelNumber:  '40', name: 'Adjust your previous solution' },
      { levelNumber:  '41', name: 'Decision time' },
      { levelNumber:  '42', name: 'What do you think this time?' },
      { levelNumber:  '43', name: 'Good work! What else can you do?' }
    ]
  },
  trafficLights: {
    name: 'Traffic lights',
    color: theme.palette.secondary.light,
    levels: [
      { levelNumber:  '44', name: 'Oh no! Traffic lights!' },
      { levelNumber:  '45', name: 'Green for go, red for wait' },
      {
        levelNumber:  '46',
        name: "Well done - you've made it really far!"
      },
      {
        levelNumber:  '47',
        name: 'What a mess! But can you spot a route?'
      },
      {
        levelNumber:  '48',
        name: 'Put all that hard work to the test'
      },
      { levelNumber:  '49', name: 'Amazing! Have another go!' },
      { levelNumber:  '50', name: 'Light maze' }
    ]
  },
  limitedBlocks: {
    name: 'Limited blocks',
    color: theme.palette.secondary.light,
    levels: [
      { levelNumber:  '51', name: 'Back to basics with a twist' },
      { levelNumber:  '52', name: 'A Bit more Tricky' },
      { levelNumber:  '53', name: 'Choose your blocks wisely' },
      { levelNumber:  '54', name: 'Round and Round' },
      { levelNumber:  '55', name: 'Wonky Fish!' },
      { levelNumber:  '56', name: 'Concrete Wasteland' },
      { levelNumber:  '57', name: 'This is not... the same' },
      { levelNumber:  '58', name: 'Snow snake' },
      { levelNumber:  '59', name: 'Tricky turnaround' },
      { levelNumber:  '60', name: 'Right around the block' }
    ]
  },
  procedures: {
    name: 'Procedures',
    color: theme.palette.secondary.light,
    levels: [
      {
        levelNumber:  '61',
        name: "Can you create the 'Wiggle' procedure?"
      },
      { levelNumber:  '62', name: 'Lots of Traffic Lights!' },
      { levelNumber:  '63', name: 'Wiggle Wiggle' },
      { levelNumber:  '64', name: 'Muddy Patterns with Phil' },
      { levelNumber:  '65', name: 'Complicated roads' },
      { levelNumber:  '66', name: "Dee's snowy walk" },
      { levelNumber:  '67', name: 'Crazy Farm' }
    ]
  },
  blocklyBrainTeasers: {
    name: 'Blockly Brain Teasers',
    color: theme.palette.primary.light,
    levels: [
      { levelNumber:  '68', name: 'T - time' },
      { levelNumber:  '69', name: 'Duck pond dodge' },
      { levelNumber:  '70', name: 'Winter wonderland' },
      { levelNumber:  '71', name: 'Frozen challenge' },
      { levelNumber:  '72', name: 'Can Wes Find his lunch?' },
      { levelNumber:  '73', name: 'Traffic light freeze up!' },
      { levelNumber:  '74', name: 'Pandemonium' },
      { levelNumber:  '75', name: "Kirsty's maze time" },
      { levelNumber:  '76', name: 'Cannot turn left!' },
      { levelNumber:  '77', name: 'G Force' },
      { levelNumber:  '78', name: 'Wandering Phil' },
      { levelNumber:  '79', name: 'Muddy Mayhem' }
    ]
  },
  introdutionToPython: {
    name: 'Introduction to Python',
    color: theme.palette.info.dark,
    levels: [
      { levelNumber:  '80', name: "Here's Python!" },
      { levelNumber:  '81', name: 'Matching Blockly' },
      {
        levelNumber:  '82',
        name: "Don't forget to find the shortest route"
      },
      {
        levelNumber:  '83',
        name: 'Repeating yourself in Python looks different'
      },
      { levelNumber:  '84', name: 'Repeat and watch' },
      {
        levelNumber:  '85',
        name: 'Looks easy but use repeat until and see what happens?'
      },
      {
        levelNumber:  '86',
        name: 'See what the if blocks looks like in Python'
      },
      { levelNumber:  '87', name: "Don't forget to use else if" },
      {
        levelNumber:  '88',
        name: 'See what happens when you add Traffic lights'
      },
      {
        levelNumber:  '89',
        name: 'Watch carefully as you have another go'
      },
      {
        levelNumber:  '90',
        name: 'Have a go at procedures - what do they look like in Python?'
      },
      { levelNumber:  '91', name: 'Put it all together' }
    ]
  },
  python: {
    name: 'Python',
    color: theme.palette.info.dark,
    levels: [
      {
        levelNumber:  '92',
        name: 'Start with the basics, forward, left and right'
      },
      { levelNumber:  '93', name: 'Keep it simple' },
      { levelNumber:  '94', name: 'Take the shortest route' },
      { levelNumber:  '95', name: 'Count and repeat' },
      { levelNumber:  '96', name: 'Count and repeat is easy' },
      { levelNumber:  '97', name: 'Loop the loop' },
      { levelNumber:  '98', name: 'Repeat and check' },
      { levelNumber:  '99', name: 'Find a general solution' },
      { levelNumber:  '100', name: ' Watch out for the dead end!' },
      { levelNumber:  '101', name: ' Function or Junction?' },
      { levelNumber:  '102', name: ' Watch for the patterns' },
      { levelNumber:  '103', name: ' Patterns within patterns' },
      {
        levelNumber:  '104',
        name: ' Can you see the repeating pattern?'
      },
      { levelNumber:  '105', name: ' Find the shortest route' },
      { levelNumber:  '106', name: ' Spiral and add' },
      { levelNumber:  '107', name: ' Spiral and double' },
      { levelNumber:  '108', name: ' Think less' },
      { levelNumber:  '109', name: ' Final challenge!' }
    ]
  }
};

export const BLOCKLY_LEVELS = [
  ...RapidRouterGameTabs.gettingStarted.levels,
  ...RapidRouterGameTabs.shortestRoute.levels,
  ...RapidRouterGameTabs.loopsAndRepetitions.levels,
  ...RapidRouterGameTabs.loopsAndConditions.levels,
  ...RapidRouterGameTabs.ifOnly.levels,
  ...RapidRouterGameTabs.trafficLights.levels,
  ...RapidRouterGameTabs.limitedBlocks.levels,
  ...RapidRouterGameTabs.procedures.levels,
  ...RapidRouterGameTabs.blocklyBrainTeasers.levels
];

export const PYTHON_LEVELS = [
  ...RapidRouterGameTabs.introdutionToPython.levels,
  ...RapidRouterGameTabs.python.levels
];
