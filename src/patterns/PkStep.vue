<template>
  <div class="step">
    <img :src="img" class="image" />
    <div class="number">{{ number }}</div>
    <div class="text">{{ content }}</div>
  </div>
</template>
<script>
export default {
  name: "PkStep",
  status: "ready",
  release: "1.0.0",
  props: {
    number: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.step {
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image {
  margin-bottom: $space-s;
}

.number {
  margin-bottom: $space-s;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: solid 1px #7eb8c4;
  color: #7eb8c4;
  font-family: Gilroy;
  font-size: 18px;
  line-height: 22px;
  background-color: white;
  text-align: center;
}

.text {
  font-family: Lato;
  font-size: 12px;
  text-align: center;
  color: #6b6b6b;
}
</style>
<docs>
    ```jsx
    <div style="display: flex;">
        <PkStep number="1" content="Search for the beautiful ideas of home remodeling in your neighborhood" img="icons/step1-map.svg" />
        <PkStep number="2" content="Save the ideas you’ve found in your personal account" img="icons/step2-suitcase.svg" />
        <PkStep number="3" content="Find a perfect contractor who has already implemented these ideas before" img="icons/step3-blueprint.svg" />
    </div>
    ```
</docs>
