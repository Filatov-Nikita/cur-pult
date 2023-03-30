<template>
  <div class="flex q-mb-lg">
    <q-btn size="md" class="col-grow q-mr-md" color="green-6" :label="item.name" @click="broadcast" />
    <template v-if="changeMode">
      <q-btn
        class="q-mr-sm"
        size="sm"
        flat
        round
        icon="edit"
        color="white"
        @click="showUpdate = !showUpdate"
      />
      <q-btn
        class="q-mr-sm"
        size="sm"
        flat
        round
        icon="visibility"
        color="white"
        :to="{ name: 'items.show', params: { catId: item.id } }"
      />
      <q-btn
        size="sm"
        flat
        round
        icon="close"
        color="white"
        @click="remove"
      />
    </template>
    <CatModalUpdate :item="item" :id="item.id" v-model="showUpdate" />
  </div>
</template>

<script setup lang="ts">
  import { useQuasar } from 'quasar';
  import { useCategoriesStore } from 'src/stores/categories';
  import type { Category } from 'src/types/categories';
  import { ref } from 'vue';
  import CatModalUpdate from './CatModalUpdate.vue';

  const quasar = useQuasar();
  const showUpdate = ref<boolean>(false);
  const catStore = useCategoriesStore();

  const props = defineProps<{
    item: Category,
    changeMode: boolean
  }>();

  async function remove() {
    try {
      await catStore.remove(props.item.id);
    } catch(e) {
      console.log(e);
    }
  }

  async function broadcast() {
    try {
      await catStore.broadcast(props.item.id);
      quasar.notify({ type: 'positive', message: 'Успешно отправлено!' });
    } catch(e) {
      quasar.notify({ type: 'negative', message: 'Не удалось отправить' });
      console.log(e);
    }
  }
</script>

<style scoped lang="scss">

</style>
