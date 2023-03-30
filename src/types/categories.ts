export interface Category {
  id: number,
  name: string,
}

export type CatBody = Omit<Category, 'id'>;
