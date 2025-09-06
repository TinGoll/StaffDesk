export interface PaginatedResponse<T> {
  items: T[];
  meta: Record<string, unknown>;
}
