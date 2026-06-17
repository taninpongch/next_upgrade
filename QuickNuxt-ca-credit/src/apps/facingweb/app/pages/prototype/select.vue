<template>
  <br />
  <br />
  <br />
  <br />
  <div class="text-center">prototype BA/CA TOPUP WITHDRAW</div>
  <br />
  <br />
  <br />
  <br />
  <BizShareItemLink title="BA" @on-tapped="clickmeBA" />
  <br />
  <BizShareItemLink title="CA" @on-tapped="clickmeCA" />
</template>

<script lang="ts" setup>
const clickmeBA = () => {
  navigateTo("ba/advance");
}
const clickmeCA = () => {
  navigateTo("ca/advance");
}
</script>

<style></style>