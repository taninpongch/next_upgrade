<template>
    <BizShareInputText @keyup="filterAddress(props?.models?.zipcode)" label="Zipcode/Postal Code" type="number" placeholder="เช่น 20110"
      v-model="models.zipcode" />
    <ul v-if="dataFilterAddressByZipcode" class="overflow-y-auto text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownUsersButton">
      <li v-for="item in dataFilterAddressByZipcode" @click="getDataZipcodeAddress(item)">
        <a href="#" class="lex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white 
            bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {{ item.zipcode }}, {{ item.district }}, {{ item.amphoe }}, {{ item.province }}
        </a>
      </li>
    </ul>

    <BizShareInputText label="Address" placeholder="เช่น หมู่บ้านแสนสุข หมู่1" v-model="models.line1" />
    <BizShareInputText label="Subdistrict" placeholder="เช่น บางพระ" :disabled="true" v-model="models.district" />
    <BizShareInputText label="District/City/Town" placeholder="เช่น ศรีราชา" :disabled="true" v-model="models.amphoe" />
    <BizShareInputText label="Province/State/Region" placeholder="เช่น ชลบุรี" :disabled="true" v-model="models.province" />
</template>

<script setup lang="ts">
const _AddressStore = AddressStore();
const { dataFilterAddress } = storeToRefs(_AddressStore);
const { getDataByZipcode } = _AddressStore;
const dataAddress = ref();

const props = withDefaults(
  defineProps<{
    models?: any
  }>(), {}
)

const dataFilterAddressByZipcode = ref<any>(null);

const getDataZipcodeAddress = (dataBySelect: any) => {
  props.models.district = dataBySelect.district
  props.models.amphoe = dataBySelect.amphoe
  props.models.province = dataBySelect.province

  dataForm.value.zipcode = dataBySelect?.zipcode;
  dataForm.value.district = dataBySelect?.district;
  dataForm.value.amphoe = dataBySelect?.amphoe;
  dataForm.value.province = dataBySelect?.province;
  dataFilterAddressByZipcode.value = null
}

const filterAddress = async (zipcode: string) => {
  if (zipcode.length == 5) {
    await getDataByZipcode(parseInt(zipcode))
    dataFilterAddressByZipcode.value = dataFilterAddress.value
  }
  else {
    dataFilterAddressByZipcode.value = null;
    dataForm.value.district = '';
    dataForm.value.amphoe = '';
    dataForm.value.province = '';
  }
}

const initData = reactive({
  zipcode: "",
  line1: "",
  district: "",
  amphoe: "",
  province: "",
});

const dataForm = ref(initData);


</script>
