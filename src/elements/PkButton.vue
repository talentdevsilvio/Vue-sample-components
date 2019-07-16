<template>
  <component :is="type" :href="href" :type="submit" :class="['button', size, state, variation]">
    <slot />
  </component>
</template>
<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to appearance that has white background with grey border.
 * Primary style should be used only once per view for main call-to-action.
 */
export default {
  name: "PkButton",
  status: "ready",
  release: "3.5.0",
  props: {
    /**
     * The html element used for the button.
     * `button, a`
     */
    type: {
      type: String,
      default: "button",
      validator: value => {
        return value.match(/(button|a)/)
      },
    },
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
     * When setting the button’s type to a link, use this option to give a href.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * Set the button’s type to “submit”.
     */
    submit: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(null|submit)/)
      },
    },
    /**
     * Manually trigger various states of the button.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(hover|active|focus|disabled)/)
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
        return value.match(/(primary|secondary|cta|ghost)/)
      },
    },
  },
}
</script>
<style lang="scss" scoped>
.button {
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
  border-radius: 24px;
  background: transparent;
  color: $color-bleu-de-france;
  cursor: pointer;

  &:hover,
  &.hover {
    color: $color-white;
    background: $color-bleu-de-france;
  }

  &:active,
  &.active {
    transition: none;
    background: $color-bleu-de-france-dark;
    box-shadow: none;
    color: $color-white;
    transform: translateZ(0) scale(1);
  }

  &:focus,
  &.focus {
    background: $color-bleu-de-france-darker;
    box-shadow: none;
    color: $color-white;
    transform: translateZ(0) scale(1);
    outline: 0;
  }

  &.disabled {
    background: #c5e1e1;
    color: #9b9b9b;
  }

  // For icons inside buttons
  .icon {
    float: right;
    margin: -#{$space-xs} -#{$space-xs} -#{$space-s} $space-xs/2;
    color: $color-bleu-de-france;
  }

  // Various button sizes
  &.large {
    width: 220px;
    height: 48px;
    font-size: $button-size-l;
  }

  &.medium {
    width: 200px;
    height: 40px;
    font-size: $button-size-m;
  }

  &.small {
    width: 104px;
    height: 32px;
    font-size: $button-size-s;
  }

  // Primary button
  &.primary {
    background: #2ca4ab;
    color: $color-white;
    box-shadow: none;

    &:hover,
    &.hover {
      background-color: #1e8c9b;
    }

    &:active,
    &.active {
      background-color: #7eb8c4;
      transition: none;
    }

    &.disabled {
      background: #c5e1e1;
      color: #9b9b9b;
    }

    &:focus {
      outline: 0;
    }

    .user-is-tabbing &:focus,
    &.focus {
    }
  }

  &.cta {
    background: #ef5443;
    color: $color-white;
    box-shadow: none;

    &:hover,
    &.hover {
      background-color: #d62c19;
    }

    &:active,
    &.active {
      background-color: #fd7764;
      transition: none;
    }

    &.disabled {
      background: #fdc2ba;
      color: #9b9b9b;
    }

    &:focus {
      outline: 0;
    }

    .user-is-tabbing &:focus,
    &.focus {
    }
  }

  &.ghost {
    background: $color-white;
    color: #242749;
    box-shadow: none;

    &:hover,
    &.hover {
      background-color: shade($color-bleu-de-france, 12%);
    }

    &:active,
    &.active {
      background-color: shade($color-bleu-de-france, 20%);
      transition: none;
    }

    &:focus {
      outline: 0;
    }

    .user-is-tabbing &:focus,
    &.focus {
    }
  }
}
</style>
<docs>
    ```jsx
    <div>
        <PkButton variation="primary" size="large">Primary/L</PkButton>
        <PkButton variation="primary" size="large" state="hover">Primary/L Hover</PkButton>
        <PkButton variation="primary" size="large" state="active">Primary/L Active</PkButton>
        <PkButton variation="primary" size="large" state="disabled">Primary/L Disabled</PkButton>
        <br />
        <br />
        <PkButton variation="primary" size="medium">Primary/M Button</PkButton>
        <PkButton variation="primary" size="medium" state="hover">Primary/M Hover</PkButton>
        <PkButton variation="primary" size="medium" state="active">Primary/M Active</PkButton>
        <PkButton variation="primary" size="medium" state="disabled">Primary/M Disabled</PkButton>
        <br />
        <br />
        <PkButton variation="primary" size="small">Primary/S Button</PkButton>
        <PkButton variation="primary" size="small" state="hover">Primary/S Hover</PkButton>
        <PkButton variation="primary" size="small" state="active">Primary/S Active</PkButton>
        <PkButton variation="primary" size="small" state="disabled">Primary/S Disabled</PkButton>
        <br />
        <br />
        <br />
        <PkButton variation="cta" size="large">CTA/L</PkButton>
        <PkButton variation="cta" size="large" state="hover">CTA/L Hover</PkButton>
        <PkButton variation="cta" size="large" state="active">CTA/L Active</PkButton>
        <PkButton variation="cta" size="large" state="disabled">CTA/L Disabled</PkButton>
        <br />
        <br />
        <PkButton variation="cta" size="medium">CTA/M Button</PkButton>
        <PkButton variation="cta" size="medium" state="hover">CTA/M Hover</PkButton>
        <PkButton variation="cta" size="medium" state="active">CTA/M Active</PkButton>
        <PkButton variation="cta" size="medium" state="disabled">CTA/M Disabled</PkButton>
        <br />
        <br />
        <PkButton variation="cta" size="small">CTA/S Button</PkButton>
        <PkButton variation="cta" size="small" state="hover">CTA/S Hover</PkButton>
        <PkButton variation="cta" size="small" state="active">CTA/S Active</PkButton>
        <PkButton variation="cta" size="small" state="disabled">CTA/S Disabled</PkButton>
        <br />
    </div>
    ```
</docs>
