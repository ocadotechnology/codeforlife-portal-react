import { CheckboxProps } from '@mui/material';
import theme from '../../app/theme';

export const RapidRouterGameTabs = {
  gettingStarted: {
    name: 'Getting started',
    color: theme.palette.success.light,
    levels: [
      {
        level: '1',
        name: 'Can you help the van get to the house?',
        checked: false
      },
      {
        level: '2',
        name: 'This time the house is further away',
        checked: false
      },
      {
        level: '3',
        name: 'Can you make the van turn right?',
        checked: false
      },
      {
        level: '4',
        name: "You are getting good at this! Let's try turning left",
        checked: false
      },
      {
        level: '5',
        name: 'Good work! You are ready for something harder',
        checked: false
      },
      {
        level: '6',
        name: "Well done! Let's use all three blocks",
        checked: false
      },
      {
        level: '7',
        name: 'This road is more complicated',
        checked: false
      },
      {
        level: '8',
        name: 'The warehouse is not always in the same place',
        checked: false
      },
      {
        level: '9',
        name: 'Can you go from right to left?',
        checked: false
      },
      {
        level: '10',
        name: ' Well done! How about another go?',
        checked: false
      },
      {
        level: '11',
        name: ' Snail maze!',
        checked: false
      },
      {
        level: '12',
        name: ' This road is more complicated',
        checked: false
      }
    ]
  },
  shortestRoute: {
    name: 'Shortest route',
    color: theme.palette.success.light,
    levels: [
      {
        level: '13',
        name: 'Multiple routes',
        checked: false
      },
      {
        level: '14',
        name: 'Can you spot the shortest route?',
        checked: false
      },
      {
        level: '15',
        name: 'What if there is more than one delivery?',
        checked: false
      },
      {
        level: '16',
        name: 'This time there are even more houses',

        checked: false
      },
      {
        level: '17',
        name: 'House overload!',
        checked: false
      },
      {
        level: '18',
        name: 'This one is quite a tangle',
        checked: false
      }
    ]
  },
  loopsAndRepetitions: {
    name: 'Loops and repetitions',
    color: theme.palette.success.light,
    levels: [
      {
        level: '19',
        name: 'Repeating yourself is boring',
        checked: false
      },
      {
        level: '20',
        name: 'Use the Repeat block to make your sequence shorter and simpler',
        checked: false
      },
      {
        level: '21',
        name: 'Four leaf clover',
        checked: false
      },
      {
        level: '22',
        name: 'Now things are getting quite long and complicated',
        checked: false
      },
      {
        level: '23',
        name: 'Sssssssssnake!',
        checked: false
      },
      {
        level: '24',
        name: 'The road is very long and very bendy',
        checked: false
      },
      { level: '25', name: 'Waterfall level', checked: false },
      { level: '26', name: 'Winter wonderland!', checked: false },
      { level: '27', name: 'Farmyard', checked: false },
      { level: '28', name: 'The big city', checked: false }
    ]
  },
  loopsAndConditions: {
    name: 'Loops and conditions',
    color: theme.palette.success.light,
    levels: [
      { level: '29', name: 'No need for numbers', checked: false },
      { level: '30', name: 'Can you do that again?', checked: false },
      { level: '31', name: 'Practice makes perfect', checked: false },
      { level: '32', name: "Uh oh, it's Until fever!", checked: false }
    ]
  },
  ifOnly: {
    name: 'If... only',
    color: theme.palette.secondary.light,
    levels: [
      {
        level: '33',
        name: "Now it's time to try the If block",
        checked: false
      },
      { level: '34', name: 'Multiple Ifs', checked: false },
      { level: '35', name: "Let's put it all together!", checked: false },
      { level: '36', name: "What else? If-else, that's what!", checked: false },
      { level: '37', name: 'A bit longer', checked: false },
      { level: '38', name: 'Third time lucky!', checked: false },
      { level: '39', name: 'Dead ends!', checked: false },
      { level: '40', name: 'Adjust your previous solution', checked: false },
      { level: '41', name: 'Decision time', checked: false },
      { level: '42', name: 'What do you think this time?', checked: false },
      { level: '43', name: 'Good work! What else can you do?', checked: false }
    ]
  },
  trafficLights: {
    name: 'Traffic lights',
    color: theme.palette.secondary.light,
    levels: [
      { level: '44', name: 'Oh no! Traffic lights!', checked: false },
      { level: '45', name: 'Green for go, red for wait', checked: false },
      {
        level: '46',
        name: "Well done - you've made it really far!",
        checked: false
      },
      {
        level: '47',
        name: 'What a mess! But can you spot a route?',
        checked: false
      },
      {
        level: '48',
        name: 'Put all that hard work to the test',
        checked: false
      },
      { level: '49', name: 'Amazing! Have another go!', checked: false },
      { level: '50', name: 'Light maze', checked: false }
    ]
  },
  limitedBlocks: {
    name: 'Limited blocks',
    color: theme.palette.secondary.light,
    levels: [
      { level: '51', name: 'Back to basics with a twist', checked: false },
      { level: '52', name: 'A Bit more Tricky', checked: false },
      { level: '53', name: 'Choose your blocks wisely', checked: false },
      { level: '54', name: 'Round and Round', checked: false },
      { level: '55', name: 'Wonky Fish!', checked: false },
      { level: '56', name: 'Concrete Wasteland', checked: false },
      { level: '57', name: 'This is not... the same', checked: false },
      { level: '58', name: 'Snow snake', checked: false },
      { level: '59', name: 'Tricky turnaround', checked: false },
      { level: '60', name: 'Right around the block', checked: false }
    ]
  },
  procedures: {
    name: 'Procedures',
    color: theme.palette.secondary.light,
    levels: [
      {
        level: '61',
        name: "Can you create the 'Wiggle' procedure?",
        checked: false
      },
      { level: '62', name: 'Lots of Traffic Lights!', checked: false },
      { level: '63', name: 'Wiggle Wiggle', checked: false },
      { level: '64', name: 'Muddy Patterns with Phil', checked: false },
      { level: '65', name: 'Complicated roads', checked: false },
      { level: '66', name: "Dee's snowy walk", checked: false },
      { level: '67', name: 'Crazy Farm', checked: false }
    ]
  },
  blocklyBrainTeasers: {
    name: 'Blockly Brain Teasers',
    color: theme.palette.primary.light,
    levels: [
      { level: '68', name: 'T - time', checked: false },
      { level: '69', name: 'Duck pond dodge', checked: false },
      { level: '70', name: 'Winter wonderland', checked: false },
      { level: '71', name: 'Frozen challenge', checked: false },
      { level: '72', name: 'Can Wes Find his lunch?', checked: false },
      { level: '73', name: 'Traffic light freeze up!', checked: false },
      { level: '74', name: 'Pandemonium', checked: false },
      { level: '75', name: "Kirsty's maze time", checked: false },
      { level: '76', name: 'Cannot turn left!', checked: false },
      { level: '77', name: 'G Force', checked: false },
      { level: '78', name: 'Wandering Phil', checked: false },
      { level: '79', name: 'Muddy Mayhem', checked: false }
    ]
  },
  introdutionToPython: {
    name: 'Introduction to Python',
    color: theme.palette.info.dark,
    levels: [
      { level: '80', name: "Here's Python!", checked: false },
      { level: '81', name: 'Matching Blockly', checked: false },
      {
        level: '82',
        name: "Don't forget to find the shortest route",
        checked: false
      },
      {
        level: '83',
        name: 'Repeating yourself in Python looks different',
        checked: false
      },
      { level: '84', name: 'Repeat and watch', checked: false },
      {
        level: '85',
        name: 'Looks easy but use repeat until and see what happens?',
        checked: false
      },
      {
        level: '86',
        name: 'See what the if blocks looks like in Python',
        checked: false
      },
      { level: '87', name: "Don't forget to use else if", checked: false },
      {
        level: '88',
        name: 'See what happens when you add Traffic lights',
        checked: false
      },
      {
        level: '89',
        name: 'Watch carefully as you have another go',
        checked: false
      },
      {
        level: '90',
        name: 'Have a go at procedures - what do they look like in Python?',
        checked: false
      },
      { level: '91', name: 'Put it all together', checked: false }
    ]
  },
  python: {
    name: 'Python',
    color: theme.palette.info.dark,
    levels: [
      {
        level: '92',
        name: 'Start with the basics, forward, left and right',
        checked: false
      },
      { level: '93', name: 'Keep it simple', checked: false },
      { level: '94', name: 'Take the shortest route', checked: false },
      { level: '95', name: 'Count and repeat', checked: false },
      { level: '96', name: 'Count and repeat is easy', checked: false },
      { level: '97', name: 'Loop the loop', checked: false },
      { level: '98', name: 'Repeat and check', checked: false },
      { level: '99', name: 'Find a general solution', checked: false },
      { level: '100', name: ' Watch out for the dead end!', checked: false },
      { level: '101', name: ' Function or Junction?', checked: false },
      { level: '102', name: ' Watch for the patterns', checked: false },
      { level: '103', name: ' Patterns within patterns', checked: false },
      {
        level: '104',
        name: ' Can you see the repeating pattern?',
        checked: false
      },
      { level: '105', name: ' Find the shortest route', checked: false },
      { level: '106', name: ' Spiral and add', checked: false },
      { level: '107', name: ' Spiral and double', checked: false },
      { level: '108', name: ' Think less', checked: false },
      { level: '109', name: ' Final challenge!', checked: false }
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
  ...RapidRouterGameTabs.blocklyBrainTeasers.levels,
];

export const PYTHON_LEVELS = [
  ...RapidRouterGameTabs.introdutionToPython.levels,
  ...RapidRouterGameTabs.python.levels
];
