<template>
  <MuiCard>
    <BizBillShareUserTransfer :data="data" />
    <UDivider />
    <BizBillShareBillInfo :src="src" :linkRef="linkRef" :linkMore="linkMore" :descriptionRemark="data.session.remark" />
  </MuiCard>
  <BizShareActionLink icon="i-heroicons-clipboard-document-list" label="ดูรายละเอียดธุรกรรม" @on-tapped="navigate" />
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
const lib = await getManaContext();

const props = withDefaults(
  defineProps<{
    data: any,
  }>(), {}
)

const navigate = () => {
  // TODO: Visit
  // กรณี Result (dlg) แล้วจะเปิด Detail (page) จะยังทำไม่ได้
  navigateTo('detail')
}

const linkRef = [{
  label: 'รหัสอ้างอิง',
  value: props.data?.session?.refCode,
}, {
  label: 'วันที่',
  value: lib.getDateText(props.data?.session?.actionDate),
}]

const convertAll = (list: any[]) => {
  if (list == undefined || list == null || list.length == 0) {
    list = [{
      label: '',
      value: '-',
    }]
  }
  return list.map(it => {
    return {
      label: it.name,
      value: it.value,
    }
  });
}

const linkMore = computed(() => convertAll(props.data?.session?.refs));
const src = computed(() => {
  if (props.data == null) {
    return "";
  }
  return lib.getUrl(props.data?.session?.qrUrlHostFqdn, props.data?.session?.qrUrlPath)
})

</script>
