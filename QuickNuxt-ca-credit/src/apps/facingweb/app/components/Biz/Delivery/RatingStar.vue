<template>
  <div class="grid grid-cols-6">
    <div class="col-span-4 col-start-2 m-auto">
        <button type="button" v-for="star in totalStars" :key="star" @pointerdown="setRating(star)" @click.prevent @mouseover="hoverRating(star)"
        @mouseleave="resetHover" :class="{
          'text-yellow-400': isStarFilled(star),
          'text-gray-300': !isStarFilled(star),
        }">
        <UIcon name="i-heroicons-star-16-solid" class="w-8 h-8" v-if="isStarFilled(star)"></UIcon>
        <UIcon name="i-heroicons-star" class="w-8 h-8" v-else></UIcon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const totalStars = 5 // Number of stars
const currentRating = ref(0) // Current rating value
const hoverValue = ref(0) // Hover value for visual feedback
const isSubmit = ref<boolean>(false);

const props = withDefaults(
defineProps<{
  models?: any
}>(), {}
)

const setRating = (star: any) => {
  currentRating.value = star
  props.models.riderPoint = currentRating.value;
  props.models.restaurantPoint = currentRating.value;
  isSubmit.value = false;
}

const hoverRating = (star: any) => {
  hoverValue.value = star
}

const resetHover = () => {
  hoverValue.value = 0
}

const isStarFilled = (star: any) => {
  return star <= (hoverValue.value || currentRating.value)
}

</script>