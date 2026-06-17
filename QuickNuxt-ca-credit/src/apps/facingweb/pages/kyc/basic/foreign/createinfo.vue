<template>
  <MuiPage>
    <MuiHeader title="KYC (basic)" />
    <MuiCard>
      <BizShareListInfoHorizontal heading="Personal information" :infos="infos" />
    </MuiCard>

    <BizShareSessionTitle label="Biometric authentication" />
    <BizShareItemLink
      title="Face"
      src="i-ion-ios-person-outline"
      description="Please enter a photo"
      @click="isOpen = true"
    />

    <BizShareSessionTitle label="Other infomation" />
    <MuiCard>
      <BizShareItemLink
        title="Address in thailand"
        description="Please enter a address"
        @click="navigate2()"
      />
      <BizShareItemLink
        title="Phone number"
        description="Please enter a phone number"
        @click="navigate3()"
      />
      <UDivider />
      <BizShareInputCheckbox text-checkbox="Remember my information" />
    </MuiCard>

    <BizShareSessionTitle
      label="Photo information (Additional documents)"
      @click="isOpen1 = true"
    />
    <MuiCard>
      <BizShareItemLink
        title="Photo information"
        src="i-ion-ios-bookmarks-outline"
        description="Please enter a photo"
        :transparent="true"
        @click="isOpen1 = true"
      />

      <div class="text-center mx-auto">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbljcpCDwyPVXVwrripLlqC8WhhFpbSBU6uw&s"
          class="mx-auto"
        />
        <p class="text-right py-2">delete</p>
        <UDivider />
      </div>

      <div v-if="deletephoto" class="text-center mx-auto">
        <img
          src="https://itp1.itopfile.com/ImageServer/itp_07012020xxui/555/0/176570z-z1206503635557.jpg"
          class="mx-auto"
        />
        <p class="text-right py-2" @click="isOpen2 = true">delete</p>
        <UDivider />
      </div>

      <BizShareSessionTitle label="Require 2 documents at least" />
      <BizShareSessionTitle :label="item.label" v-for="item in photoinfomations" />
    </MuiCard>
    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <BizShareSessionTitle label="เปิดกล้องสแกนหน้า" />
          <UButton color="red" class="-my-1" @click="isOpen = false">ปิด</UButton>
        </template>
        <Placeholder class="h-32" />
      </UCard>
    </UModal>

    <UModal v-model="isOpen1" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <BizShareSessionTitle label="เปิดกล้องถ่ายรูป" />
          <UButton color="red" class="-my-1" @click="add">ถ่าย</UButton>
        </template>
        <Placeholder class="h-32" />
      </UCard>
    </UModal>

    <UModal v-model="isOpen2" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <BizShareSessionTitle label="ต้องการลบรูป" />
          <UButton color="red" class="-my-1" @click="del">ลบ</UButton>
        </template>
        <Placeholder class="h-32" />
      </UCard>
    </UModal>
  </MuiPage>

  <BizShareManaForm>
    <ActionButton text="Next" @click="navigate()" />
  </BizShareManaForm>
</template>

<script setup lang="ts">
import { ActionButton, getManaContext } from "@manaapp/ui";

const manaLib = await getManaContext();
const { goVisit } = useManaService();

const isOpen = ref(false);
const isOpen1 = ref(false);
const isOpen2 = ref(false);

const deletephoto = ref(false);

const del = () => {
  isOpen2.value = false;
  deletephoto.value = false;
};

const add = () => {
  deletephoto.value = true;
  isOpen1.value = false;
};

const navigate = async () => {
  await goVisit("kyc", "kyc-basic-foreign-confirm", "");
};
const navigate2 = async () => {
  await goVisit("kyc", "kyc-basic-foreign-addressthai", "");
};
const navigate3 = async () => {
  await goVisit("kyc", "kyc-basic-foreign-verifyphone", "");
};
const infos: any[] = [
  { label: "Frist name", value: "Mr. john" },
  { label: "Last name", value: "doe" },
  { label: "date of birth", value: "05/01/2530" },
  { label: "Id No.", value: "0123456789012" },
  { label: "nationality", value: "Burmese" },
  {
    label: "Address",
    value: "No.3, 56th Street Quarter (7), Hlaing Township 11051 YangonMyanmar",
  },
];

const photoinfomations: any[] = [
  { label: "• ns.13" },
  { label: "• Work Permit" },
  { label: "• Non-Immigrant Visa" },
  { label: "• Smart Visa" },
  { label: "• Certificated of Identity" },
  { label: "• SWIFT Authenticate" },
  { label: "• Notary Public" },
];
</script>
