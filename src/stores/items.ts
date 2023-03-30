import * as ItemsAPI from 'src/api/items';
import { defineStore } from 'pinia';
import type { Item, ItemBody } from 'src/types/items';

interface State {
  list: Item[] | null,
  icons: string[]
}

export const useItemsStore = defineStore('itemsStore', {
  state: (): State => ({
    list: null,
    icons: []
  }),
  actions: {
    setIcons(icons: string[]) {
      this.icons = icons;
    },
    async showAll() {
      const items = await ItemsAPI.list();
      this.list = items;
      return items;
    },
    async create(body: ItemBody) {
      const item = await ItemsAPI.create(body);
      if(this.list === null) this.list = [];
      this.list.push(item);
      return item;
    },
    async update(id: number, body: Partial<ItemBody>) {
      const res = await ItemsAPI.update(id, body);

      if(this.list !== null) {
        const ind = this.list.findIndex(item => item.id === id);
        if(ind !== -1) {
          this.list[ind] = { ...this.list[ind], ...body };
        }
      }

      return res;
    },
    async remove(id: number) {
      const res = await ItemsAPI.remove(id);

      if(this.list !== null) {
        this.list = this.list.filter(item => item.id !== id);
      }

      return res;
    },
    async updateOnScreen(id: number, body: Partial<Item>) {
      const res = await ItemsAPI.updateOnScreen(id, body);
      return res;
    }
  }
});
