<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }" />
      <BizSharePartyHero src="https://ipx.nuxt.com/f_auto,s_192x192/gh_avatar/atinux" title="อานนท์ บางสาน" />
      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />
        <UDivider />
      </UDashboardSidebar>
    </UDashboardPanel>
    <slot></slot>
  </UDashboardLayout>
</template>

<script setup lang="ts">
const links = [{
  id: 'Tutorial',
  label: 'Tutorial',
  icon: 'i-heroicons-home',
  to: '/earn/dashboard',
},
{
  id: 'Employee',
  label: 'Employee management',
  icon: 'i-heroicons-home',
  to: '/ta/a1'
}, {
  id: 'Pay',
  label: 'Pay',
  icon: 'i-heroicons-inbox',
  to: '/ta/pay'
}, {
  id: 'Log',
  label: 'Log',
  icon: 'i-heroicons-user-group',
  to: '/ta/log'
},
{
  id: 'Operator',
  label: 'Operator management',
  icon: 'i-heroicons-user-group',
  // to: '/users'
},
{
  id: 'Manager',
  label: 'Manager management',
  icon: 'i-heroicons-user-group',
  // to: '/users'
},
{
  id: 'Setting',
  label: 'Setting',
  icon: 'i-heroicons-user-group',
  // to: '/users'
},
{
  id: 'Logout',
  label: 'Logout',
  icon: 'i-heroicons-user-group',
  to: '/ta/login'
}]
</script>