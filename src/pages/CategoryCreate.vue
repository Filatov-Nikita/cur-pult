<template>
  <q-page class="bg-dark q-pt-md q-px-md">
    <h1 class="text-h6 text-white">Создать категорию</h1>
    <q-form @submit="onSubmit">
      <q-input
        dark
        class="q-mb-lg"
        color="green-8"
        label="Название"
        v-model="form.name"
        :rules="[ val => val && val.length > 0 || 'Поле не заполнено']"
      />
      <q-btn type="submit" class="full-width" color="green-10" label="Сохранить" :loading="loading" />
    </q-form>
    <div class="fixed-bottom q-pa-lg">
      <q-btn @click="$router.go(-1)" round icon="west" color="green-10" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useCategoriesStore } from 'src/stores/categories';
  import { Notify } from 'quasar';
  import { useRouter } from 'vue-router';

  const loading = ref(false);
  const router = useRouter();
  const catStore = useCategoriesStore();

  const form = reactive({
    name: ''
  });

  async function onSubmit() {
    try {
      loading.value = true;
      await catStore.create(form);
      Notify.create({ type: 'positive', message: 'Сохранено успешно!' });
      router.go(-1);
    } catch(e) {
      Notify.create({ type: 'negative', message: 'Не удалось сохранить категорию' });
    } finally {
      loading.value = false;
    }
  }
</script>
