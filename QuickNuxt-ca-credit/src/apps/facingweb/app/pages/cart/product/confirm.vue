<template>
  <BizShareManaForm @submit="onSubmit">
    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else-if="data && !data.error">
      <MuiPage>
        <MuiHeader title="จ่ายเงิน" />
        <!-- <BizShareItem :title="displayShippingLocation" :description="displayShippingTelephone" /> -->
        <BizShareItem :title="data.shippingMethod.name" :src="data.shippingMethod.logo" />

        <MuiCard>
          <BizSharePartyHero :src="data.bizAccount.logo" :title="data.bizAccount.name" />
          <BizCartShareDetailInfo :data="displayTxSummary" :coupon="data.coupon" @on-tapped="onSelectCoupon" />
        </MuiCard>

        <BizCartProductInfo :data="displayProducts" />
      </MuiPage>
    </div>
    <div v-else-if="!data">
      <MuiPage>
        <MuiCard>
          <BizShareItemText title="สถานะของคุณ" subtitle="ตะกร้านี้ชำระเงินเรียบร้อยแล้ว" />
        </MuiCard>
      </MuiPage>
    </div>
    <div v-else>
      <MuiPage>
        <MuiHeader title="จ่ายเงิน" />
        <BizShareShowError :src="displayErrorImage" :title="data.error?.title" :description="data.error?.message" />
      </MuiPage>
    </div>
    <ActionButton text="จ่ายเงิน" />

    <!-- <ActionButton :text="(data && !data.error) ? 'จ่ายเงิน' : 'ตกลง'" /> -->
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useCartStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;

getData("get-cart-product-confirm").then(async () => {
  await manaLib.setGpsAddress(data.value.shippingAddress);
});


// ใช้ header ของ mobile
// const displayShippingLocation = computed(() => {
//   const addresses: string[] = [
//     data.value.shippingAddress?.name,
//     data.value.shippingAddress?.remark ? `(${data.value.shippingAddress?.remark})` : '',
//     data.value.shippingAddress?.line1,
//     data.value.shippingAddress?.district,
//     data.value.shippingAddress?.city,
//     data.value.shippingAddress?.province,
//     // data.value.shippingAddress?.state,
//     // data.value.shippingAddress?.country,
//     data.value.shippingAddress?.postalCode];
//   return addresses.join(" ");
// });

// const displayShippingTelephone = computed(() => `โทร ${data.value.shippingAddress?.contactNo}`);

const displayTxSummary = computed(() => {
  //todo:user libs for show price
  // let amount = convertToAmountUnit.value(data.value.amount);
  // let shipping = convertToAmountUnit.value(data.value.fee);
  // let shippingFee = convertToAmountUnit.value(data.value.shippingFee);
  // let discount = convertToAmountUnit.value(data.value.discount);
  // let totalAmount = convertToAmountUnit.value(data.value.totalAmount);
  return [
    { description: 'รวมค่าสินค้า', value: manaLib?.toText(data?.value.amount, 'all') },
    { description: 'ค่าธรรมเนียม', value: manaLib?.toText(data?.value.fee, 'all') },
    { description: 'ค่าจัดส่ง', value: manaLib?.toText(data?.value.shippingFee, 'all') },
    { description: 'ส่วนลด', value: `-${manaLib?.toText(data?.value.discount, 'all')}` },
    { description: 'ราคารวมทั้งหมด', value: manaLib?.toText(data?.value.totalAmount, 'all') }
  ];
});

const convertToAmountUnit = computed(() => {
  return (item: any) => {
    let defaultValue = { amountUnit: 0, currency: "THB" };
    if (!item) {
      return defaultValue;
    }

    let key = Object.keys(item)[0];
    if (!key) {
      return defaultValue;
    }

    return { amountUnit: item[key], currency: key.toUpperCase() };
  };
});

const displayProducts = computed(() => {
  return data.value.products.map((it: any) => {
    return {
      id: it?.productId,
      src: it?.src,
      title: `x${it?.quantity} ${it?.title}`,
      description: it?.description,
      price: displayAmount.value(it?.price),
      // discountPrice: "300.00 THB",
    }
  });
});

const displayAmount = computed(() => {
  return (item: any) => manaLib && item ? `${manaLib.toText(item, 'amt')} ${manaLib.toText(item, 'cur')}` : "0.00 THB";
});

const onSelectCoupon = () => {
  // TODO: Apply coupons
  // data.value.coupon = [{ name: "1 แถม 1" }, { name: "ลด 10%" }];
}

const displayErrorImage = computed(() => {
  let displayLogo = "https://failfast.blob.core.windows.net/mcontent-imgs/icons/iconunsuccess.png";
  if (manaLib && data && data.value.error && data.value.error.logoHost && data.value.error.logoPath) {
    displayLogo = data.value.error?.logoHost == 'icon' ? data.value.error.logoPath : manaLib.getUrl(data.value.error.logoHost, data.value.error.logoPath);
  }

  return displayLogo;
})

const onSubmit = () => postData({}, "post-cart-product-confirm");
</script>
