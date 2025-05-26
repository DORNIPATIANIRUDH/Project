import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "Does what we're doing at this moment support the early and continuous delivery of valuable software?",
    category: "delivery",
    description: "Agile teams focus on delivering working software frequently, with a preference for shorter timescales."
  },
  {
    id: 2,
    text: "Does our process welcome and take advantage of change?",
    category: "adaptation",
    description: "Agile processes harness change for the customer's competitive advantage, even late in development."
  },
  {
    id: 3,
    text: "Does our process lead to and support the delivery of working functionality? Are the developers and the product owner working together daily?",
    category: "collaboration",
    description: "Business people and developers must work together daily throughout the project to ensure alignment."
  },
  {
    id: 4,
    text: "Are customers and business stakeholders working closely with the project team?",
    category: "collaboration",
    description: "Regular collaboration with stakeholders ensures the team builds the right product and can respond quickly to feedback."
  },
  {
    id: 5,
    text: "Does our environment give the development team the support it needs to get the job done?",
    category: "optimization",
    description: "Build projects around motivated individuals. Give them the environment and support they need, and trust them to get the job done."
  },
  {
    id: 6,
    text: "Are we communicating face to face more than through phone and email?",
    category: "collaboration",
    description: "The most efficient and effective method of conveying information to and within a development team is face-to-face conversation."
  },
  {
    id: 7,
    text: "Are we measuring progress by the amount of working functionality produced?",
    category: "delivery",
    description: "Working software is the primary measure of progress in agile development, not documentation or plans."
  },
  {
    id: 8,
    text: "Can we maintain this pace indefinitely?",
    category: "team",
    description: "Agile processes promote sustainable development. The sponsors, developers, and users should be able to maintain a constant pace indefinitely."
  },
  {
    id: 9,
    text: "Do we support technical excellence and good design that allows for future changes?",
    category: "technical",
    description: "Continuous attention to technical excellence and good design enhances agility and makes future changes easier."
  },
  {
    id: 10,
    text: "Are we maximizing the amount of work not done — namely, doing as little as necessary to fulfill the goal of the project?",
    category: "optimization",
    description: "Simplicity--the art of maximizing the amount of work not done--is essential. Focus on what delivers the most value."
  },
  {
    id: 11,
    text: "Is this development team self-organizing and self-managing? Does it have the freedom to succeed?",
    category: "team",
    description: "The best architectures, requirements, and designs emerge from self-organizing teams that have autonomy."
  },
  {
    id: 12,
    text: "Are we reflecting at regular intervals and adjusting our behavior accordingly?",
    category: "adaptation",
    description: "At regular intervals, the team reflects on how to become more effective, then tunes and adjusts its behavior accordingly."
  }
];

export const categoryDescriptions = {
  delivery: "How effectively the team delivers working software frequently and continuously",
  adaptation: "How well the team embraces and responds to change throughout the development process",
  collaboration: "The quality of interactions between team members, stakeholders, and customers",
  technical: "The team's commitment to technical excellence and good design practices",
  optimization: "How efficiently the team works and eliminates waste",
  team: "The team's ability to self-organize, maintain pace, and continuously improve"
};

export const ratingLabels = [
  "Not at all (1)",
  "Somewhat (2)",
  "Moderately (3)",
  "Mostly (4)",
  "Completely (5)"
];

export const ratingDescriptions = [
  "We don't practice this at all or have significant issues in this area",
  "We occasionally practice this but have notable gaps or challenges",
  "We implement this fairly well but have room for improvement",
  "We do this consistently with only minor areas for improvement",
  "We excel in this area and consider it a strength of our team"
];