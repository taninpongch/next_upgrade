<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>

    <MuiPage>
      <!-- <MuiHeader title="Delivery" /> -->
      <MuiCard>
        <!-- <MuiCard v-if="restaurantlist && hasLoaded == 'y'"> -->
        <BizShareSessionTitle label="ร้านทั้งหมด" />
        <!-- TODO: ปรับ code ใหม่ -->
        <!-- <BizDeliveryInputSearch v-model="dataForm.search" /> -->
        <div
          class="relative flex items-center p-1 shadow-sm bg-white dark:bg-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 rounded-md">
          <UInput icon="i-heroicons-magnifying-glass-20-solid" color="white" :trailing="false" placeholder="ค้นหา..."
            v-model="dataForm.search" class="w-full h-fit" size="md" @update:model-value="onInputChanged"
            :ui="{ color: { white: { outline: 'ring-0 focus:ring-0 shadow-none' } } }" />
          <BizShareActionNormal icon="i-heroicons-x-mark-20-solid" :blocked="false" @click="onClear" size="md"
            color="gray" variant="ghost" />
        </div>
      </MuiCard>

      <div v-if="restaurantlist && hasLoaded == 'y'">
        <BizDeliveryShopList :data="restaurantlist" @on-tapped="onSelectShop" />
        <BizShareEmptyList v-if="restaurantlist.length == 0 && hasLoaded == 'y'" />
        <!-- TODO: ตัว seemore อาจจะต้องไปเขียน lua เพิ่ม -->
        <BizShareActionLink v-if="checkPage > 0" label="See more" @on-tapped="seeMore" />
        <!-- <BizShareActionLink v-if="checkPage > 0" label="See more" @on-tapped="seeMore" />
            <BizShareEmptyList v-if="restaurantlist.length == 0 && hasLoaded == 'y'" /> -->
      </div>
      <BizDeliveryLocationOutsideArea v-if="restaurantlist && hasLoaded == 'n'" />
    </MuiPage>
  </div>

</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
import { storeToRefs } from "pinia";
import { useDebounceFn } from '@vueuse/core';
import { useWindowFocus } from "@vueuse/core";

const manaLib = await getManaContext();
const store = useDeliveryStore();
const { data, pending, dataSeemore } = storeToRefs(store);
const restaurantlist = ref<any>([]);
const { getData, getDataSeemore } = store;
const { goVisit } = useManaService();
const hasLoaded = ref<any>(null);
const nextPage = ref<any>(null);
// const pathUrl = ref<any>();
const focused = useWindowFocus();


const onSelectShop = async (item: any) => {
  await goVisit(item.subscriptionId, 'delivery-menu-select', item.id);
};

getData("get-shop-select").then(async () => {
  restaurantlist.value = data.value.bizAccounts;
  hasLoaded.value = data.value && data.value?.bizAccounts?.length > 0 ? "y" : "n";
  nextPage.value = data.value?.nextPage;
  // pathUrl.value = data.value?.pathUrl;
  await manaLib.setGpsAddress(data.value?.gpsAddress);

});

watch(focused, async (isFocused) => {
  if (isFocused) {
    getData("get-shop-select").then(async () => {
      restaurantlist.value = data.value.bizAccounts;
      hasLoaded.value = data.value && data.value?.bizAccounts?.length > 0 ? "y" : "n";
      nextPage.value = data.value?.nextPage;
      // pathUrl.value = data.value?.pathUrl;
      // await manaLib.setGpsAddress(data.value?.gpsAddress);
    });
  };
});

const seeMore = async () => {
  getData(`get-shop-select?page=${nextPage.value}&keyword=${dataForm.value.search}`).then(() => {
    restaurantlist.value = restaurantlist.value.concat(data.value.list);
    nextPage.value = data.value.nextPage;
    // pathUrl.value = data.value.pathUrl;
  });
};

const initData = reactive({
  search: "",
});
const dataForm = ref(initData);

const checkPage = computed(() => {
  return nextPage.value;
})

const onInputChanged = async () => await debouncedFn();
const onClear = async () => {
  dataForm.value.search = "";
  await onSearch();
}

const debouncedFn = useDebounceFn(async () => {
  await onSearch();
}, 500)

const onSearch = (async () => {
  restaurantlist.value = [];
  if (dataForm.value.search != "") {
    getDataSeemore(`get-shop-select?keyword=${dataForm.value.search}`).then(() => {
      restaurantlist.value = dataSeemore.value.bizAccounts;
      nextPage.value = data.value.nextPage;
      // pathUrl.value = data.value.pathUrl;
    });
  }
  else {
    getDataSeemore("get-shop-select").then(() => {
      restaurantlist.value = dataSeemore.value.bizAccounts;
      hasLoaded.value = dataSeemore.value && dataSeemore.value?.bizAccounts?.length > 0 ? "y" : "n";
      nextPage.value = dataSeemore.value?.nextPage;
      // pathUrl.value = dataSeemore.value?.pathUrl;
    });
  }
});
</script>