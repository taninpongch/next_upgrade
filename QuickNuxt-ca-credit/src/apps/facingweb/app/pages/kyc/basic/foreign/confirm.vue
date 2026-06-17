<template>
  <MuiPage>
    <MuiHeader title="check your information" />
    <MuiCard>
      <BizShareListInfoHorizontal heading="Personal information" :infos="infos" />
    </MuiCard>

    <BizShareItem icon="i-ion-ios-person-outline" title="Face" description="Done"
      :close-button="{ icon: 'i-ion-checkmark-circle-outline', color: 'blue', variant: 'ghost', padded: false, trailing: true }" />

    <MuiCard>
      <BizShareListInfoVertical heading="Other information" :infos="infosOther" />
    </MuiCard>

    <MuiCard>
      <BizShareSessionTitle label="Photo information" />
      <BizShareSessionTitle label="Done" />

      <div class="text-center mx-auto">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbljcpCDwyPVXVwrripLlqC8WhhFpbSBU6uw&s"
          class="mx-auto mb-2" />
      </div>
      <UDivider />

      <div class="text-center mx-auto">
        <img src="https://itp1.itopfile.com/ImageServer/itp_07012020xxui/555/0/176570z-z1206503635557.jpg"
          class="mx-auto" />
      </div>
    </MuiCard>

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <BizShareSessionTitle label="ส่งข้อมูลเรียบร้อยแล้ว" />
          <BizShareSessionTitle label="กรุณารอผลการตรวจสอบ" />
          <UButton color="red" class="-my-1" @click="navigate()">ปิด</UButton>
        </template>

        <Placeholder class="h-32" />
      </UCard>
    </UModal>
  </MuiPage>

  <BizShareManaForm>
    <ActionButton text="Confirm" @click="isOpen = true" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { ActionButton,getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();

const isOpen = ref(false);
const navigate = async() => {
  isOpen.value = false
  // navigateTo('/kyc/main', { replace: true })
  await goVisit('kyc', 'kyc-main', '')

}
const infos: any[] = [
  { label: "Frist name", value: "Mr. john" },
  { label: "Last name", value: "doe" },
  { label: "date of birth", value: "05/01/2530" },
  { label: "Id No.", value: "0123456789012" },
  { label: "nationality", value: "Burmese" },
  { label: "Address", value: "No.3, 56th Street Quarter (7), Hlaing Township 11051 YangonMyanmar" }
];


const infosOther: any[] = [
  { label: "Address in thailand", value: "999 Soi Mu Ban Nakhon Thong 1, Nongprue, Bang Phli, Samut Prakan, Thailand.Note Foreinger apartment" },
  { label: "Please check your phone number", value: "0336663236" }
];

</script>