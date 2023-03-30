import { Loading, Notify } from 'quasar';
import { boot } from 'quasar/wrappers';
import { useCategoriesStore } from 'src/stores/categories';
import { useItemsStore } from 'src/stores/items';

export default boot(async ({ app, store, router }) => {
  router.beforeEach((to, from, next) => {
    if(to.path === '/login') return next();

    const token = window.localStorage.getItem('token');

    if(token === null) return next({ name: 'login', replace: true });

    next();
  });

  try {
    Loading.show();
    const catStore = useCategoriesStore();
    const itemsStore = useItemsStore();
    await Promise.all([ catStore.showAll(), itemsStore.showAll() ]);
  } catch(e) {
    Notify.create({ type: 'negative', message: 'Не удалось загрузить данные' });
  } finally {
    Loading.hide();
  }

});
