import ky from './index';
import type { Item, ItemBody } from 'src/types/items';

export function list() {
  return ky.get(`items`).json<Item[]>();
}

export function create(json: ItemBody) {
  return ky.post(`items`, { json }).json<Item>();
}

export function update(id: number, json: Partial<ItemBody>) {
  return ky.patch(`items/${id}`, { json }).json<boolean>();
}

export function remove(id: number) {
  return ky.delete(`items/${id}`).json<boolean>();
}

export function updateOnScreen(id: number, json: Partial<Item>) {
  return ky.post(
    `items/${id}/update-screen`,
    { json }
  ).json<boolean>();
}
