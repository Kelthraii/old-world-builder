const rules = {
  "grand-army": {
    lords: { maxPercent: 25 },
    heroes: { maxPercent: 25 },
    characters: { maxPercent: 50 },
    core: { minPercent: 25 },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 25,
    },
    mercenaries: { maxPercent: 20 },
    allies: { maxPercent: 25 },
  },
  "kingdom-of-bretonnia": {
    characters: {
      maxPercent: 50,
      units: [
        {
          id: "duke",
          min: 0,
          max: 1,
        },
        {
          id: "baron",
          min: 0,
          max: 1,
          perPoints: 1000,
        },
        {
          id: "prophetees",
          min: 0,
          max: 1,
          perPoints: 1000,
        },
      ],
    },
    core: {
      minPercent: 25,
      units: [
        {
          ids: ["knights-of-the-realm", "mounted-knights-of-the-realm"],
          min: 1,
        },
        {
          ids: ["men-at-arms", "peasant-bowmen"],
          min: 1,
        },
      ],
    },
    special: {
      maxPercent: 50,
      units: [
        {
          id: "battle-pilgrims",
          min: 0,
          max: 2,
          perPoints: 1000,
        },
      ],
    },
    rare: {
      maxPercent: 25,
      units: [
        {
          id: "field-trebuchet",
          min: 0,
          max: 1,
          perPoints: 1000,
        },
      ],
    },
    mercenaries: { maxPercent: 20 },
    allies: {
      maxPercent: 25,
      armies: [
        "errantry-crusades",
        "bretonnian-exiles",
        "dwarfen-mountain-holds",
        "empire-of-man",
        "high-elf-realms",
        "wood-elf-realms",
      ],
    },
  },
  "errantry-crusades": {
    characters: { maxPercent: 50 },
    core: { minPercent: 33 },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 33,
    },
    mercenaries: {
      maxPercent: 25,
    },
  },
  "bretonnian-exiles": {
    characters: { maxPercent: 50 },
    core: { minPercent: 25 },
    special: {
      maxPercent: 33,
    },
    rare: {
      maxPercent: 33,
    },
    mercenaries: {
      maxPercent: 25,
    },
  },
  "tomb-kings-of-khemri": {
    characters: { maxPercent: 50 },
    core: { minPercent: 25 },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 25,
    },
    mercenaries: {
      maxPercent: 20,
    },
    allies: {
      maxPercent: 25,
    },
  },
  "nehekharan-royal-hosts": {
    characters: { maxPercent: 50 },
    core: { minPercent: 33 },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 25,
    },
  },
  "mortuary-cults": {
    characters: { maxPercent: 50 },
    core: { minPercent: 33 },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 33,
    },
  },
  "orc-and-goblin-tribes": {
    characters: {
      maxPercent: 50,
    },
    core: {
      minPercent: 25,
    },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 25,
    },
    mercenaries: { maxPercent: 20 },
  },
  "nomadic-waaagh": {
    characters: { maxPercent: 50 },
    core: { minPercent: 25 },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 25,
    },
    mercenaries: {
      maxPercent: 25,
    },
  },
  "troll-horde": {
    characters: { maxPercent: 50 },
    core: { minPercent: 33 },
    special: {
      maxPercent: 50,
    },
    rare: {
      maxPercent: 25,
    },
    mercenaries: {
      maxPercent: 25,
    },
  },
};

export const getMaxPercentData = ({
  type,
  armyPoints,
  points,
  armyComposition,
}) => {
  const categoryData = rules[armyComposition]
    ? rules[armyComposition][type]
    : rules["grand-army"][type];

  if (!categoryData) {
    return null;
  }

  const maxPercent = categoryData.maxPercent;
  const maxPoints = (armyPoints / 100) * maxPercent;

  return {
    points: Math.floor(maxPoints),
    overLimit: points > maxPoints,
    diff: points > maxPoints ? Math.ceil(points - maxPoints) : 0,
  };
};

export const getMinPercentData = ({
  type,
  armyPoints,
  points,
  armyComposition,
}) => {
  const minPercent = rules[armyComposition]
    ? rules[armyComposition][type].minPercent
    : rules["grand-army"][type].minPercent;
  const minPoints = (armyPoints / 100) * minPercent;

  return {
    points: Math.floor(minPoints),
    overLimit: points <= minPoints,
    diff: points <= minPoints ? Math.ceil(minPoints - points) : 0,
  };
};
