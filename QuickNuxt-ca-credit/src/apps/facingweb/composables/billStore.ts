import { defineStore } from "pinia";
import { getManaContext } from "@manaapp/ui";

export const useBillStore = defineStore('billStore', () => {
  const subscriptionId = "withdraw";
  const subscriptionIdNewBill = "bill";

  var rspUrl = ref("");
  const { data: databill, error, pending, execute: executeGet } = useMFetch<any>(rspUrl, { method: "GET", headers: { "Accept": "application/json" } });

  async function getData(pathParam: string) {
    const lib = await getManaContext();
    rspUrl.value = lib.getUrl(`api/subscriptions/${subscriptionId}/contracts/default/${pathParam}`);
    await executeGet();
  }

  async function getDataNewBill(pathParam: string) {
    const lib = await getManaContext();
    rspUrl.value = lib.getUrl(`api/subscriptions/${subscriptionIdNewBill}/contracts/default/${pathParam}`);
    await executeGet();
  }

  const databillNew = ref({
    "listwallets": {
      "logoPath": "",
      "balance": {
        "amountUnit": 64000,
        "currency": "THB"
      },
      "userId": "623987617955841",
      "logoHost": "",
      "createdDate": "2024-12-24T03:13:54.6725357Z",
      "_id": "zcq6xrjmxjsw0sl440rf",
      "walletName": "MyWallet"
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
      "deliveryLogoHost": "icon",
      "deliveryLogoPath": "i-material-symbols-light-delivery-truck-speed-outline",
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
    "wallet": {
      "profileImagePath": "/images/dfprofile.png",
      "fullName": "Polo",
      "id": "UserInfo:yor8ol6uhbpbs3vnkc8s",
      "profileImageHost": "manadevmaster.blob.core.windows.net",
      "mobileNumber": "taninpong.ch.56@ubu.ac.th",
      "mrid": "623987617955841",
      "email": "aninpong.ch.56@ubu.ac.th",
      "userId": "623987617955841",
      "createdDate": "2024-12-24T03:13:54.7724728Z"
    }
  });

  const databillNew2 = ref({
    "listwallets": {
      "logoPath": "",
      "balance": {
        "amountUnit": 64000,
        "currency": "THB"
      },
      "userId": "623987617955841",
      "logoHost": "",
      "createdDate": "2024-12-24T03:13:54.6725357Z",
      "_id": "zcq6xrjmxjsw0sl440rf",
      "walletName": "MyWallet"
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
      "shippingcost": null,
      "deliveryName": "WIF CAFE",
      "deliveryLogoHost": "icon",
      "deliveryLogoPath": "i-material-symbols-light-delivery-truck-speed-outline",
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
    "wallet": {
      "profileImagePath": "/images/dfprofile.png",
      "fullName": "Polo",
      "id": "UserInfo:yor8ol6uhbpbs3vnkc8s",
      "profileImageHost": "manadevmaster.blob.core.windows.net",
      "mobileNumber": "taninpong.ch.56@ubu.ac.th",
      "mrid": "623987617955841",
      "email": "aninpong.ch.56@ubu.ac.th",
      "userId": "623987617955841",
      "createdDate": "2024-12-24T03:13:54.7724728Z"
    }
  });


  return {
    databill, getData, pending, databillNew, databillNew2, getDataNewBill
  }
})