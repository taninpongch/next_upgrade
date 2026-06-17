<template>
  <div class="bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1">
    <UHorizontalNavigation :links="displayMenu"
      :ui="{ base: 'p-0 h-8', container: 'min-w-min gap-2', before: 'hover:before:bg-transparent dark:hover:before:bg-transparent', after: 'after:mt-0' }"
      class="flex overflow-x-auto no-scrollbar duration-200 ease-out focus:outline-none">
      <template #default="{ link }">
        <BizShareText :text="link.name" class="relative text-nowrap py-1 px-3 rounded-lg"
          :class="[selectedMenu?.id == link.id ? ' text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-sm' : '']" />
      </template>
    </UHorizontalNavigation>
  </div>
  <div class="space-y-4">
    <BizDeliveryProduct v-if="selectedMenu && selectedMenu.products && selectedMenu.products.length > 0"
      v-for="item in selectedMenu.products" :data="item" @on-tapped="onSelectItem" />
    <BizShareEmptyList v-else />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    category: {
      id: string,
      name: string,
      products: {
        id: string,
        src: string,
        title: string,
        description?: string,
        price: string,
        discountPrice?: string,
        disabled: boolean
      }[]
    }[],
  }>(), {}
);

const selectedMenu = ref();
const displayMenu = computed(() => {
  selectedMenu.value = props.category ? props.category[0] : null;
  let res = props.category.map((it: any) => {
    return {
      id: it.id,
      name: it.name,
      click: () => { selectedMenu.value = it }
    }
  });
  return res;
});

const emitName = "onTapped";
const emits = defineEmits([emitName]);
const onSelectItem = (item: any) => emits(emitName, item);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
  /* Hide scrollbar for Chrome, Safari, and Opera */
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>