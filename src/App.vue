<template>
  <router-view />
</template>

<script setup lang="ts">
  import 'virtual:svg-icons-register';
  import { useItemsStore } from './stores/items';

  const store = useItemsStore();

  const icons = Array
    .from(document.querySelectorAll('#__svg__icons__dom__ symbol'))
    .map(e => e.id.replace('icon-', ''));

  store.setIcons(icons);
</script>
