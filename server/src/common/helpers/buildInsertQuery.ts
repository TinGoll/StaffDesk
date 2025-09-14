export function buildInsertQuery<T extends Record<string, any>>(
  tableName: string,
  dto: Partial<T>,
  fieldMap: Record<keyof T, string>,
): { query: string; values: any[] } {
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: any[] = [];
  const returning: any[] = ['ID'];

  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined) {
      const column = fieldMap[key as keyof T];
      if (!column) continue;
      columns.push(column);
      placeholders.push('?');
      values.push(value);
      returning.push(column);
    }
  }

  if (columns.length === 0) {
    throw new Error('No fields provided for insert');
  }

  const query = `
    INSERT INTO ${tableName} (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING ${[...new Set(returning)].join(', ')};
  `;

  return { query, values };
}
