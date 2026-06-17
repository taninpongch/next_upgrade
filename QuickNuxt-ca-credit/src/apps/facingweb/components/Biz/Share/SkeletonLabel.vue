<template>
  <MuiPage>
    <div v-for="item in Array(7)" class="flex items-center space-x-6">
      <!-- <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full', background: 'bg-gray-300 dark:bg-gray-800' }" /> -->
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]"
          :ui="{ rounded: 'rounded-full', background: 'bg-gray-300 dark:bg-gray-800' }" />
        <USkeleton class="h-4 w-[200px]"
          :ui="{ rounded: 'rounded-full', background: 'bg-gray-300 dark:bg-gray-800' }" />
      </div>
    </div>
  </MuiPage>
</template>