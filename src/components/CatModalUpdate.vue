<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="full-width">
      <q-card-section>
        <div class="text-h6">Редактирование</div>
        <q-form @submit="update">
          <q-input color="green-8" v-model="form.name" />
          <q-btn class="q-mt-md" color="green-8" type="submit">Сохранить</q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import type { Category } from 'src/types/categories';
  import { useCategoriesStore } from 'src/stores/categories';

  const catStore = useCategoriesStore();

  const props = defineProps<{
    modelValue: boolean,
    id: number,
    item: Category
  }>();

  const form = reactive({
    name: props.item.name
  });

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
  }>();

  async function update() {
    try {
      await catStore.update(props.item.id, form);
      emits('update:modelValue', false);
    } catch(e) {
      console.log(e);
    }
  }
</script>
