<template>
  <div>
    <div class="menu">
      <pk-button variation="ghost"> About </pk-button>
      <pk-button variation="ghost"> For Homeowners </pk-button>
      <pk-profile-dropdown> </pk-profile-dropdown>
    </div>
  </div>
</template>
<script>
/**
 * Text style enhances text with additional visual meaning. For example, using
 * disabled text to de-emphasize it from its surrounding text. Don’t use text
 * styles only for aesthetic effect.
 */
export default {
  name: "PkTopMenu",
  status: "ready",
  release: "1.0.0",
  props: {},
}
</script>
<style scoped>
.menu {
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
}
</style>
<docs>
    ```jsx
    <PkTopMenu></PkTopMenu>
    ```
</docs>
