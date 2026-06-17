<template>
  <div v-if="pending">
    <BizShareSkeletonList />
  </div>
  <div v-else>
    <MuiPage>
      <!-- <MuiHeader title="Americano" /> -->
      <BizShareManaForm @submit="onSubmit">
        <!-- <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit"> -->
        <BizDeliveryProduct :data="displayItem" />
        <!-- <BizDeliveryListOptionMenu :data="data.data" /> -->
        <!-- //TODO: กลับมาเรียกใช้ component ด้านบน -->
        <MuiCard v-if="dataOptionsList.length > 0">
          <BizShareText text="รายละเอียดเพิ่มเติม" :isBold="false" />
          <!-- TODO:สร้าง component ใหม่ -->
          <div v-for="(item, index) of dataOptionsList" :key="index">
            <BizShareSessionTitle :label="showOptionText(item)" />
            <BizShareText
              v-if="item.isRequired && (item.selectable == item.maxSelection || item.selectable == null) && isSubmitFirsttime == false"
              text="Invalid request" color="red" />
            <div v-for="(subOption, index) of item.options" :key="index" class="flex justify-between py-2">
              <UCheckbox :label="subOption?.value" @click="checkCheckbox($event, subOption, item)" />
              <BizShareText color="gray" :text=displayPrice(subOption?.priceMV) />
            </div>
            <UDivider class="pt-2" />
          </div>
        </MuiCard>

        <MuiCard v-if="data?.product?.canNote">
          <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="remark" />
        </MuiCard>


        <!-- TODO: คุณกำลังเปลี่ยนไปร้านอื่น การดำเนินการจะล้างสินค้าที่มีอยู่ทั้งหมดออกจากรถเข็นของคุณ -->
        <!-- <UModal v-model="isOpen" :preventClose='true' :ui="{ container: 'items-center sm:items-center' }">
        <MuiCard class="text-center py-4">
          // คุณกำลังเปลี่ยนไปร้านอื่น การดำเนินการจะล้างสินค้าที่มีอยู่ทั้งหมดออกจากรถเข็นของคุณ
          <BizShareText text="คุณกำลังเปลี่ยนตะกร้าสินค้า" />
          <BizShareImage :rounded="false" size="md"
            src="https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/cartchange.png" />
          <BizShareText text="สินค้าเดิมจะถูกลบออก" />
          <BizShareGroupButton :right-alignment="true">
            <BizShareActionNormal label="Cancel" :block="false" color="gray" variant="ghost" @click="isOpen = false" />
            <BizShareActionNormal label="OK" :block="false" color="blue" variant="ghost" @click="cartConfirmRequest" />
          </BizShareGroupButton>
        </MuiCard>
      </UModal> -->


        <ActionButton />
        <!-- <BizDeliveryFooter>
        <div class="grid grid-cols-7 gap-4 text-center items-center">
          <BizShareText text="จำนวน" class="col-span-2" />
          <BizShareActionNormal label="-" color="gray" @on-tapped="onDecreaseAmount"
            :ui="{ base: 'h-11', size: { xl: 'text-3xl' } }" />
          <BizShareText :text="dataForm.quantity.toString()" />
          <BizShareActionNormal label="+" color="gray" @on-tapped="onIncreaseAmount"
            :ui="{ base: 'h-11', size: { xl: 'text-3xl' } }" />
          <BizShareActionSubmit class="col-span-2" />
        </div>
      </BizDeliveryFooter> -->

      </BizShareManaForm>
    </MuiPage>
  </div>
</template>

<script lang="ts" setup>
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const store = useDeliveryStore();
const { data, pending } = storeToRefs(store);
const { getData, postData } = store;
const dataOptionsList = ref<any[]>([]);
const listOptions = ref<any[]>([]);
const isSubmitFirsttime = ref<boolean>(true);
const listOptions4checkValidate = ref<any[]>([]);
const remark = ref();


getData("get-menu-confirm").then(async () => {
  dataOptionsList.value = data?.value?.product?.extraElements?.options;
});

const displayItem = computed(() => {
  return {
    title: data.value?.product?.name,
    src: data.value?.product?.previewImageUrl ? data.value?.product?.previewImageUrl : "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfmenu.png",
    price: `${manaLib?.toText(data.value?.product?.unitPrice)}`,
    description: '',
    discountPrice: ''
  }
});

const displayPrice = ((item: any) => {
  return `${manaLib?.toText(item)}`;
})

const showOptionText = ((item: any): string => {
  if (item.isRequired && item.maxSelection == 0) return `${item.name} (ต้องระบุ)`;
  else if (!item.isRequired && item.maxSelection > 0) return `${item.name} (เลือกได้ ${item.maxSelection} รายการ)`;
  else if (item.isRequired && item.maxSelection > 0) return `${item.name} (ต้องระบุ, เลือกได้ ${item.maxSelection} รายการ)`;
  else return `${item.name}`;
});

const checkCheckbox = ((event: any, item: any, optionGroup: any) => {
  if (optionGroup.maxSelection != 0 && optionGroup.selectable == null)
    optionGroup.selectable = optionGroup.maxSelection;
  if (event.target.checked) {
    if (optionGroup.selectable != 0) {
      listOptions.value.push({
        'name': item.value,
        'value': item.value,
      });
      listOptions4checkValidate.value.push({
        '_id': item._id,
        'name': item.value,
        'value': item.value,
      });
      if (optionGroup.selectable != null && optionGroup.selectable > 0)
        optionGroup.selectable = optionGroup.selectable - 1
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
    if (optionGroup.selectable != null && optionGroup.selectable < optionGroup.maxSelection)
      optionGroup.selectable = optionGroup.selectable + 1
  }
})

const dataForm = reactive({
  selectedOptions: [{
    'name': "",
    'value': "",
  }],
});

const checkValidate = () => {
  const selectIds = listOptions4checkValidate.value.map(element => element._id);
  if (data?.value?.product?.extraElements?.options == null || data?.value?.product?.extraElements?.options == undefined) {
    return true;
  }
  const count = data?.value?.product?.extraElements?.options.filter((it: any) => it.isRequired == true)
  for (let index = 0; index < count.length; index++) {
    const resulty = data?.value?.product?.extraElements?.options
      .filter((it: any) => it.isRequired == true)
      .map((it: any) => it.options)[index]
      .map((it: any) => it._id)
      .find((it: any) => selectIds.includes(it))
    if (!resulty) { return false; }
  }
  return true;
}

async function onSubmit() {
  isSubmitFirsttime.value = false;
  const isFormValid = checkValidate();
  const index = listOptions.value.findIndex(it => it.name == "mockremarkid");
  if (index >= 0) listOptions.value.splice(index, 1);
  if (remark.value) {
    listOptions.value.push({
      'name': "mockremarkid",
      'value': remark.value,
    })
  }
  if (isFormValid) {
    dataForm.selectedOptions = listOptions.value;
    await postData(dataForm, 'post-menu-confirm', data.value?.subscriptionId);
  }
}
</script>