<template>
  <component :is="wrapper" :class="['textarea', { 'textarea-expand': width === 'expand' }]">
    <label :for="id" v-if="label" :class="[size]">{{ label }}</label>
    <textarea
      :id="id"
      :disabled="disabled"
      :class="state"
      :placeholder="placeholder"
      @input="onInput($event.target.value)"
      @focus="onFocus($event.target.value)"
      v-model="value"
    />
  </component>
</template>

<script>
/**
 * Textareas are used to allow users to provide text input when the expected
 * input is long. Textarea has a range of options. For shorter input,
 * use the `Input` element.
 */
export default {
  name: "PkTextarea",
  status: "ready",
  release: "3.5.0",
  props: {
    /**
     * Size of the form textarea.
     */
    size: {
      type: String,
      default: "medium",
      validator: value => {
        return value.match(/(medium|large)/)
      },
    },
    /**
     * Text value of the form textarea.
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * The placeholder value for the form textarea.
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * The label of the form textarea.
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
     * Unique identifier of the form textarea.
     */
    id: {
      type: String,
      default: null,
    },
    /**
     * The width of the form textarea.
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
     * Whether the form textarea is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually trigger various states of the textarea.
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

.textarea {
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
  textarea {
    @include reset;
    @include inset-squish-space($space-s);
    transition: all 0.2s ease;
    -webkit-appearance: none;
    appearance: none;
    resize: vertical;
    min-height: $space-xxl;
    font-size: $size-m;
    font-family: $font-text;
    background: $color-white;
    color: set-text-color($color-rich-black, $color-white);
    width: 100%;
    margin: 0;
    border: 0;
    border-bottom: 1px solid #2ca4ab;
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
      box-shadow: 0 1px 5px 0 rgba($color-rich-black, 0.07), 0 0 0 1px tint($color-rich-black, 60%);
    }
    &:focus,
    &.focus {
      transition: box-shadow 0.2s ease;
      box-shadow: inset 0 0 0 1px $color-bleu-de-france, 0 0 0 1px $color-bleu-de-france;
      outline: 0;
    }
    &[disabled] {
      -webkit-font-smoothing: antialiased;
      box-shadow: 0 0 0 1px tint($color-rich-black, 80%);
      background: lighten($color-placeholder, 42%);
      color: tint($color-placeholder, 20%);
      cursor: not-allowed;
      opacity: 0.7;
    }
    // Various sizes
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
    <PkTextarea label="Textarea Medium" placeholder="Write your text" size="medium" id="textarea-0" />
    <PkTextarea label="Textarea Large" placeholder="Write your text" size="large" id="textarea-1" />
    <PkTextarea label=":focus" state="focus" placeholder="Write your text" id="textarea-2" />
    <PkTextarea label="[disabled]" disabled value="Write your text" id="textarea-3" />
  </div>
  ```
</docs>
