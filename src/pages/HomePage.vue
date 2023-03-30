<template>
  <q-page class="bg-dark q-pt-xl q-px-md">
    <q-scroll-area class="area">
      <CatItem v-for="item in catStore.list" :item="item" :changeMode="changeMode" />
    </q-scroll-area>
    <div class="q-pa-lg full-width absolute-bottom">
      <q-btn
        :to="{ name: 'category.create' }"
        color="green-10 full-width"
        label="Добавить категорию"
      />
    </div>
    <teleport v-if="isMounted" to="#actions">
      <q-btn
        icon-right="edit"
        flat
        :label="changeMode ? 'Скрыть' : 'Править'"
        size="sm"
        @click="changeMode = !changeMode"
      />
    </teleport>
  </q-page>
</template>

<script setup lang="ts">
import CatItem from 'src/components/CatItem.vue';
import { useCategoriesStore } from 'src/stores/categories';
import { ref, onMounted } from 'vue';

const changeMode = ref(false);
const catStore = useCategoriesStore();
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>
<style scoped>
.area {
  width: 100%;
  height: calc(100vh - 184px);
}
</style>
