/**
 * Classifies the change based on the given value.
 *
 * @param value - The value to classify.
 * @returns The classification of the change: 'increase', 'moderateIncrease', 'decrease', 'moderateDecrease', or 'unchanged'.
 */
const classifyChange = (value: number): 'increase' | 'moderateIncrease' | 'decrease' | 'moderateDecrease' | 'unchanged' => {
  switch (true) {
    case value > 10:
      return 'increase';
    case value > 0:
      return 'moderateIncrease';
    case value < -10:
      return 'decrease';
    case value < 0:
      return 'moderateDecrease';
    default:
      return 'unchanged';
  }
};

export { classifyChange };
