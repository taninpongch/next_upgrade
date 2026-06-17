<template>
  <MuiPage>
    <!-- <div v-if="pending">
      <BizShareSkeletonList />
    </div> -->
    <!-- <div v-else> -->
      <MuiHeader title="Bill Result" />
      <BizBillResult :data="databill" />
    <!-- </div> -->
  </MuiPage>
</template>

<script setup lang="ts">
const databill = ref({
  "wallet": {
    "id": "637849861493678570",
    "displayName": "นาง อาภาภรณ์ จารุธนเศรษฐ์",
    "walletName": "Mana WalletX",
    "logo": "",
    "balance": {
      "currency": "THB",
      "amountUnit": 1500000
    }
  },
  "session": {
    "id": "638120554091000121",
    "fromId": "001",
    "fromType": "Bank",
    "fromName": "กระเป๋าของฉัน",
    "fromSubName": "",
    "fromLogoHost": "failfast.blob.core.windows.net",
    "fromLogoPath": "easy/bank-account/assets/ktb.png",
    "fromAccountNo": "1122334455",
    "fromAccountName": "กระเป๋าของฉัน",
    "toId": "002",
    "toType": "PP",
    "toName": "Food Prada",
    "toSubName": "",
    "toLogoHost": "failfast.blob.core.windows.net",
    "toLogoPath": "easy/ba/assets/default-ba.png",
    "toAccountNo": "9999988877",
    "toAccountName": "Food Prada",
    "amount": {
      "currency": "THB",
      "amountUnit": 500000
    },
    "fee": {
      "currency": "THB",
      "amountUnit": 0
    },
    "discount": {
      "currency": "THB",
      "amountUnit": 0
    },
    "totalAmount": {
      "currency": "THB",
      "amountUnit": 500000
    },
    "exchangeAmount": {
      "currency": "THB",
      "amountUnit": 0
    },
    "rateRequest": null,
    "rate": null,
    "refs": [
      // {
      //   "name": "เลขพร้อมเพย์",
      //   "value": "0123456789"
      // },
      // {
      //   "name": "testความยาว",
      //   "value": "0123456789012345678901234567777777ดหดหดหดฟหดฤฆฤ"
      // }
    ],
    "remark": "",
    "createDate": "2023-04-18T09:41:42.179Z",
    "requestDate": null,
    "executeDate": null,
    "destinationFee": null,
    "rateDisplay": null,
    "refCode": "UNK813264",
    "txType": "AdhocDeposit",
    "actionDate": "2023-04-18T09:41:42.179Z",
    "qrCode": "https://s.manal.ink/np/nwltbil-",
    "qrUrlHostFqdn": "mcproxy-devd.onmana.space",
    "qrUrlPath": "qr/url?url=s.manal.ink/np/nwltbil-&scheme=https",
    "shareUrlHostFqdn": "sharemlink.azurewebsites.net",
    "shareUrlPath": "?uri=https://xmunilink-devd.onmana.space/"
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
  ]
})

</script>