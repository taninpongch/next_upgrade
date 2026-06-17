<template>

  <div v-for="(item, index) in data" :key="'open-' + index">
    <MuiCard v-if="item.isStandby" @click="emits(emitName, item)"
      class="flex items-center justify-between sm:px-6 mb-2">
      <div class="flex items-center gap-3 min-w-0 "> <span
          class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full"> <!-- ratio 16:9 (w:h) -->
          <img class="w-[120px] h-[67.5px] object-cover" :src="coverUrl(item.coverUrl)"
            alt="ร้านอาหาร" />
        </span>
        <div class="min-w-0 ">
          <BizShareText :text="item.name" :is-truncate="true" />
          <BizShareText :text="item.classification ? item.classification : ''" :is-truncate="true" color="gray" />
        </div>
      </div>
    </MuiCard>
  </div>

  <!-- กลุ่มร้านที่ปิดอยู่ -->
  <div  v-for="(item, index) in data" :key="'closed-' + index">
    <MuiCard v-if="!item.isStandby"  @click="emits(emitName, item)"
      class="flex items-center justify-between sm:px-6 mb-2">
      <div class="flex items-center gap-3 min-w-0 "> <span
          class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full"> <!-- ratio 16:9 (w:h) -->
          <img class="w-[120px] h-[67.5px] object-cover" :src="coverUrl(item.coverUrl)"
            alt="ร้านอาหาร" />
          <div v-if="!item.isStandby" class="absolute top-0 bottom-0 left-0 right-0 py-5 bg-gray-500 opacity-70">
            <div class="text-center">
              <BizShareText text="ปิด" class="text-xl text-white" />
            </div>
          </div>
        </span>
        <div class="min-w-0 ">
          <BizShareText :text="item.name" :is-truncate="true" />
          <BizShareText :text="item.classification ? item.classification : ''" :is-truncate="true" color="gray" />
        </div>
      </div>

    </MuiCard>
  </div>

</template>

<script setup lang="ts">
import { getManaContext } from "@manaapp/ui";

const lib = await getManaContext();
const props = withDefaults(
  defineProps<{
    data: any,
  }>(), {}
)

const coverUrl = (imgsCoverUrl: string) => {
  if (!imgsCoverUrl) {
    return "https://failfast.blob.core.windows.net/mcontent-imgs/temps/delivery/dfcoverrest.png";
  }
  return imgsCoverUrl;
};

const emitName = "onTapped";
const emits = defineEmits([emitName]);
</script>