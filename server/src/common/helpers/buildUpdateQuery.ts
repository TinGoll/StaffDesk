export function buildUpdateQuery<T extends Record<string, any>>(
  tableName: string,
  id: number,
  dto: Partial<T>,
  fieldMap: Record<keyof T, string>,
  idField: string = 'ID',
): { query: string; values: any[] } {
  const columns: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(dto)) {
    if (value !== undefined) {
      const column = fieldMap[key as keyof T];
      if (!column) continue;
      columns.push(column);
      values.push(value);
    }
  }

  if (columns.length === 0) {
    throw new Error('No fields provided for update');
  }

  const setClause = columns.map((col) => `${col} = ?`).join(', ');
  const returning = columns.join(', ');
  const query = `
    UPDATE ${tableName}
    SET ${setClause}
    WHERE ${idField} = ?
    RETURNING ${returning};
  `;

  values.push(id);

  return { query, values };
}
