<template>
  <MuiPage>
    <MuiHeader title="บัญชีบริหารเงินของคุณ" />

    <MuiCard class="text-center bg-blue-600 dark:bg-blue-600">
      <UFormGroup :ui="{ hint: 'text-white' }" label=" " hint="เปลี่ยนรูปภาพ">
      </UFormGroup>
      <UFormGroup :ui="{ hint: { base: 'text-white' } }" hint="Optional">
      </UFormGroup>
      <!-- TODO: Use party hero -->
      <div class="text-center mx-auto">
        <BizShareImage src="https://failfast.blob.core.windows.net/easy/ba/assets/default-ba.png" size="3xl" class="mx-auto mb-2" />
        <p class="font-semibold text-white">เปลี่ยนรูปภาพ</p>
      </div>
    </MuiCard>
    <BizShareItemLink title="Food Prada" right-text="แก้ไข" @on-tapped="clickme" />
    <BizShareItemLink title="#asd852" right-text="แก้ไข" @on-tapped="clickme" />
    <BizShareItemLink title="สถานที่ตั้ง" @on-tapped="clickme" />
    <BizShareItemLink title="เวลาทำการ" @on-tapped="clickme" />
    <!-- TODO: BizShareItemLink -->
    <BizShareItem @on-tapped="onClickKym" title="การยืนยันตัวตนธุรกิจ" description="การระบุตัวตนที่ใช้ในการทำธุรกรรม"
    :close-button="{ label: 'ยังไม่ทำ', icon: 'i-material-symbols-light-arrow-forward-ios-rounded', color: 'red', variant: 'ghost', padded: false, trailing: true}"/>
    <!-- <BizShareItemLink title="การยืนยันตัวตนธุรกิจ" description="การระบุตัวตนที่ใช้ในการทำธุรกรรม" @on-tapped="clickme" /> -->
    <BizShareItemLink title="สัญญา" @on-tapped="clickme" />
  </MuiPage>
</template>

<script setup lang="ts">
const { goVisit } = useManaService();

const onClickKym = async () => {
  await goVisit("kym", "ba-verification", "ba-verification");
} 
const clickme = () => {
}
</script>
