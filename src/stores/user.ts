import { defineStore } from 'pinia';
import * as userAPI from 'src/api/user';
import { Cred } from 'src/types/user';

export const useUserStore = defineStore('userStore', {
  actions: {
    async login(cred: Cred) {
      const data = await userAPI.login(cred);
      window.localStorage.setItem('token', data.token);
      return data;
    }
  }
});
