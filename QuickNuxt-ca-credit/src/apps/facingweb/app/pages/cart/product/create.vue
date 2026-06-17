<template>
  <BizShareManaForm @submit="onSubmit">

    <div v-if="pending">
      <BizShareSkeletonLabel />
    </div>
    <div v-else-if="data && !data.error">
      <MuiPage>
        <MuiHeader title="สั่งสินค้า" />
        <!-- <BizShareItemLink :title="data.gps.title" :description="data.gps.description" rightText="แก้ไข"
      @on-tapped="onSelectGPS" /> -->

        <BizShareItemLink :title="deliveryName" :src="deliverySrc" rightText="เปลี่ยน" @on-tapped="onSelectDelivery" />
        <BizShareItemLink :title="data.bizAccount.name" :src="data.bizAccount.logo" rightText="เพิ่มสินค้า"
          right-color="red" @on-tapped="onSelectMoreProduct" />

        <MuiCard>
          <BizCartShareDetailInfo :data="displayTxSummary" :coupon="data?.coupon" @on-tapped="onSelectCoupon" />
        </MuiCard>

        <!-- //TODO quantity กับ name ทำให้ต่อกันในหน้านี้ให้เสร็จ refactor -->
        <BizCartProductAction :data="displayProducts" @on-tapped-edit-product="onSelectEditProduct"
          @on-tapped-delete-product="onSelectDeleteProduct($event)" />
      </MuiPage>
    </div>
    <ActionButton v-if="data?.products?.length == 0" text="ลบตะกร้า" />
    <ActionButton v-else text="สั่งสินค้า" />

  </BizShareManaForm>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getManaContext, ActionButton } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useCartStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const { goVisit } = useManaService();

const src = ref<any>();
const deliveryName = ref();
const deliverySrc = ref();

getData("get-cart-product-create").then(async () => {
  // src=manaLib.getUrl(data.value?.logoHost, data.value?.logoPath);
  deliveryName.value = data?.value.shippingMethod.name;
  deliverySrc.value = data?.value.shippingMethod.logo;

  await manaLib.setGpsAddress(data?.value.shippingAddress);
});

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

// id: string,
// src: string,
// title: string,
// description?: string,
// price: string,
// discountPrice?: string,


const displayProducts = computed(() => {
  return data?.value?.products.map((it: any) => {
    return {
      id: it?.id,
      src: it?.src,
      title: `x${it?.quantity} ${it?.title}`,
      description: it?.description,
      price: displayAmount.value(it?.price),
      // discountPrice: "300.00 THB",
      index: it?.index
    }
  });
});

const displayAmount = computed(() => {
  return (item: any) => manaLib && item ? `${manaLib.toText(item, 'amt')} ${manaLib.toText(item, 'cur')}` : "0.00 THB";
});


// const checkImgUrl = (imgUrl: string) => {
//   let img = imgUrl.startsWith("https://") ? imgUrl : `https://${imgUrl}`;
//   return img
// }

//   coupon: [],
//   gps: {
//     title: "พิมานคอนโด ม.ขอนแก่น Unnamed road Muang Ubonratchathani",
//     description: "โทร: 0910161111"
//   },
//   delivery: {
//     src: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/deliveryOrange.png",
//     title: "Solar delivery"
//   }
// });

const onSelectCoupon = () => {
  // TODO: Apply coupons
  // data.value.coupon = [{ name: "1 แถม 1" }, { name: "ลด 10%" }];
}

const dataForm = reactive({
  deliveryId: "",
});

// TODO: implement select gps
const onSelectGPS = () => {};
const onSelectDelivery = async () => {
  let optionDlgResult = await manaLib.showOptionDlg("cart-product-deliverySelect", "1btn", JSON.stringify({}), 'close', '', 'f');
  //TODO: handle option dialog result

  if (optionDlgResult && !optionDlgResult.isCancel) {
    dataForm.deliveryId = optionDlgResult?.selection?.deliveryId;
    deliveryName.value = optionDlgResult?.selection?.deliveryName;
    deliverySrc.value = optionDlgResult?.selection?.deliverySrc;
  }
};

const onSelectMoreProduct = async () => {
  await goVisit(data?.value?.subscriptionId, 'delivery-menu-select', data?.value?.bizAccount?.id, data?.value?.bizAccount?.id);
};

// TODO: implement edit product
const onSelectEditProduct = (item: any) => { };

const onSelectDeleteProduct = async (event: any) => {
  await goVisit('cart', 'confirm-delete-cart-product', event?.index);

};

const onSubmit = async () => {
  await postData({}, "post-cart-product-create");
}
</script>
