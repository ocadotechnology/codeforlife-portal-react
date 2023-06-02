
export const allBoxesChecked: (
  levels: Array<{ level: string; name: string }>,
  formikLevels: string[]
) => boolean = (levels, formikLevels) => {
  return levels.every(level => formikLevels[parseInt(level.level) - 1] !== '');
};
