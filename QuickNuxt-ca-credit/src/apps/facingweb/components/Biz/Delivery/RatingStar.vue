<template>
  <div class="flex items-center justify-between gap-3 px-20 sm:px-6">
    <button type="button" v-for="star in totalStars" :key="star" @click="setRating(star)" @mouseover="hoverRating(star)"
      @mouseleave="resetHover" :class="{
        'text-yellow-400': isStarFilled(star),
        'text-gray-300': !isStarFilled(star),
      }">
      <i class="i-heroicons-star-16-solid" v-if="isStarFilled(star)"></i>
      <i class="i-heroicons-star" v-else></i>
    </button>
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

<style scoped>
.i-heroicons-star,
.i-heroicons-star-16-solid {
  font-size: 1.5rem;
}
</style>