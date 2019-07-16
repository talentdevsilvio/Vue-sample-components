<template>
  <component :is="level" class="heading"> <slot /> </component>
</template>

<script>
/**
 * Headings are used as the titles of each major section of a page in the
 * interface. For example, templates generally use headings as their title.
 * Heading element provides an option to change the level of the heading.
 */
export default {
  name: "PkHeading",
  status: "prototype",
  release: "1.0.0",
  props: {
    /**
     * The heading level used for the heading.
     * `h1, h2, h3, h4, h5, h6`
     */
    level: {
      type: String,
      default: "h1",
      validator: value => {
        return value.match(/(h1|h2|h3|h4|h5|h6)/)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.heading {
  @include reset;
  @include stack-space($space-m);
  font-family: $font-heading;
  line-height: $line-height-xs;
  color: #333333;
  @media #{$media-query-l} {
    // This is how you’d use design tokens with media queries
  }
}
h1 {
  @include stack-space($space-xl);
  font-size: $heading-size-xxl;
  font-weight: $weight-bold;
  line-height: $line-height-xl;
}
h2 {
  @include stack-space($space-l);
  font-size: $heading-size-xl;
  font-weight: $weight-bold;
  line-height: $line-height-l;
}
h3 {
  @include stack-space($space-m);
  font-size: $heading-size-l;
  font-weight: $weight-semi-bold;
  line-height: $line-height-m;
}
h4 {
  font-size: $heading-size-m;
  font-weight: $weight-semi-bold;
  line-height: $line-height-s;
}
h5 {
  @include stack-space($space-m);
  font-size: $heading-size-s;
  font-weight: $weight-semi-bold;
  line-height: $line-height-xs;
}
</style>

<docs>
  ```jsx
  <div>
    <PkHeading>The quick brown fox</PkHeading>
    <PkHeading level="h2">The quick brown fox</PkHeading>
    <PkHeading level="h3">The quick brown fox</PkHeading>
    <PkHeading level="h4">The quick brown fox</PkHeading>
    <PkHeading level="h5">The quick brown fox</PkHeading>
  </div>
  ```
</docs>
