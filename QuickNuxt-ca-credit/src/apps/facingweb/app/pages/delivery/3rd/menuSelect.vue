<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <MuiCard>
        <BizDeliveryBannerImage :src="data?.data.restaurant?.bannerImage" />
        <BizShareText :text="data?.data?.restaurant?.name" :is-bold="true" />
        <BizShareText v-if="!data?.data?.restaurant.isStandby && data.data.onService" :text="displayOpenNextTime"
          color="red" />
      </MuiCard>
      <BizDeliveryLocationOutsideArea v-if="!data.data.onService" />

      <!-- <div  class="relative space-y-2"> -->
      <BizDeliveryProductCategory v-else-if="isAvailibleItem" :category="listItem" @on-tapped="onSelectItem" />
      <!-- </div> -->
      <BizShareEmptyList v-else />
    </MuiPage>
  </div>
</template>

<script setup lang="ts">
// const shopId = useRoute().query["shopId"];
import { storeToRefs } from "pinia";
import { getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData } = store;

getData("get-menu-select").then(async () => {
  if (!data?.value.data?.restaurant?.isStandby || !data?.value.data?.onService) {
    data.value.data.menu.forEach((it: any) => {
      it.products.forEach((item: any) => {
        item.isSuspended = true;
      });
    });
  }
});

const onSelectItem = async (item: any) => {
  await goVisit(data?.value?.subscriptionId, 'delivery-menu-confirm', item.id);
}

const category = ref();
const listItem = computed(() => {
  category.value = data?.value.data?.menu.map((it: any) => {
    return {
      id: it.categoryId,
      name: it.categoryName,
      products: it.products.map((item: any) => {
        return {
          id: item._id,
          src: item.previewImageUrl,
          title: item.name,
          // description: item.name,
          price: displayPrice(item.priceMV),
          // discountPrice: item.price,
          disabled: item.isSuspended
        }
      })
    }
  });
  return category.value;
});

const displayPrice = ((item: any) => {
  return `${manaLib?.toText(item)}`;
})

const displayOpenNextTime = computed(() => {
  let openNextTimeText = "";
  if (data?.value.data?.nextOpeningTime) {
    let date = new Date(data?.value.data?.nextOpeningTime);
    let nextTime = `${(date.getHours().toLocaleString().padStart(2, '0'))}.${(date.getMinutes().toLocaleString().padStart(2, '0'))}`;
    let nextDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543}`;
    openNextTimeText = `จะเปิดให้บริการ เวลา ${nextTime} น. (${nextDate})`;
  }
  return `ร้านปิด! ${openNextTimeText}`;
});

const isAvailibleItem = computed(() => {
  return data.value && data?.value.data?.menu && data?.value.data?.menu.length > 0;
})
</script>