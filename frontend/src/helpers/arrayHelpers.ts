export const allBoxesChecked: (
  levels: Array<{ levelNumber: string; name: string }>,
  formikLevels: string[]
) => boolean = (levels, formikLevels) => {
  return levels.every(level => formikLevels[parseInt(level.levelNumber) - 1] !== '');
};
