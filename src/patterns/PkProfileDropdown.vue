<template>
  <div
    style="display: flex; align-items: center; position: relative; width: 48px; cursor: pointer;"
    @click="isOpen = !isOpen"
  >
    <img :src="src" />
    <div class="menu" v-show="isOpen">
      <pk-button variation="ghost"> Profile </pk-button>
      <pk-button variation="ghost"> Logout </pk-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PkProfileDropdown",
  status: "ready",
  release: "1.0.0",
  props: {
    src: {
      type: String,
      default:
        "https://as2.ftcdn.net/jpg/02/15/84/43/500_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>
<style scoped>
.menu {
  z-index: 9999;
  position: absolute;
  top: 60px;
  right: 10px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  object-fit: cover;
}
</style>
<docs>
    ```jsx
    <PkProfileDropdown src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjA3NjYzMzE1MV5BMl5BanBnXkFtZTgwNTA4NDY4OTE@._V1_UX172_CR0,0,172,256_AL_.jpg"></PkProfileDropdown>
    ```
</docs>
