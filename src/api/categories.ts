import ky from './index';
import type { CatBody, Category } from 'src/types/categories';

export function list() {
  return ky.get('categories').json<Category[]>();
}

export function show(id: number) {
  return ky.get(`categories/${id}`).json<Category>();
}

export function create(json: CatBody) {
  return ky.post('categories', { json }).json<Category>();
}

export function update(id: number, json: CatBody) {
  return ky.patch(`categories/${id}`, { json }).json<boolean>();
}

export function remove(id: number) {
  return ky.delete(`categories/${id}`).json<boolean>();
}

export function broadcast(id: number) {
  return ky.post(`categories/${id}/broadcast`).json<boolean>();
}
