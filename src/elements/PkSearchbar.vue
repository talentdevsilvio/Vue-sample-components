<template>
  <component :is="wrapper" :class="['input', { 'input-expand': width === 'expand' }]">
    <label :for="id" v-if="label" :class="[size]">{{ label }}</label>
    <input
      :id="id"
      :disabled="disabled"
      :type="type"
      :value="value"
      :class="state"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
    />
  </component>
</template>

<script>
/**
 * Form Inputs are us11ed to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the form `Textarea` element.
 */
export default {
  name: "PkSearchbar",
  status: "ready",
  release: "1.0.0",
  props: {
    /**
     * Size of the form input.
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(medium|large)/)
      },
    },
    /**
     * The type of the form input field.
     * `text, number, email`
     */
    type: {
      type: String,
      default: "text",
      validator: value => {
        return value.match(/(text|number|email)/)
      },
    },
    /**
     * Text value of the form input field.
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * The placeholder value for the form input field.
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * The html element name used for the wrapper.
     * `div, section`
     */
    wrapper: {
      type: String,
      default: "div",
      validator: value => {
        return value.match(/(div|section)/)
      },
    },
    /**
     * Unique identifier of the form input field.
     */
    id: {
      type: String,
      default: null,
    },
    /**
     * The width of the form input field.
     * `auto, expand`
     */
    width: {
      type: String,
      default: "expand",
      validator: value => {
        return value.match(/(auto|expand)/)
      },
    },
    /**
     * Whether the form input field is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually trigger various states of the input.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(hover|active|focus)/)
      },
    },
  },
  methods: {
    onInput(value) {
      this.$emit("change", value)
    },
    onFocus(value) {
      this.$emit("focus", value)
    },
  },
}
</script>

<style lang="scss" scoped>
// Design Tokens with local scope
$color-placeholder: tint($color-silver, 50%);

.input {
  @include stack-space($space-s);
  font-weight: $weight-normal;
  font-family: $font-text;
  font-size: $size-m;
  line-height: $line-height-xs;
  width: auto;
  &-expand {
    width: 100%;
  }
  label {
    cursor: pointer;
    display: block;
    font-size: $size-s;
    color: #2ca4ab;
    @include stack-space($space-xs);
    &.large {
      font-size: $size-l;
    }

    &.medium {
      font-size: $size-m;
    }
  }
  input {
    @include reset;
    @include inset-squish-space($space-s);
    transition: all 0.2s ease;
    -webkit-appearance: none;
    appearance: none;
    font-size: $size-m;
    font-family: $font-text;
    background: $color-white;
    color: set-text-color($color-rich-black, $color-white);
    width: 100%;
    margin: 0;
    border: 0;
    border-bottom: solid 1px #2ca4ab;
    &::-webkit-input-placeholder {
      -webkit-font-smoothing: antialiased;
      color: $color-placeholder;
    }
    &:-ms-input-placeholder {
      color: $color-placeholder;
    }
    &::-moz-placeholder {
      color: $color-placeholder;
      -moz-osx-font-smoothing: grayscale;
      opacity: 1;
    }
    &:hover,
    &.hover {
      box-shadow: 0 1px 5px 0 rgba(#ccc, 0.01), 0 0 0 1px tint(#ccc, 20%);
    }
    &:focus,
    &.focus {
      transition: box-shadow 0.2s ease;
      border: 0;
      box-shadow: inset 0 0 0 1px #2ca4ab, 0 0 0 1px #2ca4ab;
      outline: 0;
    }
    &[disabled] {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-shadow: 0 0 0 1px tint($color-rich-black, 80%);
      background: lighten($color-placeholder, 42%);
      color: tint($color-placeholder, 20%);
      cursor: not-allowed;
      opacity: 0.7;
    }
    &.large {
      font-size: $size-l;
    }

    &.medium {
      font-size: $size-m;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <PkSearchbar label="Searchbar Medium" placeholder="Write your text" id="input-0" size="medium" />
    <PkSearchbar label="Searchbar Large" placeholder="Write your text" id="input-1" size="large" />
  </div>
  ```
</docs>
