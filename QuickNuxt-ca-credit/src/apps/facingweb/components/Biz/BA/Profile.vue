<template>
  <MuiCard>
    <BizShareItemStatus :src="data.profile.logo" :title="data.profile.name" :description="data.profile.displayId"
      rightText="แก้ไขโปรไฟล์" :transparent="true" @on-tapped="emits(emitEditProfile)" />
    <UDivider class="mb-4" />
    <BizShareSessionTitle label="บริการเสริม" />
    <UCarousel v-slot="{ item, index }" :items="displayService"
      :ui="{ item: 'snap-start w-5', container: 'space-x-4' }">
      <div class="text-center mx-auto" @click="emits(emitMoreService)">
        <BizShareImage size="sm" :src="item.logo" :rounded="false" />
      </div>
    </UCarousel>
  </MuiCard>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    data: {
      profile: {
        logo: string,
        name: string,
        displayId: string
      }
      service: {
        id: string,
        logo: string,
        name: string
      }[]
    }
  }>(), { }
)

const displayService = computed(() => {
  if (!props.data.service) {
    props.data.service = []
  }

  props.data.service.push({
    id: "more",
    logo: "i-heroicons-plus-circle-16-solid",
    name: "more-service"
  });
  return props.data.service;
})

const emitEditProfile = "onTappedEditProfile";
const emitMoreService = "onTappedMoreService";
const emits = defineEmits([emitEditProfile, emitMoreService]);
</script>
