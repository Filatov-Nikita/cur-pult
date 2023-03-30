<template>
  <q-dialog
    persistent
    maximized
    :model-value="modelValue"
    transition-show="slide-up"
    transition-hide="slide-down"
    @update:model-value="$emit('update:modelValue', $event)"
    @before-show="onBeforeShow"
  >
    <q-card dark>
      <q-card-section>
        <div class="text-subtitle2 q-mb-md">Перемещайте ячейку</div>
        <div class="flex q-gutter-x-sm q-mb-xl">
          <q-btn v-touch-repeat:0:25.mouse="moveLeft" class="left" round flat size="lg" icon="expand_more" />
          <q-btn v-touch-repeat:0:25.mouse="moveTop" class="up" flat round size="lg" icon="expand_more" />
          <q-btn v-touch-repeat:0:25.mouse="moveDown" class="down" round flat size="lg" icon="expand_more" />
          <q-btn v-touch-repeat:0:25.mouse="moveRight" class="right" round flat size="lg" icon="expand_more" />
        </div>
        <q-form class="q-gutter-y-md" @submit="save">
          <div class="text-subtitle2 q-mb-sm">Заполните данные</div>
          <q-select dark v-model="form.icon" :options="itemsStore.icons" label="Иконка">
            <template v-slot:option="{ opt, itemProps, selected }">
              <q-item v-bind="itemProps">
                <q-item-section>
                  <svg width="24px" height="24px"><use :xlink:href="`#icon-${opt}`"></use></svg>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input dark v-model="form.name" label="Наименование" color="green-8" />
          <q-input dark v-model="form.value" label="Значение" color="green-8" />
          <q-input dark v-model="form.title" label="Описание значения" color="green-8" />
          <q-input dark v-model="form.period" label="Период" color="green-8" />
          <q-select
            dark
            label="Размер"
            color="green-8"
            v-model="size"
            :options="sizeOpts"
            @update:modelValue="updateSize"
          />
          <div class="q-pt-sm">
            <div class="q-mb-sm">Направление тренда</div>
            <div class="q-gutter-x-md">
              <q-radio v-model="trend" val="1" label="Вверх" color="positive" />
              <q-radio v-model="trend" val="0" label="Вниз" color="negative" />
              <q-radio v-model="trend" :val="null" label="Отсутствует" color="blue-10" />
            </div>
          </div>
          <div class="q-gutter-x-md q-pt-md">
            <q-btn type="submit" color="green-8">Сохранить</q-btn>
            <q-btn color="negative" flat label="Отмена" @click="cancel" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import { useItemsStore } from 'src/stores/items';
  import { reactive, ref } from 'vue';
  import type { ItemBody, Item } from 'src/types/items';
  import { watch } from 'vue';

  type Sizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  interface SizeOpt {
    value: Sizes,
    label: string
  };

  const props = defineProps<{
    modelValue: boolean,
    catId: number,
    initialItem?: Item
  }>();

  const step = 20;
  const sizeOpts: SizeOpt[] = [
    { label: 'Наименьший', value: 'xs' },
    { label: 'Малый', value: 'sm' },
    { label: 'Средний', value: 'md' },
    { label: 'Большой', value: 'lg' },
    { label: 'Наибольший', value: 'xl' },
  ];

  function makeSize(val: Sizes | null) {
    if(!val) return null;
    const res = sizeOpts.find(opt => opt.value === val);
    return res ?? null;
  }

  function makeTrend(trend: boolean | null) {
    return trend ? `${Number(trend)}` : null;
  }

  const itemsStore = useItemsStore();
  const item = ref<Item | null>(props.initialItem ?? null);
  const trend = ref<string | null>(makeTrend(props.initialItem?.trend ?? null));
  const size = ref<SizeOpt | null>(makeSize(props.initialItem?.size ?? 'md'));

  function makeForm() {
    const {
      icon = null,
      name = null,
      value = null,
      title = null,
      period = null,
      size = null,
      trend = null,
      x = null,
      y = null,
    } = props.initialItem ?? {};

    return { icon, name, value, title, period, size, trend, x, y, CategoryId: props.catId };
  }

  const form = reactive<ItemBody>(makeForm());

  watch(
    () => props.initialItem,
    (newItem) => {
      item.value = props.initialItem ?? null;
      trend.value = makeTrend(newItem?.trend ?? null);
      size.value = makeSize(newItem?.size ?? 'md');
      Object.assign(form, makeForm());
    }
  );

  const emits = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
  }>();

  async function create() {
    try {
      item.value = await itemsStore.create(form);
    } catch(e) {
      console.log(e);
    }
  }

  function onBeforeShow() {
    if(props.initialItem === undefined) {
      create();
    }
  }

  async function update() {
    try {
      if(item.value === null) return;
      form.trend = trend.value !== null ? Boolean(+trend.value) : null;
      form.size = size.value?.value ?? null;
      await itemsStore.update(item.value.id, form);
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async function remove() {
    try {
      if(item.value === null) return;
      await itemsStore.remove(item.value.id);
    } catch(e) {
      console.log(e);
    }
  }

  function cancel() {
    if(props.initialItem === undefined) {
      remove();
      reset();
    }

    emits('update:modelValue', false);
  }

  async function updateOnScreen(body: Partial<Item>) {
    try {
      if(item.value === null) return;
      await itemsStore.updateOnScreen(item.value.id, body);
    } catch(e) {
      console.log(e);
    }
  }

  async function updatePos() {
    updateOnScreen({ x: form.x, y: form.y });
  }

  async function updateSize() {
    if(!size.value) return;
    updateOnScreen({ size: size.value.value });
  }

  async function save() {
    try {
      await update();
      if(props.initialItem === undefined) {
        reset();
      }

      emits('update:modelValue', false);

    } finally {}
  }

  function reset() {
    Object.assign(form, makeForm());
    trend.value = null;
    size.value = makeSize('md');
  }

  function moveX(step: number) {
    if(form.x === null) form.x = 0;
    form.x += step;
    updatePos();
  }

  function moveY(step: number) {
    if(form.y === null) form.y = 0;
    form.y += step;
    updatePos();
  }

  const moveLeft = () => moveX(-step);
  const moveRight = () => moveX(step);
  const moveTop = () => moveY(-step);
  const moveDown = () => moveY(step);
</script>
<style scoped>
  .up {
    transform: rotate(180deg);
  }

  .left {
    transform: rotate(90deg);
  }

  .right {
    transform: rotate(-90deg);
  }
</style>
