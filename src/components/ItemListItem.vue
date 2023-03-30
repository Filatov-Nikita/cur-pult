<template>
  <q-card dark class="q-mb-md">
    <q-card-section>
      <div class="text-h6">{{ props.item.name || '-' }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="flex items-center q-gutter-x-sm">
        <div>{{ props.item.value || '-'}}</div>
        <div>{{ props.item.title || '-'}}</div>
        <q-icon
          v-if="props.item.trend !== null"
          size="sm"
          :name="props.item.trend ? 'arrow_drop_up' : 'arrow_drop_down'"
          :color="props.item.trend ? 'positive' : 'negative'"
        />
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="chips">
        <q-chip v-if="props.item.period" square icon="event">{{ props.item.period }}</q-chip>
        <q-chip v-if="props.item.size" square icon="expand">{{ sizeLabel }}</q-chip>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn icon-right="edit" flat color="green-8" size="sm" label="Изменить" @click="showUpdate = true"/>
      <q-btn icon-right="close" flat color="negative" size="sm" label="удалить" @click="remove" />
    </q-card-actions>
    <ItemModalForm
      v-if="item.CategoryId"
      v-model="showUpdate"
      :catId="item.CategoryId"
      :initialItem="item"
    />
  </q-card>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { Item } from 'src/types/items';
  import { useItemsStore } from 'src/stores/items';
  import ItemModalForm from './ItemModalForm.vue'

  const itemsStore = useItemsStore();

  const props = defineProps<{
    item: Item
  }>();

  const showUpdate = ref<boolean>(false);

  const sizeLabel = computed(() => {
    const size = props.item.size;
    if(size === 'sm') return 'Малый';
    if(size === 'md') return 'Средний';
    if(size === 'lg') return 'Большой';
    if(size === 'xl') return 'Наибольший';
  });

  async function remove() {
    try {
      await itemsStore.remove(props.item.id);
    } catch(e) {
      console.log(e);
    }
  }
</script>

<style scoped>
  .chips {
    margin: 0 -4px;
  }
</style>
