export const groupBy = <T, K extends keyof T>(
  items: T[],
  key: K,
): Record<string, T[]> => {
  const result: Record<string, T[]> = {};

  for (const item of items) {
    const groupKey = String(item[key]);
    const group = result[groupKey];

    if (group) {
      group.push(item);
    } else {
      result[groupKey] = [item];
    }
  }

  return result;
};

export const pluck = <T, K extends keyof T>(items: T[], key: K): T[K][] => {
  return items.map((item) => item[key]);
};

export const merge = <T>(base: T, updates: Partial<T>): T => {
  return { ...base, ...updates };
};
