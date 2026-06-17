<template>
  <div></div>
</template>

<script setup lang="ts">

const endpointId = useRoute().query["endpointId"];
const flowId = useRoute().query["flow"];

const getPath = async (flowId: any) => {
  switch (flowId) {
    case "home-feeds": return "home/main"
      break;
    case "financial": return "financial/main"
      break;
    case "account-main": return "financial/accountManage/main"
      break;
    case "account-ppay-create": return "financial/accountManage/ppay/create"
      break;
    case "account-ppay-confirm": return "financial/accountManage/ppay/confirm"
      break;
    case "account-bank-create": return "financial/accountManage/bank/create"
      break;
    case "account-bank-confirm": return "financial/accountManage/bank/confirm"
      break;
    case "account-bank-info": return "financial/accountManage/bank/info"
      break;
    case "account-ppay-info": return "financial/accountManage/ppay/info"
      break;
    case "account-edit": return "financial/accountManage/edit"
      break;
    case "bank-select": return "financial/accountManage/bank/select"
      break;
    case "bank-create-type": return "financial/accountManage/type"
      break;
    // withdraw
    case "withdrawlist": return "financial/withdraw/main"
      break;
    case "withdraw-create": return "financial/withdraw/create"
      break;
    case "withdraw-confirm": return "financial/withdraw/confirm"
    // bill
    case "bill": return "bill/main"
      break;
    case "bill-detail": return "bill/detail"
      break;
    case "bill-result": return "bill/result"
      break;
    case "bill-result-cashadvance": return "bill/resultcashadvance"
      break;
    case "bill-transactionDetails": return "bill/transactionDetails"
      break;
    case "bill-receipt": return "bill/receipt"
      break;
    case "bill-grouptransactionDetails": return "bill/grouptransactionDetails"
      break;
    case "bill-employeelist": return "bill/employeelist"
      break;


    // wallet
    case "wallet-selected": return "financial/wallet/select"
      break;
    case "wallet-fiat-main": return "financial/wallet/fiat/main"
      break;
    case "wallet-credit-main": return "financial/wallet/credit/main"
      break;
    // todo:temp for show dlg comingsoon flow nexum
    case "temp-menu-comingsoon": return "financial/wallet/credit/tempDialogMenuComingsoon"
      break;
    case "wallet-credit-policy": return "financial/wallet/credit/policy"
      break;
    case "wallet-credit-contractCancelPolicy": return "financial/wallet/credit/contractCancelPolicy"
      break;
    case "wallet-credit-cashAdvance-create": return "financial/wallet/credit/cashAdvance/create"
      break;
    case "wallet-credit-cashAdvance-confirm": return "financial/wallet/credit/cashAdvance/confirm"
      break;
    case "wallet-select-dlg": return "financial/wallet/credit/cashAdvance/selectWallet"
      break;
    case "bill-delivery-result": return "bill/delivery/result"
      break;
    case "bill-delivery-transactionDetails": return "bill/delivery/transactionDetails"
      break;
    case "bill-delivery-receipt": return "bill/delivery/receipt"
      break;
    case "bill-delivery-refund": return "bill/delivery/refund"
      break;
    case "bill-financial-transactionDetails": return "bill/financial/transactionDetails"
      break;
    case "bill-financial-receipt": return "bill/financial/receipt"
      break;


    // txlog
    case "wallets-detail": return "financial/txLog/main"
      break;
    case "wallet-withdraw-detail": return "financial/txLog/withdrawDetail"
      break;
    case "wallet-deposit-detail": return "financial/txLog/depositDetail"
      break;
    case "wallet-payroll-detail": return "financial/txLog/payrollDetail"
      break;
    case "wallet-select": return "financial/txLog/walletSelect"
      break;
    case "transaction-list": return "financial/wallet/transactionlist"
      break;
    case "account-complete-ppay":
    case "account-complete-bank":
    case "wait-ppay-result":
    case "fail-ppay-dlg":
    case "confirm-ppay-dlg":
    // withdraw-dlg
    case "wait-withdraw-result":
    case "wait-transfer-result":
    case "confirm-withdraw-dlg":
    case "confirm-nexum-dlg":
    case "confirm-transfer-dlg":
    case "fail-withdraw-dlg":
    case "fail-topup-dlg":
    case "confirm-dlg":
    case "fail-transfer-dlg":
    case "fail-dlg":
    case "waiting-dlg":
    case "complete-dlg":
    case "confirm-cashadvance-dlg":
      return "resultDialog"
      break;
    case "gps-dlg": return "resultDialogGPS"
      break;

    // dialog delivery
    case "arrived-order": return "delivery/3rd/dialog/arrivedOrder"
      break;
    case "food-delivered-success": return "delivery/3rd/dialog/FoodDeliveredSuccess"
      break;
    case "reject-request-cancel-order": return "delivery/3rd/dialog/rejectRequestCancelOrder"
      break;
    case "cancel-order": return "delivery/3rd/dialog/cancelOrder"
      break;
    case "cancel-no-rider": return "delivery/3rd/dialog/cancelNoRider"
      break;
    case "confirm-request-cart": return "delivery/3rd/dialog/confirmRequestCart"
      break;
    case "confirm-change-restaurant": return "delivery/3rd/dialog/confirmChangeRestaurant"
      break;

    case "comingsoon-dialog": return "comingsoonDialog"
      break;
    case "success-topup-dlg": return "resultDialogtopup"
      break;
    case "topuplist": return "financial/topup/main"
      break;
    case "topup-create": return "financial/topup/account/create"
      break;
    case 'topup-confirm': return "financial/topup/account/confirm"
      break;
    case "topupqr-create": return "financial/topup/qr/create"
      break;
    case "topupqr-confirm": return "financial/topup/qr/confirm"
      break;
    case "topup-detail": return "financial/topup/completed"
      break;
    case "topup-bank-select": return "financial/topup/bankSelect"
      break;
    // case "topupppay-create": return "financial/topup/ppay/create"
    // break;
    // case "topupppay-confirm": return "financial/topup/ppay/confirm"
    // break;

    //transfer
    case "transfer-type": return "financial/transfer/type"
      break;
    case "transfer-ppay-number": return "financial/transfer/ppay/number"
      break;
    case "transfer-bank-number": return "financial/transfer/bank/number"
      break;
    case "transfer-create": return "financial/transfer/create"
      break;
    case "transfer-confirm": return "financial/transfer/confirm"
      break;

    // sidemenu-profile
    case "sidemenu-profile": return "sidemenu/profile"
      break;

    //contract
    case "delivery-link-consent-user": return "contract/delivery/linkAccount/consent/user"
      break;
    case "delivery-link-user-select": return "contract/delivery/linkAccount/consent/userSelect"
      break;
    case "delivery-link-announce-status": return "contract/delivery/linkAccount/announce/status"
      break;
    case "delivery-link-consent-shop": return "contract/delivery/linkAccount/consent/shop"
      break;
    case "delivery-link-shop-select": return "contract/delivery/linkAccount/consent/shopSelect"
      break;
    case "partnerships-delivery-consent-employee": return "contract/partnerships/delivery/consent/employee"
      break;
    case "partnerships-delivery-consent-employeeInfo": return "contract/partnerships/delivery/consent/employeeInfo"
      break;
    case "partnerships-delivery-consent-shop": return "contract/partnerships/delivery/consent/shop"
      break;
    case "partnerships-delivery-consent-shopSelect": return "contract/partnerships/delivery/consent/shopSelect"
      break;
    case "partnerships-delivery-consent-delivery": return "contract/partnerships/delivery/consent/delivery"
      break;
    case "ims-consent-shop": return "contract/ims/shop"
      break;
    case "ims-consent-shopSelect": return "contract/ims/shopSelect"
      break;
    case "nexum-consent-pa": return "contract/partnerships/nexum/consent/pa"
      break;
    case "nexum-announce-paStatus": return "contract/partnerships/nexum/announce/paStatus"
      break;
    case "nexum-consent-shop": return "contract/partnerships/nexum/consent/shop"
      break;
    case "nexum-consent-shopSelect": return "contract/partnerships/nexum/consent/shopSelect"
      break;
    case "nexum-announce-shopStatus": return "contract/partnerships/nexum/announce/shopStatus"
      break;
    case "nexum-consent-shopPolicy": return "contract/partnerships/nexum/consent/shopPolicy"
      break;
    case "nexum-announce-pa": return "contract/partnerships/nexum/announce/pa"
      break;
    case "nexum-announce-suspendedcredit": return "contract/partnerships/nexum/announce/suspendcredit"
      break;
    case "nexum-announce-unsuspendedcredit": return "contract/partnerships/nexum/announce/unsuspendcredit"
      break;

    // underconstruction
    case "underconstruction-dlg": return "underconstructionDialog"
      break;

    // gps
    case "receiver-info": return "gps/receiverInfo"
      break;
    case "set-address": return "gps/setaddress"
      break;

    // BA flows
    case "ba-kym-feed-main": return "ba/kym/feed/main"
      break;
    case "ba-list": return "ba/list"
      break;
    case "ba-kym-basic-agreement": return "ba/kym/basic/agreement"
      break;
    case "ba-kym-basic-create": return "ba/kym/basic/create"
      break;
    case "ba-kym-basic-select-type": return "ba/kym/basic/selectType"
      break;
    case "ba-home-pending": return "ba/home/pending"
      break;
    case "ba-home-basic": return "ba/home/basic"
      break;
    case "ba-home-advance": return "ba/home/advance"
      break;
    case "ba-kym-basic-address": return "ba/kym/basic/address"
      break;
    case "ba-kym-basic-schedule-list": return "ba/kym/basic/schedule/list"
      break;
    case "ba-kym-basic-schedule-create": return "ba/kym/basic/schedule/create"
      break;
    case "ba-select-wallet": return "ba/selectWallet"
      break;
    case "ba-withdraw-create": return "ba/withdraw/create"
      break;
    case "ba-withdraw-confirm": return "ba/withdraw/confirm"
      break;
    case "ba-topup-create": return "ba/topup/create"
      break;
    case "ba-topup-confirm": return "ba/topup/confirm"
      break;
    case "ba-txlog": return "ba/txlog"
      break;
    case "ba-profile-main": return "ba/profile/main"
      break;
    case "ba-kym-advance-status": return "ba/kym/advance/status"
      break;
    case "ba-kym-advance-create": return "ba/kym/advance/create"
      break;
    case "ba-kym-advance-attachfile": return "ba/kym/advance/attachfile"
      break;
    case "ba-kym-advance-attachfileInfo": return "ba/kym/advance/attachfileInfo"
      break;
    case "ba-kym-advance-kycInfo": return "ba/kym/advance/kycInfo"
      break;
    case "ba-kym-advance-tiedaccount-create": return "ba/kym/advance/tiedAccount/create"
      break;
    case "ba-kym-advance-tiedaccount-bank-select": return "ba/kym/advance/tiedAccount/bankSelect"
      break;
    case "ba-profile-address": return "ba/profile/address"
      break;
    case "ba-profile-schedule-list": return "ba/profile/schedule/list"
      break;
    case "ba-profile-schedule-create": return "ba/profile/schedule/create"
      break;
    case "ca-withdraw-main": return "ba/ca/withdraw/main"
      break;
    case "ca-withdraw-create": return "ba/ca/withdraw/create"
      break;
    case "ca-withdraw-confirm": return "ba/ca/withdraw/confirm"
      break;
    case "ba-confirm-advance-dlg":
      return "resultDialog"
      break;
    case "ba-qrReceived": return "ba/qrReceived"
      break;
    case "ca-allocation-list": return "ba/ca/allowance/list"
      break;
    case "ca-allocation-main": return "ba/ca/allowance/main"
      break;
    case "ca-allocation-detail": return "ba/ca/allowance/detail"
      break;
    case "ca-addfunds-detail": return "ba/ca/allowance/addFunds"
      break;
    case "ca-returnfunds-detail": return "ba/ca/allowance/returnFunds"
      break;
    case "consent-ca-addfunds": return "contract/partnerships/nexum/consent/addFunds"
      break;
    case "consent-ca-returnfunds": return "contract/partnerships/nexum/consent/returnFunds"
      break;


    // Refund
    case "refund-confirm": return "refund/confirm"
    case "wait-refund-result":
      return "resultDialog"
      break;

    //proto BA TODO: remove this later
    case "proto-ba-advance": return "prototype/ba/advance"
      break;
    case "proto-ba-setting": return "prototype/ba/setting/main"
      break;
    case "proto-ba-topup-create": return "prototype/ba/topup/create"
      break;
    case "proto-ba-topup-confirm": return "prototype/ba/topup/confirm"
      break;
    case "proto-ba-topup-confirm-dlg": return "resultDialog"
      break;
    case "proto-ba-withdraw-select": return "prototype/ba/withdraw/select"
      break;
    case "proto-ba-withdraw-create": return "prototype/ba/withdraw/create"
      break;
    case "proto-ba-withdraw-confirm": return "prototype/ba/withdraw/confirm"
      break;
    case "proto-ba-withdraw-confirm-dlg": return "resultDialog"
      break;

    //proto CA TODO: remove this later
    case "proto-ca-advance": return "prototype/ca/advance"
      break;
    case "proto-ca-setting": return "prototype/ca/setting/main"
      break;
    case "proto-ca-topup-create": return "prototype/ca/topup/create"
      break;
    case "proto-ca-topup-confirm": return "prototype/ca/topup/confirm"
      break;
    case "proto-ca-topup-completed": return "prototype/ca/topup/completed"
      break;
    case "proto-ca-withdraw-select": return "prototype/ca/withdraw/select"
      break;
    case "proto-ca-withdraw-create": return "prototype/ca/withdraw/create"
      break;
    case "proto-ca-withdraw-confirm": return "prototype/ca/withdraw/confirm"
      break;
    case "proto-ca-withdraw-confirm-dlg": return "resultDialog"
      break;
    //proto Bill for CA/BA topup withdraw TODO: remove this later
    case "proto-bill-topup": return "prototype/bill/topup"
      break;
    case "proto-bill-withdraw": return "prototype/bill/withdraw"
      break;

    //KymBaCa
    case "ba-main": return "kym/ba/main"
      break;
    case "ba-agreement": return "kym/ba/agreement"
      break;
    case "ba-create": return "kym/ba/create"
      break;
    case "ba-home": return "kym/ba/home"
      break;
    case "ba-pending": return "kym/ba/pending"
      break;
    case "edit-profile": return "kym/ca/editprofile"
      break;
    case "ba-verification": return "kym/ca/verification"
      break;
    case "ba-verification-create": return "kym/ca/create"
      break;
    case "ba-verification-create-attachfile": return "kym/ca/attachfile"
      break;
    case "ba-verification-create-fileinfo-scan": return "kym/ca/kymscan"
      break;
    case "ba-verification-create-fileinfo": return "kym/ca/infokym"
      break;
    case "ba-verificating": return "kym/ca/upgrade-wait-approve"
      break;
    case "ba-verification-create-tiedaccount": return "kym/ca/createaccount"
      break;
    case "ba-verification-create-tiedaccount-banklist": return "kym/ca/banklist"
      break;
    case "ba-verification-create-tiedaccount-confirm": return "kym/ca/accountconfirm"
      break;
    // TODO : ????component ???????????????????
    case "ba-kym-fill-address": return "kyc/basic/thai/address"
      break;

    // Cart
    case "cart-product-create": return "cart/product/create"
      break;
    case "cart-product-confirm": return "cart/product/confirm"
      break;
    case "cart-product-deliverySelect": return "cart/product/deliverySelect"
      break;
    case "cart-additional-nexum-credit-create": return "cart/additional/nexum/credit/create"
      break;
    case "dialogNoCreditWallet": return "cart/additional/nexum/credit/dialogNoCreditWallet"
      break;
    case "cart-additional-nexum-credit-confirm": return "cart/additional/nexum/credit/confirm"
      break;
    case "cart-additional-nexum-credit-selectWallet": return "cart/additional/nexum/credit/selectWallet"
      break;
    case "cart-additional-nexum-fiat-create": return "cart/additional/nexum/fiat/create"
      break;
    case "cart-additional-nexum-fiat-confirm": return "cart/additional/nexum/fiat/confirm"
      break;
    case "cart-additional-nexum-fiat-selectWallet": return "cart/additional/nexum/fiat/selectWallet"
      break;
    case "confirm-delete-cart-product": return "confirmDeleteCartProduct"
      break;


    // Delivery (3rd party)
    case "delivery-shop-select": return "delivery/3rd/shopSelect"
      break;
    case "delivery-menu-select": return "delivery/3rd/menuSelect"
      break;
    case "delivery-menu-confirm": return "delivery/3rd/menuConfirm"
      break;
    case "delivery-order-main": return "delivery/3rd/orderMain"
      break;
    case "delivery-order-rating": return "delivery/3rd/orderRating"
      break;
    case "delivery-order-cancel-request": return "delivery/3rd/orderCancelRequest"
      break;
    case "delivery-order-cancelled": return "delivery/3rd/orderCancelled"
      break;
    case "delivery-bill-temporary": return "delivery/3rd/billDeliveryTemporary"
      break;


    //kyc basic
    // mix
    case "kyc-feed-main": return "kyc/feed/main"
      break;
    case "kyc-basic-agreement": return "kyc/basic/agreement"
      break;
    case "waiting-verify-kyc-dlg": return "verifyingDialogkyc"
      break;
    // thai
    case "kyc-basic-th-preScan": return "kyc/basic/thai/preScan"
      break;
    case "kyc-basic-th-create": return "kyc/basic/thai/create"
      break;
    case "kyc-basic-th-createInfo": return "kyc/basic/thai/createInfo"
      break;
    case "kyc-basic-th-confirm": return "kyc/basic/thai/confirm"
      break;
    case "kyc-basic-th-address": return "kyc/basic/thai/address"
      break;
    case "kyc-basic-th-currentAddress": return "kyc/basic/thai/currentAddress"
      break;
    case "kyc-basic-th-checkPhoneNumber": return "kyc/basic/thai/checkPhoneNumber"
      break;
    case "kyc-basic-th-main": return "kyc/basic/thai/main"
      break;

    // en
    case "kyc-basic-en-preScan": return "kyc/basic/foreign/preScan"
      break;
    case "kyc-basic-en-create": return "kyc/basic/foreign/create"
      break;
    case "kyc-basic-en-createInfo": return "kyc/basic/foreign/createInfo"
      break;
    case "kyc-basic-en-confirm": return "kyc/basic/foreign/confirm"
      break;
    case "kyc-basic-en-address": return "kyc/basic/foreign/address"
      break;
    case "kyc-basic-en-thaiAddress": return "kyc/basic/foreign/thaiAddress"
      break;
    case "kyc-basic-en-checkPhoneNumber": return "kyc/basic/foreign/checkPhoneNumber"
      break;
    case "kyc-basic-en-main": return "kyc/basic/foreign/main"
      break;

    //Survey
    case "survey-main": return "survey/quizPage"
      break;

    // ims

    case "ims-pay-create": return "ims/pay/create"
      break;
    case "ims-pay-confirm": return "ims/pay/confirm"
      break;

    //??????????????????? dailog add shortcut ??????????????????? flow ???????????
    case "ims-dlgconfirmAddShortcut": return "ims/dlgconfirmAddShortcut"
      break;

    // ims3rd
    case "ims-result-receive-money-dlg": return "ims3rd/resultReceiveMoneyDialog"
      break;
    case "ims-receive-pa-create": return "ims3rd/receive/pa/create"
      break;
    case "ims-receive-pa-confirm": return "ims3rd/receive/pa/confirm"
      break;
    case "ims-receive-ba-create": return "ims3rd/receive/ba/create"
      break;
    case "ims-receive-ba-confirm": return "ims3rd/receive/ba/confirm"
      break;
    case "ims-receive-result": return "ims3rd/receive/result"
      break;

    case "ims-pay-exchange": return "ims3rd/pay/exchange"
      break;

    case "ims-fail-dlg":
      return "resultDialog"
      break;
    case "ims-select-wallet": return "ims/selectWallet"
      break;
    case "ims3rd-select-wallet": return "ims3rd/receive/pa/selectWallet"
      break;
    case "ims-shortcut-dlg": return "ims3rd/resultDialogIms"
      break;

    // jergun
    case "jergun-consent-shop": return "contract/jergun/consent/shop"
      break;
    case "jergun-shop-select": return "contract/jergun/consent/shopSelect"
      break;
    case "jergun-agreement": return "contract/jergun/agreement"
      break;

    // payroll
    case "consent-employee-create": return "contract/employee/consent/create"
      break;
    case "consent-employee-employed": return "contract/employee/consent/employed"
      break;
    case "consent-employee-create-detail": return "contract/employee/consent/createdetail"
      break;
    case "consent-employee-dismiss-detail": return "contract/employee/consent/dismissdetail"
      break;
    case "consent-employee-edit-detail": return "contract/employee/consent/editdetail"
      break;
    case "consent-employee-suspended-detail": return "contract/employee/consent/suspendedetail"
      break;
    case "consent-employee-unsuspended-detail": return "contract/employee/consent/unsuspendedetail"
      break;
    case "consent-employee-assign-operator-detail": return "contract/employee/consent/operator/assignoperatordetail"
      break;
    case "consent-employee-wallet-select": return "contract/employee/consent/walletSelect"
      break;
    case "consent-employee-edit": return "contract/employee/consent/edit"
      break;
    case "consent-employee-suspend": return "contract/employee/consent/suspend"
      break;
    case "consent-employee-unsuspend": return "contract/employee/consent/unsuspend"
      break;
    case "consent-employee-dismiss": return "contract/employee/consent/dismiss"
      break;
    case "consent-employee-pay": return "contract/employee/consent/pay"
      break;
    case "consent-operator-assign": return "contract/employee/consent/operator/assign"
      break;

    case "consent-manager-assign": return "contract/employee/consent/manager/assign"
      break;
    case "announce-employee-status": return "contract/employee/announce/employed"
      break;
    case "announce-employee-edited": return "contract/employee/announce/edited"
      break;
    case "announce-employee-suspended": return "contract/employee/announce/suspended"
      break;
    case "announce-employee-unsuspended": return "contract/employee/announce/unsuspended"
      break;
    case "announce-employee-dismissed": return "contract/employee/announce/dismissed"
      break;
    case "announce-employee-salary": return "contract/employee/announce/salary"
      break;
    case "announce-operator-assigned": return "contract/employee/announce/operator/assigned"
      break;
    case "announce-operator-unassigned": return "contract/employee/announce/operator/unassigned"
      break;
    case "announce-manager-assigned": return "contract/employee/announce/manager/assigned"
      break;
    case "announce-manager-unassigned": return "contract/employee/announce/manager/unassigned"
      break;

    default: return "index"
      break;
  }
};

if (flowId) {
  let flow = await getPath(flowId);
  navigateTo({
    path: `/${flow}`,
    query: { endpointId },
    replace: true
  })
}
</script>