<template>
  <MuiCard>
    <BizShareItemInfo heading="ผู้จัดส่ง" :title="courier ? courier : '-'" />
  </MuiCard>

  <MuiCard>
    <BizShareItemInfo heading="ที่อยู่จัดส่ง" :title='`${gps.title} ${gps.description}`' />
  </MuiCard>

  <!-- TODO: component BizCartProductInfo อาจจะย้ายออกมาเป็นตัว Share -->
  <BizCartProductInfo :data="product" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    courier?: string
    gps?: any,
    product?: any,
  }>(), {}
)

const data = ref({
  src: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png",
  title: "Prompiman Restaurant",
  txsummary: [
    { description: 'รวมค่าสินค้า', value: "380.00 THB" },
    { description: 'ค่าจัดส่ง', value: "20.00 THB" },
    { description: 'ส่วนลด', value: "10.00 THB" },
    { description: 'ราคารวมทั้งหมด', value: "390.00 THB" }
  ],
  product: [
    {
      id: "01",
      src: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfmenu.png",
      title: "x10 ชาเย็น",
      description: "หวานน้อย แยกน้ำแข็ง ใช้ไสรัปหญ้าหวาน ยี้ห้อพญาขาวอินทรีย์ เพิ่มความเค็มด้วยเกลือหิมะลายัน แก้วขอเป็นพลาสติกที่นำมารีไซเคิลได้หลายๆ รอบ",
      price: "500.00 THB",
      discountPrice: "300.00 THB",
    },
    {
      id: "02",
      src: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfmenu.png",
      title: "x1 ชาอู่หลง",
      description: "ใส่น้ำตาล",
      price: "50.00 THB",
    },
    {
      id: "03",
      src: "https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfmenu.png",
      title: "x1 ชาร้อน",
      price: "30.00 THB",
    }
  ],
  coupon: [],
  gps: {
    title: "พิมานคอนโด ม.ขอนแก่น Unnamed road Muang Ubonratchathani",
    description: "โทร: 0910161111"
  },
  delivery: {
    src: "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/deliveryOrange.png",
    title: "Solar delivery"
  }
});

</script>