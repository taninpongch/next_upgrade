<template>
  <MuiCard>
    <BizShareInputText @vue:updated="filterAddress(props.models?.zipcode)" label="รหัสไปรษณีย์" type="number"
      placeholder="เช่น 20110" v-model="models.zipcode" name="zipcode" :disabled="true" />
    <ul v-if="dataFilterAddressByZipcode && !props.models?.district"
      class="overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
      <li v-for="item in dataFilterAddressByZipcode" @click="getDataZipcodeAddress(item)">
        <a href="#" class="lex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white 
          bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
            dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {{ item.zipcode }}, {{ item.district }}, {{ item.amphoe }}, {{ item.province }}
        </a>
      </li>
    </ul>

    <BizShareInputText label="ที่อยู่" placeholder="เช่น หมู่บ้านแสนสุข หมู่1" v-model="models.line1" name="line1" />
    <BizShareInputText label="ตำบล/แขวง" placeholder="เช่น บางพระ" :disabled="true" v-model="models.district"
      name="district" />
    <BizShareInputText label="อำเภอ/เขต" placeholder="เช่น ศรีราชา" :disabled="true" v-model="models.amphoe"
      name="amphoe" />
    <BizShareInputText label="จังหวัด" placeholder="เช่น ชลบุรี" :disabled="true" v-model="models.province"
      name="province" />
  </MuiCard>

  <MuiCard>
    <BizShareInputNote label="หมายเหตุ" hint="Optional" v-model="models.remark" />
  </MuiCard>
</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";
import { useWindowFocus } from "@vueuse/core";

const _AddressStore = AddressStore();
const { dataFilterAddress } = storeToRefs(_AddressStore);
const { getDataByZipcode } = _AddressStore;
const focused = useWindowFocus();

const props = withDefaults(
  defineProps<{
    models?: any
  }>(), {}
)

watch(focused, async (isFocused) => {
  if (isFocused) {
    filterAddress(props.models?.zipcode);
  }
});

const dataFilterAddressByZipcode = ref<any>(null);

const filterAddress = async (zipcode: string) => {
  if (zipcode.length == 5) {
    await getDataByZipcode(parseInt(zipcode))
    dataFilterAddressByZipcode.value = dataFilterAddress.value
  }
  else {
    dataFilterAddressByZipcode.value = null;
    props.models.district = '';
    props.models.amphoe = '';
    props.models.province = '';
  }
}

const getDataZipcodeAddress = (dataBySelect: any) => {
  props.models.zipcode = dataBySelect?.zipcode.toString();
  props.models.district = dataBySelect?.district;
  props.models.amphoe = dataBySelect?.amphoe;
  props.models.province = dataBySelect?.province;
  dataFilterAddressByZipcode.value = null
}

const showdlg = async () => {
  const lib = await getManaContext();
  await lib.visit("gps", `default/gps-dlg?endpointId=closedlg&xdlgmode=dialog&xdlgbtn1=ปิด&xdlgsize=s&closeEndpointId=closedlg`);
}

</script>
