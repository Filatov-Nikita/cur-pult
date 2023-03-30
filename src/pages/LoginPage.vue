<template>
  <q-page class="bg-dark q-pt-md q-px-md">
    <h1 class="text-h6 text-white">Вход</h1>
    <q-form class="q-gutter-y-md" @submit="submit">
      <q-input required dark v-model="form.username" label="Логин" />
      <q-input required dark v-model="form.password" label="Пароль" type="password" />
      <q-btn type="submit" color="primary" :loading="loading">Войти</q-btn>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { Notify } from 'quasar';
  import { useUserStore } from 'src/stores/user';
  import { useRouter } from 'vue-router';

  const store = useUserStore();
  const router = useRouter();

  const form = reactive({
    username: '',
    password: ''
  });

  const loading = ref(false);

  async function submit() {
    try {
      await store.login(form);
      router.push({ name: 'main' });
    } catch(e) {
      console.log(e);
      Notify.create({ type: 'negative', message: 'Неправильный логин или пароль' });
    } finally {
      loading.value = false;
    }
  }
</script>
