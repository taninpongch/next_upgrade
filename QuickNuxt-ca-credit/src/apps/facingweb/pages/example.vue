<template>
  <MuiPage>
    <p class="title">🍀 Share</p>
    <p class="subtitle">• AddressInfo</p>
    <BizShareSessionTitle label="กรุณากรอกที่อยู่ให้ถูกต้อง" />
    <BizShareAddressInfo :models="dataForm" />
    <BizShareSessionTitle label="กรุณากรอกที่อยู่ให้ถูกต้อง"
      :button="{ icon: 'i-ion-american-football-sharp', label: 'คัดลอกข้อมูลจากบัตร' }" @on-tapped="clickme" />
    <BizShareAddressInfo :models="dataForm" />

    <p class="subtitle">• Agreement</p>
    <BizShareAgreement title="มานะ แอพพริเคชัน" src="https://placehold.co/600x600.png" :paragraph="text" />

    <p class="subtitle">• ActionConsent</p>
    <BizShareActionConsent @on-tapped="callback" />

    <p class="subtitle">• ActionDialog</p>
    <BizShareActionDialog @on-tapped="clickme" />

    <p class="subtitle">• ActionDialogConfirm</p>
    <BizShareActionDialogConfirm @on-tapped="callback" />

    <p class="subtitle">• ActionLink</p>
    <BizShareActionLink icon="heroicons-solid:share" label="รายละเอียดธุรกรรม" @on-tapped="clickme" />

    <p class="subtitle">• ActionNormal</p>
    <BizShareActionNormal label="ตกลง" disabled @on-tapped="clickme" />
    <BizShareActionNormal icon="i-ph-camera-fill" label="เปิดกล้องของคุณ" @on-tapped="clickme" />
    <BizShareActionNormal icon="i-ph-camera-fill" :rounded="true" @on-tapped="clickme" />
    <BizShareActionNormal icon="i-ph-camera-fill" :blocked="false" :rounded="true" @on-tapped="clickme" />

    <p class="subtitle">• ActionSubmit</p>
    <BizShareManaForm :state="initData" @submit="clickme">
      <BizShareActionSubmit />
    </BizShareManaForm>

    <p class="subtitle">• ActionEmpty</p>
    <BizShareActionEmpty src="https://placehold.co/600x400.png" title="คุณยังไม่มีบัญชี"
      subtitle="กรุณาสร้างบัญชีใหม่เพื่อผูกกับ mana" button-text="สร้างบัญชีใหม่" @on-tapped="clickme" />

    <p class="subtitle">• Image</p>
    <BizShareImage size="4xl" src="https://avatars.githubusercontent.com/u/739984?v=4" />
    <BizShareImage size="3xl" src="https://avatars.githubusercontent.com/u/739984?v=4" />
    <BizShareImage size="2xl" src="https://avatars.githubusercontent.com/u/739984?v=4" />
    <BizShareImage size="md" src="https://avatars.githubusercontent.com/u/739984?v=4" />
    <BizShareImage size="sm" src="https://avatars.githubusercontent.com/u/739984?v=4" />
    <BizShareImage size="2xs" src="https://avatars.githubusercontent.com/u/739984?v=4" />

    <BizShareImage size="4xl" src="https://avatars.githubusercontent.com/u/739984?v=4" :rounded="false" />
    <BizShareImage size="3xl" src="https://avatars.githubusercontent.com/u/739984?v=4" :rounded="false" />
    <BizShareImage size="2xl" src="https://avatars.githubusercontent.com/u/739984?v=4" :rounded="false" />
    <BizShareImage size="md" src="https://avatars.githubusercontent.com/u/739984?v=4" :rounded="false" />
    <BizShareImage size="sm" src="https://avatars.githubusercontent.com/u/739984?v=4" :rounded="false" />
    <BizShareImage size="2xs" src="https://avatars.githubusercontent.com/u/739984?v=4" :rounded="false" />

    <BizShareImage size="3xl" src="i-heroicons-building-library-solid" />
    <BizShareImage size="2xl" src="i-heroicons-building-library-solid" />
    <BizShareImage size="md" src="i-heroicons-building-library-solid" />
    <BizShareImage size="sm" src="i-heroicons-building-library-solid" />
    <BizShareImage size="2xs" src="i-heroicons-building-library-solid" />

    <p class="subtitle">• Item</p>
    <BizShareItem title="บัญชีของฉัน" src="https://avatars.githubusercontent.com/u/739984?v=4" description="****123456"
      @on-tapped="clickme" />
    <BizShareItem title="บัญชีของฉัน" src="i-heroicons-command-line" description="****123456" @on-tapped="clickme" />
    <BizShareItem title="บัญชีของฉัน" description="****123456" @on-tapped="clickme" />
    <BizShareItem title="บัญชีของฉัน" src="https://avatars.githubusercontent.com/u/739984?v=4" description="****123456"
      :transparent="true" @on-tapped="clickme" />
    <BizShareItem title="บัญชีของฉัน" src="i-heroicons-command-line" description="****123456" :transparent="true"
      @on-tapped="clickme" />
    <BizShareItem title="บัญชีของฉัน" description="****123456" :transparent="true" @on-tapped="clickme" />

    <p class="subtitle">• ItemLink</p>
    <BizShareItemLink title="ที่อยู่ตามบัตรประชาชน" src="https://avatars.githubusercontent.com/u/739984?v=4"
      description="คุณยังไม่ระบุ" @on-tapped="clickme" />
    <BizShareItemLink title="ที่อยู่ตามบัตรประชาชน" src="i-heroicons-command-line" description="คุณยังไม่ระบุ"
      @on-tapped="clickme" />
    <BizShareItemLink title="ที่อยู่ตามบัตรประชาชน" description="คุณยังไม่ระบุ" @on-tapped="clickme" />
    <BizShareItemLink title="ที่อยู่ตามบัตรประชาชน" src="https://avatars.githubusercontent.com/u/739984?v=4"
      description="คุณยังไม่ระบุ" rightText="ยังไม่ทำ!" :transparent="true" @on-tapped="clickme" />
    <BizShareItemLink title="ที่อยู่ตามบัตรประชาชน" src="i-heroicons-command-line" description="คุณยังไม่ระบุ"
      rightText="ทำแล้ว" :transparent="true" @on-tapped="clickme" right-color="blue" />
    <BizShareItemLink title="ที่อยู่ตามบัตรประชาชน" description="คุณยังไม่ระบุ" rightText="ยังไม่ทำ!"
      :transparent="true" @on-tapped="clickme" right-color="red" />

    <p class="subtitle">• ItemStatus</p>
    <BizShareItemStatus title="การยืนยันข้อมูล" src="https://avatars.githubusercontent.com/u/739984?v=4"
      rightText="รออนุมัติ" @on-tapped="clickme" />
    <BizShareItemStatus title="การยืนยันข้อมูล" src="i-heroicons-command-line" rightText="รออนุมัติ"
      @on-tapped="clickme" />
    <BizShareItemStatus title="การยืนยันข้อมูล" rightText="รออนุมัติ" @on-tapped="clickme" />
    <BizShareItemStatus title="การยืนยันข้อมูล" src="https://avatars.githubusercontent.com/u/739984?v=4"
      rightText="รออนุมัติ" :transparent="true" @on-tapped="clickme" />
    <BizShareItemStatus title="การยืนยันข้อมูล" src="i-heroicons-command-line" rightText="รออนุมัติ" :transparent="true"
      @on-tapped="clickme" right-color="blue" />
    <BizShareItemStatus title="การยืนยันข้อมูล" rightText="รออนุมัติ" :transparent="true" @on-tapped="clickme"
      right-color="red" />

    <p class="subtitle">• ItemInfo</p>
    <MuiCard>
      <BizShareItemInfo heading="กระเป๋าที่เติมเข้า" src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
        title="My Wallet" description="***123456" />
    </MuiCard>
    <MuiCard>
      <BizShareItemInfo heading="กระเป๋าที่เติมเข้า" src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
        title="My Wallet" />
    </MuiCard>
    <MuiCard>
      <BizShareItemInfo heading="คูปอง" src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
        title="x30 คูปองส่วนลด 50 % delivery Solar" />
    </MuiCard>

    <p class="subtitle">• InputCheckbox</p>
    <BizShareInputCheckbox heading="ผู้ที่ถูกแต่งตั้งเป็นโอเปอเรเตอร์" text-checkbox="เลือกทั้งหมด"
      v-model="bind_checkbox" />
    <UDivider />
    <BizShareInputCheckbox text-checkbox="นาย Z" v-model="bind_checkbox" />
    <BizShareInputCheckbox text-checkbox="นาย a" disabled v-model="bind_checkbox" />

    <p class="subtitle">• InputCurrency</p>
    <BizShareInputCurrency label="จำนวนเงิน" placeholder="กรุณาระบุยอดเงิน" currency="USD" v-model="bind_currency" />
    <BizShareInputCurrency label="จำนวนเงิน" placeholder="กรุณาระบุยอดเงิน" currency="USD" disabled
      v-model="bind_currency" />

    <p class="subtitle">• InputDate</p>
    <BizShareInputDate label="วัน/เดือน/ปี" placeholder="วันเดือนปีตามบัตร" v-model="bind_date" />
    <BizShareInputDate label="วัน/เดือน/ปี" placeholder="วันเดือนปีตามบัตร" disabled v-model="bind_date" />

    <p class="subtitle">• InputNote</p>
    <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" v-model="bind_note" />
    <BizShareInputNote label="หมายเหตุ" placeholder="กรุณาระบุ" hint="Optional" disabled v-model="bind_note" />

    <p class="subtitle">• InputSelect</p>
    <BizShareInputSelect label="รูปแบบ" placeholder="กรุณาเลือก"
      :options="[{ name: 'เบอร์โทรศัพท์', value: 'phone' }, { name: 'เลขบัตรประชาชน', value: 'pid' }]"
      v-model="bind_select" />
    <BizShareInputSelect label="รูปแบบ" placeholder="กรุณาเลือก"
      :options="[{ name: 'เบอร์โทรศัพท์', value: 'phone' }, { name: 'เลขบัตรประชาชน', value: 'pid' }]" disabled
      v-model="bind_select" />

    <p class="subtitle">• InputText</p>
    <BizShareInputText label="เลขพร้อมเพย์" placeholder="เช่น 0911234567" inputMode="numeric" v-model="bind_text" />
    <BizShareInputText label="เลขพร้อมเพย์" placeholder="เช่น 0911234567" inputMode="numeric" disabled
      v-model="bind_text" />

    <p class="subtitle">• InputUploadFile</p>
    <BizShareInputUploadFile src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=" label="โลโก้ธุรกิจของคุณ" v-model="bind_text"
    @on-tapped="clicked" />
    <BizShareInputUploadFile src="https://failfast.blob.core.windows.net/mcontent-imgs/defaults/dfshop.png" label="รูปถ่ายร้าน" size="custom" :rounded="false"
    v-model="bind_text" @on-tapped="clicked" />
    <BizShareInputUploadFile label="อัพโหลดไฟล์" v-model="bind_text" @on-tapped="clicked" />

    <p class="subtitle">• ListInfoHorizontal</p>
    <BizShareListInfoHorizontal heading="ข้อมูลบัญชี" :infos="bankinfo" />

    <p class="subtitle">• ListInfoVertical</p>
    <BizShareListInfoVertical heading="ข้อมูลบัญชี" :infos="bankinfo" />

    <p class="subtitle">• PartyHero</p>
    <BizShareSessionTitle label="Image" />
    <BizSharePartyHero src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="อานนท์ บางสาน" />
    <BizSharePartyHero src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="อานนท์ บางสาน"
      subtitle="Anon Bangsan" />
    <BizSharePartyHero src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="ยอดเงินคงเหลือ"
      subtitle="100.00 THB" pattern="2" />
    <BizSharePartyHero src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="Food Prada"
      subtitle="รอการตรวจสอบข้อมูลขั้นสูง..." pattern="3" />
    <BizSharePartyHero src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="Food Prada"
      subtitle="ยืนยันตัวตนขั้นพื้นฐาน" icon-subtitle="i-material-symbols-light-check-circle-outline" pattern="4" />

    <BizShareSessionTitle label="Icon" />
    <BizSharePartyHero src="i-material-symbols-light-outbox-rounded" subtitle="100.00 THB" pattern="3" />

    <p class="subtitle">• Text</p>
    <BizShareText text="ข้อความ" />
    <BizShareText text="ข้อความตัวหนา" :is-bold="true" />
    <BizShareText text="ข้อความสี" color="blue" />
    <BizShareText icon="i-material-symbols-light-check-circle-outline" text="ข้อความมี Icon" />
    <BizShareText icon="i-material-symbols-light-check-circle-outline" text="ข้อความตัวหนามี Icon" :is-bold="true" />
    <BizShareText icon="i-material-symbols-light-check-circle-outline" text="ข้อความสีมี Icon" color="blue" />

    <BizShareText text="ข้อความชิดซ้าย" color="orange" alignment="left" />
    <BizShareText text="ข้อความตรงกลาง" color="green" alignment="center" />
    <BizShareText text="ข้อความชิดขวา" color="red" alignment="right" />

    <BizShareText text="ข้อความยาวมากๆ และไม่ได้กำหนดใดๆ ดังนั้น ตรงส่วนนี้ควรจะขึ้นบรรทัดใหม่ได้แล้วนะ" />
    <BizShareText
      text="ข้อความยาวมากๆ แต่กำหนดให้แสดง '...' แทนที่ล้นเกิน ดังนั้น ตรงส่วนนี้ไม่ควรจะเห็นข้อความได้แล้วนะ ยกเว้นว่าหน้าจอใหญ่มากๆ"
      :is-truncate="true" />

    <p class="subtitle">• SessionTitle</p>
    <BizShareSessionTitle label="เลือกบัญชีที่ผูกไว้" />
    <BizShareSessionTitle label="เลือกบัญชีที่ผูกไว้" :button="{ icon: 'i-heroicons-plus-16-solid', label: 'เพิ่ม' }"
      @on-tapped="clickme" />

    <h2 class="font-semibold text-4xl bg-gray-200">ItemText</h2>
    <MuiCard>
      <BizShareItemText title="สถานะของคุณ" subtitle="เชื่อมบัญชีสำเร็จแล้ว">
      </BizShareItemText>
    </MuiCard>
    <MuiCard>
      <BizShareItemText title="สถานะของคุณ start" textalign="start" subtitle="เชื่อมบัญชีสำเร็จแล้ว">
      </BizShareItemText>
    </MuiCard>
    <MuiCard>
      <BizShareItemText title="สถานะของคุณ end" textalign="end" subtitle="เชื่อมบัญชีสำเร็จแล้ว">
      </BizShareItemText>
    </MuiCard>

    <UProgress color="red" :value="100" />
    <h2 class="font-semibold text-4xl bg-red-200 text-center">Bill</h2>
    <UProgress color="red" :value="100" />
    <p class="subtitle">• ItemWalletChange</p>
    <MuiCard>
      <BizShareItemWalletChange src="i-ion-wallet-outline" heading="เลือกกระเป๋า" title="wallet X"
        :button="{ icon: 'i-material-symbols-light-repeat', label: '' }" rightText="10.00 THB" @on-tapped="clickme" />
    </MuiCard>
    <MuiCard>
      <BizShareItemWalletChange src="i-ion-wallet-outline" heading="เลือกกระเป๋าที่ใช้รับเงิน" title="กระเป๋าของฉัน"
        rightText="เปลี่ยน" @on-tapped="clickme" />
    </MuiCard>

    <p class="subtitle">• TransferDetail</p>
    <BizShareTransferDetail srcDest="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" titleDest="My Walletถอน"
      :detailOrigin="detailOrigin"
      :amount="{ src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux', title: '200.00 THB', subtitle: '' }"
      heading-top="กระเป๋าที่ถอน" heading-middle="บัญชีที่ถอนออก" heading-bottom="จำนวนที่ต้องการถอน" />

    <p class="subtitle">• ListItem</p>
    <BizShareListItem heading="บัญชีของคุณ" :data="myAccount"
      :button="{ icon: 'i-heroicons-plus-16-solid', label: 'เพิ่ม' }" @on-tapped="clicked" @on-select-item="clickme" />
    <BizShareListItem heading="เลือกบัญชีที่ผูกไว้" :data="myAccount" @on-select-item="clickme" />

    <p class="title">😬 Bill</p>
    <p class="subtitle">• BillInfo</p>
    <BizBillShareBillInfo :src="`https://${data?.session?.qrUrlHostFqdn}/${data?.session?.qrUrlPath}`"
      :linkRef="linkRef" :linkMore="linkMore" :descriptionRemark="data.session.remark" />

    <p class="subtitle">• UserTransfer</p>
    <BizBillShareUserTransfer :data="data" />

    <p class="subtitle">• UserTransferInfo</p>
    <BizBillShareUserTransferInfo :data="data" />

    <p class="title">😒 Financial</p>
    <p class="subtitle">• BankList</p>
    <BizFinancialShareBankList heading="เลือกธนาคาร" :data="bankList" />

    <p class="subtitle">• DeactAccount</p>
    <BizFinancialShareDeactAccount />

    <p class="subtitle">• PartyEdition</p>
    <BizFinancialSharePartyEdition src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="100.00 THB" />

    <p class="subtitle">• AmountWalletTransferBankPPay</p>
    <BizFinancialAmountWalletTransferBankPPay destinationSrc="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
      destinationTitle="My Wallet" originSrc="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
      originTitle="บัญชีของฉัน" originDescription="****56789" :models="ref()" />

    <p class="subtitle">• DetailWalletTransferBankPPay</p>
    <BizFinancialDetailWalletTransferBankPPay srcDest="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
      titleDest="My WalletBank-ppay" :detailOrigin="detailOrigin"
      :amount="{ src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux', title: '200.00 THB', subtitle: '' }" />

    <p class="subtitle">• DetailWalletTransferQr</p>
    <BizFinancialDetailWalletTransferQr srcDest="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
      titleDest="My WalletQr"
      :amount="{ src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux', title: '200.00 THB', subtitle: '' }"
      descriptionRemark="ลองเติมเงินเล่นดูว่ามานะสามารถเติมเงินจากธนาคารอื่นเข้ามาได้หรือไม่" />

    <p class="title">🤣 Home</p>
    <p class="subtitle">• ShortcutMenu</p>
    <BizHomeShortcutMenu :data="shortcutItems" @on-tapped="callback" />

    <p class="subtitle">• Feed</p>
    <BizHomeFeedMenu :data="feedItems" @on-tapped="callback" />

  </MuiPage>
  <!-- <ActionButton text="myText"></ActionButton> -->
</template>

<style scoped>
.title {
  @apply font-semibold text-4xl -m-4 p-4 bg-yellow-100 dark:bg-yellow-200 text-green-500 dark:text-green-600;
}

.subtitle {
  @apply font-semibold text-xl -m-4 p-2 pl-4 bg-blue-100 dark:bg-blue-200 text-blue-400 dark:text-blue-500;
}
</style>

<script setup lang="ts">
// import { useVuelidate } from '@vuelidate/core';
// import { getManaContext, ActionButton } from "@manaapp/ui";
// const lib = await getManaContext();
// var xj = lib.getUrl("x", "y");
// console.log(xj);

const initData = reactive({
  addressCode: "",
  address: "",
  subDistrict: "",
  district: "",
  province: "",
  note: "",
});

const validationRules = {
  addressCode: {},
  address: {},
  subDistrict: {},
  district: {},
  province: {},
  note: {},
};

const dataForm = ref(initData);
// const form = useVuelidate(validationRules, dataForm.value);
const toast = useToast()
const clickme = () => { toast.add({ title: 'คัดลอกสำเร็จ' }) };

// BizShareAgreement
const text = `Contrary to popular belief, 
Lorem Ipsum is not simply random text.
It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;

// BizShareListInfoHorizontal & BizShareListInfoVertical
const bankinfo: any[] = [
  { label: "ชื่อเรียก", value: "ธนาคารของฉัน" },
  { label: "ธนาคาร", value: "กรุงไทย" },
  { label: "เลขบัญชี", value: "****58795421" },
  { label: "ประเภท", value: "บัญชีธนาคาร" },
  { label: "ที่อยู่", value: "989/417 พิมานคอนโดปาร์ค อาคาร 2 หลังมหาวิทยาลัยขอนแก่น ตำบลศิลา อำเภอเมือง จังหวัดขอนแก่น 40000" }
];

// BizShareFormCard
const clicked = () => { alert("hello world!") };

//BizShareBillInfo
const data = ref<any>({
  "wallet": {
    "id": "637849861493678570",
    "displayName": "นาง อาภาภรณ์ จารุธนเศรษฐ์",
    "walletName": "Mana WalletX",
    "logo": "",
    "balance": {
      "currency": "THB",
      "amountUnit": 45000
    }
  },
  "session": {
    "toName": "Polo",
    "fromSubName": "",
    "refs": [],
    "qrCode": "https://s.manal.ink/np/nwltbil-638754713149578915",
    "fee": {
      "amountUnit": 0,
      "currency": "THB"
    },
    "createdDate": "2025-02-18T10:30:17.327233Z",
    "remark": "",
    "toSubName": "",
    "totalAmount": {
      "amountUnit": 4000,
      "currency": "THB"
    },
    "amount": {
      "amountUnit": 4000,
      "currency": "THB"
    },
    "shippingcost": {
      "amountUnit": 5000,
      "currency": "THB"
    },
    "deliveryName": "WIF CAFE",
    "addressShipping": "WIF CAFE",
    "orderMenus": [{
      "name": "ไทยโน่",
      "amount": {
        "amountUnit": 55000,
        "currency": "THB"
      },
      "option": "ไม่หวาน",
      "note": "คั่วอ่อน"
    }]
    ,
    "qrUrlHostFqdn": "failfast.blob.core.windows.net",
    "shareUrlHostFqdn": "sharemlink.azurewebsites.net",
    "fromLogoPath": "",
    "qrUrlPath": "/upload/qrexam.png",
    "fromName": "MyWallet",
    "shareUrlPath": "?uri=https://xmunilink-devd.onmana.space/",
    "coupon": [],
    "fromLogoHost": "",
    "exchangeAmount": {
      "amountUnit": 0,
      "currency": "THB"
    },
    "toLogoPath": "/images/dfprofile.png",
    "actionDate": "2025-02-18T10:30:17.327233Z",
    "refCode": "czgqpca",
    "discount": {
      "amountUnit": 0,
      "currency": "THB"
    },
    "toLogoHost": "manadevmaster.blob.core.windows.net"
  },
  "listWallet": [
    {
      "id": "0001",
      "logoHost": "failfast.blob.core.windows.net",
      "logoPath": "easy/bank-account/assets/prompt.svg",
      "accountNo": "****48621793",
      "accountName": "บัญชีของฉัน",
      "type": "ppay"
    },
    {
      "id": "0002",
      "logoHost": "failfast.blob.core.windows.net",
      "logoPath": "easy/bank-account/assets/ktb.png",
      "accountNo": "****951357",
      "accountName": "กรุงไทย",
      "type": "bank"
    }
  ],
  // Hack: แปลง session.amount ให้เป็น arry
  "txsummary": [
    { description: 'จำนวนเงิน', value: "10,000.00 THB" },
    { description: 'ค่าธรรมเนียม', value: "50.00 THB" },
    { description: 'ส่วนลด', value: "20.00 THB" },
    { description: 'รวมทั้งหมด', value: "10,030.00 THB" }
  ]
}
)
const linkRef = [{
  label: 'รหัสอ้างอิง',
  value: data.value.session.refCode,
}, {
  label: 'วันที่',
  value: data.value.session.createDate,
}]

const linkMore = data.value.session.refs
// const xxx = [{
//   label: '',
//   value: ''
// }];
// data.value.session.refs.forEach((element, index) => {
//   xxx[index].label = element.name;
//   xxx[index].value = element.value;
// });

// BizShareListItem
const myAccount = [{
  src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux",
  title: 'บัญชีของฉัน2',
  description: '****56789',
  path: "/aurora/m4"
},
{
  src: "https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux",
  title: 'เงินเดือน',
  description: '****56789',
  path: "/aurora/m4"
}]

// DetailWalletTransferBankPPay
const detailOrigin = [
  { label: "เลขบัญชี", value: "****1234" },
  { label: "ประเภท", value: "บัญชีธนาคาร" },
  { label: "ชื่อบัญชี", value: "อานนท์ บางสาน วอชิงตัน(Arnon Bangsan washington)" },
  { label: " ", value: "(Arnon Bangsan washington)" }
]

// BizHomeShareShortcutMenu
const shortcutItems = [
  { name: 'Sébastien Chopin', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux', endpointUrl: "endp-shortcut1", noti: true },
  { name: 'Pooya Parsa', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0', endpointUrl: "endp-shortcut2", noti: true },
  { name: 'Daniel Roe', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe', endpointUrl: "endp-shortcut3" },
  { name: 'Anthony Fu', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu', endpointUrl: "endp-shortcut4", noti: true },
  { name: 'Sébastien Chopin', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux', endpointUrl: "endp-shortcut5" },
  { name: 'Pooya Parsa', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/pi0', endpointUrl: "endp-shortcut6" },
  { name: 'Daniel Roe', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/danielroe', endpointUrl: "endp-shortcut7" },
  { name: 'Anthony Fu', src: 'https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/antfu', endpointUrl: "endp-shortcut8" },
  { name: 'More', src: 'https://placehold.co/600x600.png?text=...', endpointUrl: "endp-shortcut9" }]

// BizHomeShareFeed
const feedItems = [
  { title: "Solar Delivery", src: "https://placehold.co/600x600.png?text=Solar", description: "คำขออนุมัติจ่ายเงินเดือนพนักงาน", expirationDate: "2 w", endpointUrl: "endp-feed1" },
  { title: "เติมเงิน", src: "https://placehold.co/600x600.png?text=Tx", description: "รอดำเนินการเติมเงิน", expirationDate: "9 d", endpointUrl: "endp-feed2" },
  { title: "ยืนยันตัวตน", src: "https://placehold.co/600x600.png?text=Tx", description: "รอดำเนินการตรวจสอบ", expirationDate: "7 d", endpointUrl: "endp-feed3" },
  { title: "Solar Delivery", src: "https://placehold.co/600x600.png?text=Solar", description: "กำลังส่งสินค้า", expirationDate: "2h", endpointUrl: "endp-feed4" }
]

const bankList = [
  { id: "01", src: "https://avatars.githubusercontent.com/u/739984?v=4", title: "กรุงเทพ", description: "BBL" },
  { id: "02", src: "https://avatars.githubusercontent.com/u/739984?v=4", title: "กสิกรไทย", description: "KBANK" },
  { id: "03", src: "https://avatars.githubusercontent.com/u/739984?v=4", title: "กรุงไทย", description: "KTB" },
  { id: "04", src: "https://avatars.githubusercontent.com/u/739984?v=4", title: "ทหารไทยธนชาติ", description: "TTB" },
  { id: "05", src: "https://avatars.githubusercontent.com/u/739984?v=4", title: "ไทยพาณิชย์", description: "SCB" },
  { id: "06", src: "https://avatars.githubusercontent.com/u/739984?v=4", title: "กรุงศรีอยุธยา", description: "BAY" },
  { id: "07", src: "https://avatars.githubusercontent.com/u/739984?v=4", title: "ออมสิน", description: "GSB" }
]

const callback = (value: any) => console.log(value);
const bind_checkbox = ref(false);
const bind_currency = ref("");
const bind_date = ref("");
const bind_note = ref("");
const bind_select = ref("");
const bind_text = ref("");

</script>