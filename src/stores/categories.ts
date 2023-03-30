import { defineStore } from 'pinia';
import * as CatAPI from 'src/api/categories';
import type { CatBody, Category } from 'src/types/categories';

interface State {
  list: Category[] | null
}

export const useCategoriesStore = defineStore('categories', {
  state: (): State => ({
    list: null,
  }),
  getters: {},
  actions: {
    async showAll() {
      const cats = await CatAPI.list();
      this.list = cats;
      return cats;
    },
    async showOne(id: number) {
      const cat = await CatAPI.show(id);
      return cat;
    },
    async create(body: CatBody) {
      const cat = await CatAPI.create(body);
      if(this.list === null) this.list = [];
      this.list.push(cat);
      return cat;
    },
    async update(id: number, body: CatBody) {
      const res = await CatAPI.update(id, body);

      if(this.list !== null) {
        const ind = this.list.findIndex(cat => cat.id === id);
        if(ind !== -1) {
          this.list[ind] = { ...this.list[ind], ...body };
        }
      }

      return res;
    },
    async remove(id: number) {
      const res = await CatAPI.remove(id);

      if(this.list !== null) {
        this.list = this.list.filter(cat => cat.id !== id);
      }

      return res;
    },
    async broadcast(id: number) {
      const res = await CatAPI.broadcast(id);
      return res;
    }
  },
});
