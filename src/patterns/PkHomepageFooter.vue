<template>
  <div style="display: flex; align-items: center; justify-content: center;" class="footer">
    <div style="display: flex; align-items: center; justify-content: space-between;" class="inner">
      <PkLogo />
      <PkNavBar
        :itemStyle="{ color: 'white', fontSize: '14px', fontWeight: 600 }"
        :navItems="[
          { name: 'About', href: '/#/' },
          { name: 'For Homeowners', href: '/#/homeowners' },
          { name: 'For Contractors', href: '/#/contractors' },
          { name: 'For Terms of Use', href: '/#/terms' },
          { name: 'Privacy Policy', href: '/#/privavy' },
        ]"
      />
      <PkNavBar
        :navItems="[
          { img: 'icons/facebook.svg', href: 'https://www.facebook.com/groups/pickets' },
          { img: 'icons/twitter.svg', href: 'https://www.twitter.com/@picketsdotcom' },
          { img: 'icons/linkedin.svg', href: 'https://www.instagram.com/@picketsdotcom' },
        ]"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "PkHomepageFooter",
  status: "ready",
  release: "1.0.0",
}
</script>
<style scoped>
.footer {
  background-color: #15828c;
  width: 100%;
  height: 136px;
}

.inner {
  max-width: 1440px;
}
</style>
