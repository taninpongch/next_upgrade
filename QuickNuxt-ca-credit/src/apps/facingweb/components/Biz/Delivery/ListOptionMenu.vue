<template>
  <MuiCard v-if="dataOptionsList.length > 0">
    <BizShareText text="รายละเอียดเพิ่มเติม" :isBold="false" />
    <!-- TODO: เพิ่มเป็น component ระบุ option เพิ่มเติม -->
    <!-- TODO:สร้าง component ใหม่ -->
    <div v-for="(item, index) of dataOptionsList" :key="index">
      <BizShareSessionTitle :label="showOptionText(item)" />
      <BizShareText
        v-if="item.isRequired && (item.Selectable == item.maxSelection || item.Selectable == null) && isSubmitFirsttime == false"
        text="Invalid request" color="red" />
      <div v-for="(subOption, index) of item.options" :key="index" class="flex justify-between py-2">
        <UCheckbox :label="subOption?.value" @click="checkCheckbox($event, subOption, item)" />
        <p class="text-gray-500 dark:text-gray-400 text-sm">+ {{ checkOptionId4displayPrice(subOption._id) }}</p>
      </div>
      <UDivider class="pt-2" />
    </div>
  </MuiCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    data: any;
  }>(), {}
);

const dataOptions = ref<any[]>([]);
const dataOptionsList = ref<any[]>([]);
const isSubmitFirsttime = ref<boolean>(true);
const listOptions = ref<any[]>([]);
const listOptions4checkValidate = ref<any[]>([]);

dataOptionsList.value = props.data?.product?.extraElements?.options;
dataOptions.value = props.data?.options;
// });

const checkCheckbox = ((event: any, item: any, optionGroup: any) => {
  if (optionGroup.maxSelection != 0 && optionGroup.Selectable == null)
    optionGroup.Selectable = optionGroup.maxSelection;
  const data = dataOptions.value.find(it => it.optionId == item._id)
  if (event.target.checked) {
    if (optionGroup.Selectable != 0) {
      listOptions.value.push({
        'name': data.name,
        'value': data.value,
      });
      listOptions4checkValidate.value.push({
        '_id': data.optionId,
        'name': data.name,
        'value': data.value,
      });
      if (optionGroup.Selectable != null && optionGroup.Selectable > 0)
        optionGroup.Selectable = optionGroup.Selectable - 1
    }
    else {
      event.target.checked = !event.target.checked;
      return;
    }
  }
  else {
    const index = listOptions.value.findIndex(it => it.name == item.value);
    if (index >= 0) listOptions.value.splice(index, 1);
    const index2 = listOptions4checkValidate.value.findIndex(it => it.name == item.value);
    if (index2 >= 0) listOptions4checkValidate.value.splice(index2, 1);
    if (optionGroup.Selectable != null && optionGroup.Selectable < optionGroup.maxSelection)
      optionGroup.Selectable = optionGroup.Selectable + 1
  }

  if (!isSubmitFirsttime.value) {
    const isFormValid = checkValidate();
    // mapi.validForm(isFormValid);
  }
})

const showOptionText = ((item: any): string => {
  if (item.isRequired && item.maxSelection == 0) return `${item.name} (ต้องระบุ)`;
  else if (!item.isRequired && item.maxSelection > 0) return `${item.name} (เลือกได้ ${item.maxSelection} รายการ)`;
  else if (item.isRequired && item.maxSelection > 0) return `${item.name} (ต้องระบุ, เลือกได้ ${item.maxSelection} รายการ)`;
  else return `${item.Name}`;
});

const checkOptionId4displayPrice = ((_id: string) => {
  const data = dataOptions.value.find(it => it.optionId == _id);
  if (data == null || data == undefined) {
    return false;
  } else {
    return convertPrice(data.unitPrice)
  }
})

const convertPrice = ((item: any) => {
  const currency = Object.keys(item)[0];
  const price = (item[currency]) / 1000;
  return `${price.toFixed(2)} ${currency}`;
})


const checkValidate = () => {
  const selectIds = listOptions4checkValidate.value.map(element => element._id);
  if (props.data?.product?.extraElements?.options == null || props.data?.product?.extraElements?.options == undefined) {
    return true;
  }
  const count = props.data?.product?.extraElements?.options.filter((it: any) => it.isRequired == true)
  for (let index = 0; index < count.length; index++) {
    const resulty = props.data?.product?.extraElements?.options
      .filter((it: any) => it.isRequired == true)
      .map((it: any) => it.options)[index]
      .map((it: any) => it._id)
      .find((it: any) => selectIds.includes(it))
    if (!resulty) { return false; }
  }
  return true;
}

</script>