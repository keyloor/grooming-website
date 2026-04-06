// example.models.ts
// Define your TypeScript interfaces and types here.
// No real data — types only.

export interface ExampleItem {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export type ExampleStatus = "active" | "inactive" | "pending";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
