<template>
  <component is="div" :type="submit" :class="['tooltip']"> <slot /> </component>
</template>
<script>
export default {
  name: "PkTag",
  status: "ready",
  release: "3.5.0",
  props: {
    /**
     * The size of the button. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     * `primary, secondary`
     */
    variation: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(primary|secondary)/)
      },
    },
  },
}
</script>
<style lang="scss" scoped>
.tag {
  @include reset;
  @include inline-space($space-xs);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: $weight-semi-bold;
  font-size: $size-m;
  font-family: $font-text;
  line-height: $line-height-m;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: 8px 16px;
  border-radius: 24px;
  background: transparent;
  color: $color-bleu-de-france;
  cursor: arrow;

  // For icons inside buttons
  .icon {
    float: right;
    margin: -#{$space-xs} -#{$space-xs} -#{$space-s} $space-xs/2;
    color: $color-bleu-de-france;
  }

  // Various button sizes
  &.large {
    font-size: $button-size-l;
  }

  &.medium {
    font-size: $button-size-m;
  }

  &.small {
    width: 104px;
    height: 32px;
    font-size: $button-size-s;
  }

  // Primary button
  &.primary {
    background: #627e8c;
    color: $color-white;
    box-shadow: none;
  }

  &.secondary {
    background: $color-white;
    border: solid 1px #9aced9;
    color: #242749;
    box-shadow: none;
  }
}
</style>
<docs>
    ```jsx
    <div>
        <PkTag variation="primary" size="large">Primary/L</PkTag>
        <PkTag variation="primary" size="medium">Primary/M</PkTag>
        <br />
        <br />
        <PkTag variation="secondary" size="large">Secondary/L</PkTag>
        <PkTag variation="secondary" size="medium">Secondary/M</PkTag>
        <br />
        <br />
    </div>
    ```
</docs>
