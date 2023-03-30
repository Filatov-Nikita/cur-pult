export interface Item {
  id: number,
  icon: string | null,
  name: string | null,
  value: string | null,
  title: string | null,
  trend: boolean | null,
  period: string | null,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | null,
  x: number | null,
  y: number | null,
  CategoryId: number | null,
}

export type ItemBody = Omit<Item, 'id'>;
export type Position = Pick<Item, 'x' | 'y'>;
