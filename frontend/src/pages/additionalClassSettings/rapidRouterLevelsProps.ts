import { CheckboxProps } from '@mui/material';
import theme from '../../app/theme';

export const RapidRouterGameTabs = {
  gettingStarted: {
    name: 'Getting started',
    color: theme.palette.success.light,
    levels: [
      {
        level: '1',
        name: 'Can you help the van get to the house?'
      },
      {
        level: '2',
        name: 'This time the house is further away'
      },
      {
        level: '3',
        name: 'Can you make the van turn right?'
      },
      {
        level: '4',
        name: "You are getting good at this! Let's try turning left"
      },
      {
        level: '5',
        name: 'Good work! You are ready for something harder'
      },
      {
        level: '6',
        name: "Well done! Let's use all three blocks"
      },
      {
        level: '7',
        name: 'This road is more complicated'
      },
      {
        level: '8',
        name: 'The warehouse is not always in the same place'
      },
      {
        level: '9',
        name: 'Can you go from right to left?'
      },
      {
        level: '10',
        name: ' Well done! How about another go?'
      },
      {
        level: '11',
        name: ' Snail maze!'
      },
      {
        level: '12',
        name: ' This road is more complicated'
      }
    ]
  },
  shortestRoute: {
    name: 'Shortest route',
    color: theme.palette.success.light,
    levels: [
      {
        level: '13',
        name: 'Multiple routes'
      },
      {
        level: '14',
        name: 'Can you spot the shortest route?'
      },
      {
        level: '15',
        name: 'What if there is more than one delivery?'
      },
      {
        level: '16',
        name: 'This time there are even more houses'
      },
      {
        level: '17',
        name: 'House overload!'
      },
      {
        level: '18',
        name: 'This one is quite a tangle'
      }
    ]
  },
  loopsAndRepetitions: {
    name: 'Loops and repetitions',
    color: theme.palette.success.light,
    levels: [
      {
        level: '19',
        name: 'Repeating yourself is boring'
      },
      {
        level: '20',
        name: 'Use the Repeat block to make your sequence shorter and simpler'
      },
      {
        level: '21',
        name: 'Four leaf clover'
      },
      {
        level: '22',
        name: 'Now things are getting quite long and complicated'
      },
      {
        level: '23',
        name: 'Sssssssssnake!'
      },
      {
        level: '24',
        name: 'The road is very long and very bendy'
      },
      { level: '25', name: 'Waterfall level' },
      { level: '26', name: 'Winter wonderland!' },
      { level: '27', name: 'Farmyard' },
      { level: '28', name: 'The big city' }
    ]
  },
  loopsAndConditions: {
    name: 'Loops and conditions',
    color: theme.palette.success.light,
    levels: [
      { level: '29', name: 'No need for numbers' },
      { level: '30', name: 'Can you do that again?' },
      { level: '31', name: 'Practice makes perfect' },
      { level: '32', name: "Uh oh, it's Until fever!" }
    ]
  },
  ifOnly: {
    name: 'If... only',
    color: theme.palette.secondary.light,
    levels: [
      {
        level: '33',
        name: "Now it's time to try the If block"
      },
      { level: '34', name: 'Multiple Ifs' },
      { level: '35', name: "Let's put it all together!" },
      { level: '36', name: "What else? If-else, that's what!" },
      { level: '37', name: 'A bit longer' },
      { level: '38', name: 'Third time lucky!' },
      { level: '39', name: 'Dead ends!' },
      { level: '40', name: 'Adjust your previous solution' },
      { level: '41', name: 'Decision time' },
      { level: '42', name: 'What do you think this time?' },
      { level: '43', name: 'Good work! What else can you do?' }
    ]
  },
  trafficLights: {
    name: 'Traffic lights',
    color: theme.palette.secondary.light,
    levels: [
      { level: '44', name: 'Oh no! Traffic lights!' },
      { level: '45', name: 'Green for go, red for wait' },
      {
        level: '46',
        name: "Well done - you've made it really far!"
      },
      {
        level: '47',
        name: 'What a mess! But can you spot a route?'
      },
      {
        level: '48',
        name: 'Put all that hard work to the test'
      },
      { level: '49', name: 'Amazing! Have another go!' },
      { level: '50', name: 'Light maze' }
    ]
  },
  limitedBlocks: {
    name: 'Limited blocks',
    color: theme.palette.secondary.light,
    levels: [
      { level: '51', name: 'Back to basics with a twist' },
      { level: '52', name: 'A Bit more Tricky' },
      { level: '53', name: 'Choose your blocks wisely' },
      { level: '54', name: 'Round and Round' },
      { level: '55', name: 'Wonky Fish!' },
      { level: '56', name: 'Concrete Wasteland' },
      { level: '57', name: 'This is not... the same' },
      { level: '58', name: 'Snow snake' },
      { level: '59', name: 'Tricky turnaround' },
      { level: '60', name: 'Right around the block' }
    ]
  },
  procedures: {
    name: 'Procedures',
    color: theme.palette.secondary.light,
    levels: [
      {
        level: '61',
        name: "Can you create the 'Wiggle' procedure?"
      },
      { level: '62', name: 'Lots of Traffic Lights!' },
      { level: '63', name: 'Wiggle Wiggle' },
      { level: '64', name: 'Muddy Patterns with Phil' },
      { level: '65', name: 'Complicated roads' },
      { level: '66', name: "Dee's snowy walk" },
      { level: '67', name: 'Crazy Farm' }
    ]
  },
  blocklyBrainTeasers: {
    name: 'Blockly Brain Teasers',
    color: theme.palette.primary.light,
    levels: [
      { level: '68', name: 'T - time' },
      { level: '69', name: 'Duck pond dodge' },
      { level: '70', name: 'Winter wonderland' },
      { level: '71', name: 'Frozen challenge' },
      { level: '72', name: 'Can Wes Find his lunch?' },
      { level: '73', name: 'Traffic light freeze up!' },
      { level: '74', name: 'Pandemonium' },
      { level: '75', name: "Kirsty's maze time" },
      { level: '76', name: 'Cannot turn left!' },
      { level: '77', name: 'G Force' },
      { level: '78', name: 'Wandering Phil' },
      { level: '79', name: 'Muddy Mayhem' }
    ]
  },
  introdutionToPython: {
    name: 'Introduction to Python',
    color: theme.palette.info.dark,
    levels: [
      { level: '80', name: "Here's Python!" },
      { level: '81', name: 'Matching Blockly' },
      {
        level: '82',
        name: "Don't forget to find the shortest route"
      },
      {
        level: '83',
        name: 'Repeating yourself in Python looks different'
      },
      { level: '84', name: 'Repeat and watch' },
      {
        level: '85',
        name: 'Looks easy but use repeat until and see what happens?'
      },
      {
        level: '86',
        name: 'See what the if blocks looks like in Python'
      },
      { level: '87', name: "Don't forget to use else if" },
      {
        level: '88',
        name: 'See what happens when you add Traffic lights'
      },
      {
        level: '89',
        name: 'Watch carefully as you have another go'
      },
      {
        level: '90',
        name: 'Have a go at procedures - what do they look like in Python?'
      },
      { level: '91', name: 'Put it all together' }
    ]
  },
  python: {
    name: 'Python',
    color: theme.palette.info.dark,
    levels: [
      {
        level: '92',
        name: 'Start with the basics, forward, left and right'
      },
      { level: '93', name: 'Keep it simple' },
      { level: '94', name: 'Take the shortest route' },
      { level: '95', name: 'Count and repeat' },
      { level: '96', name: 'Count and repeat is easy' },
      { level: '97', name: 'Loop the loop' },
      { level: '98', name: 'Repeat and check' },
      { level: '99', name: 'Find a general solution' },
      { level: '100', name: ' Watch out for the dead end!' },
      { level: '101', name: ' Function or Junction?' },
      { level: '102', name: ' Watch for the patterns' },
      { level: '103', name: ' Patterns within patterns' },
      {
        level: '104',
        name: ' Can you see the repeating pattern?'
      },
      { level: '105', name: ' Find the shortest route' },
      { level: '106', name: ' Spiral and add' },
      { level: '107', name: ' Spiral and double' },
      { level: '108', name: ' Think less' },
      { level: '109', name: ' Final challenge!' }
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
