<template>
  <div
    style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1040px; height: 76px;"
  >
    <div><PkLogo /></div>
    <div>
      <PkNavBar
        active="NotFound"
        :itemStyle="{ color: '#242749', fontSize: '14px', fontWeight: 600 }"
        :navItems="[
          { name: 'About', component: 'PkHomepage', href: '/#/' },
          { name: 'For Homeowners', component: 'Index', href: '/#/homeowners' },
          { name: 'Sign In', component: 'Login', href: '/#/login' },
          { name: 'Join', component: 'Signup', href: '/#/signup' },
        ]"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "PkHomepageTopBar",
  status: "ready",
  release: "1.0.0",
}
</script>
