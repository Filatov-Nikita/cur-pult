<template>
  <q-page class="bg-dark q-pt-md q-px-md" style="padding-bottom: 80px;">
    <h1 class="text-h6 text-white" v-if="cat">{{ cat.name }}</h1>
    <ItemListItem v-for="item in items" :item="item" />
    <div class="fixed-bottom q-pa-lg full-width flex">
      <q-btn class="q-mr-md" @click="$router.go(-1)" round icon="west" color="green-10" />
      <q-btn color="green-8 col-grow" label="Добавить ячейку" @click="showCreate = !showCreate"/>
    </div>
    <ItemModalForm :catId="+catId" v-model="showCreate" />
  </q-page>
</template>

<script setup lang="ts">
  import { useCategoriesStore } from 'src/stores/categories';
  import { useItemsStore } from 'src/stores/items';
  import { ref, computed } from 'vue';
  import { Item } from 'src/types/items';
  import ItemListItem from 'src/components/ItemListItem.vue';
  import ItemModalForm from 'src/components/ItemModalForm.vue';

  const showCreate = ref<boolean>(false);
  const catStore = useCategoriesStore();
  const itemsStore = useItemsStore();
  const props = defineProps<{ catId: number | string }>();

  const cat = computed(() => {
    if(catStore.list === null) return null;
    const res = catStore.list.filter(cat => cat.id === +props.catId);
    return res[0] ?? null;
  });

  const items = computed(() => {
    if(itemsStore.list === null) return [];
    return itemsStore.list.filter(item => item.CategoryId === +props.catId);
  });
</script>
