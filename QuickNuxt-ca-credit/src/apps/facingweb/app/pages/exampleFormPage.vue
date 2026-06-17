<template>
  <!-- *หมายเหตุ ถ้าเป็นหน้า Dialog ไม่ต้องใส่ <MuiHeader/> -->
  <MuiPage>
    <MuiHeader title="Topup page" />
    <BizShareManaForm>
      <BizFinancialAmountWalletTransferBankPPay destinationHeading="กระเป๋าที่เติมเข้า"
        destinationSrc="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" destinationTitle="My Wallet"
        originHeading="บัญชีที่ใช้เติม" originSrc="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux"
        originTitle="บัญชีของฉัน" originDescription="****56789" headingAmount="จำนวนเงิน"
        placeholderAmount="ระบุยอดเงิน" />
      <BizShareActionSubmit />
    </BizShareManaForm>
  </MuiPage>
</template>