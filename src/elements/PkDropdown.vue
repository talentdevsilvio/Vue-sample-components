<template>
  <div ref="vuesingleselect">
    <div v-if="!selectedOption" :class="classes.wrapper">
      <component :is="wrapper" :class="['input', { 'input-expand': width === 'expand' }]">
        <label :for="id" v-if="label" :class="[size]">{{ label }}</label>
        <div class="relative inline-block w-full">
          <input
            ref="search"
            :class="state"
            :id="id"
            :disabled="disabled"
            @click="seedSearchText"
            @focus="seedSearchText"
            @keyup.enter="setOption"
            @keyup.down="movePointerDown"
            @keyup.tab.stop="closeOut"
            @keyup.esc.stop="closeOut"
            @keyup.up="movePointerUp"
            :placeholder="placeholder"
            autocomplete="off"
            :required="required"
            v-model="searchText"
          />

          <div
            @click="toggleDropdown"
            :class="[classes.icons]"
            class="cursor-pointer absolute flex items-center"
          >
            <svg v-if="!dropdownOpen" aria-hidden="true" viewBox="0 0 448 512">
              <path
                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
              ></path>
            </svg>
            <svg v-else aria-hidden="true" viewBox="0 0 448 512">
              <path
                d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
              ></path>
            </svg>
          </div>
          <ul
            tabindex="-1"
            ref="options"
            v-if="matchingOptions"
            :style="{ 'max-height': maxHeight }"
            style="z-index: 100;padding"
            :class="[classes.dropdown]"
            class="absolute w-full overflow-auto appearance-none mt-px list-reset"
          >
            <li
              tabindex="-1"
              v-for="(option, idx) in matchingOptions"
              :key="idx"
              :class="idx === pointer ? classes.activeClass : ''"
              class="cursor-pointer outline-none"
              @blur="handleClickOutside($event)"
              @mouseover="setPointerIdx(idx)"
              @keyup.enter="setOption()"
              @keyup.up="movePointerUp()"
              @keyup.down="movePointerDown()"
              @click.prevent="setOption()"
            >
              <slot name="option" v-bind="{ option, idx }">
                {{ getOptionDescription(option) }}
              </slot>
            </li>
          </ul>
        </div>
      </component>
    </div>

    <div :class="classes.wrapper" v-if="selectedOption" @click="toggleDropdown">
      <component :is="wrapper" :class="['input', { 'input-expand': width === 'expand' }]">
        <label :for="id" v-if="label" :class="[size]">{{ label }}</label>
        <div class="relative inline-block w-full">
          <input
            :id="id"
            :class="state"
            ref="match"
            :required="required"
            @input="switchToSearch($event)"
            @click="switchToSearch($event)"
            :value="getOptionDescription(selectedOption)"
          />
          <input
            type="hidden"
            :name="name"
            ref="selectedValue"
            :value="getOptionValue(selectedOption)"
          />

          <div class="flex absolute items-center" :class="classes.icons">
            <svg aria-hidden="true" @click="closeOut" class="cursor-pointer" viewBox="0 0 512 512">
              <path
                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
              ></path>
            </svg>
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script>
/**
 * Form Inputs are us11ed to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the form `Textarea` element.
 */

export default {
  props: {
    value: {
      required: true,
    },
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
      name: {
        type: String,
        required: false,
        default: () => "",
      },
    },
    /**
     *items on Dropdown
     */
    options: {
      type: Array,
      required: false,
      default: () => [],
    },
    /**
     *Label for items on Dropdown
     */
    optionLabel: {
      type: String,
      required: false,
      default: () => null,
    },
    /**
     *index for items on Dropdown
     */
    optionKey: {
      type: String,
      required: false,
      default: () => null,
    },

    maxHeight: {
      type: String,
      default: () => "220px",
      required: false,
    },
    id: {
      type: String,
      default: () => "single-select",
      required: false,
    },
    /**
     *styles for dropwdown, but not important now
     */
    classes: {
      type: Object,
      required: false,
      default: () => {
        return {
          pointer: -1,
          wrapper: "single-select-wrapper",
          input: "search-input",
          icons: "icons",
          required: "required",
          activeClass: "active",
          dropdown: "dropdown",
        }
      },
    },
    initial: {
      type: String,
      required: false,
      default: () => null,
    },
    required: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    maxResults: {
      type: Number,
      required: false,
      default: () => 30,
    },
    tabindex: {
      type: String,
      required: false,
      default: () => {
        return ""
      },
    },
    /**
     *get label for selected item on dropdown
     */
    getOptionDescription: {
      type: Function,
      default: function(option) {
        if (this.optionKey && this.optionLabel) {
          return option[this.optionKey] + " " + option[this.optionLabel]
        }
        if (this.optionLabel) {
          return option[this.optionLabel]
        }
        if (this.optionKey) {
          return option[this.optionKey]
        }
        return option
      },
    },
    /**
     *get selected item on dropdown
     */
    getOptionValue: {
      type: Function,
      default: function(option) {
        if (this.optionKey) {
          return option[this.optionKey]
        }

        if (this.optionLabel) {
          return option[this.optionLabel]
        }

        return option
      },
    },
    /**
     *find match keywords in dropdown
     */
    filterBy: {
      type: Function,
      default: function(option) {
        if (this.optionLabel && this.optionKey) {
          return (
            option[this.optionLabel]
              .toString()
              .toLowerCase()
              .includes(this.searchText.toString().toLowerCase()) ||
            option[this.optionKey]
              .toString()
              .toLowerCase()
              .includes(this.searchText.toString().toLowerCase())
          )
        }

        if (this.optionLabel) {
          return option[this.optionLabel]
            .toString()
            .toLowerCase()
            .includes(this.searchText.toString().toLowerCase())
        }

        if (this.optionKey) {
          option[this.optionKey]
            .toString()
            .toLowerCase()
            .includes(this.searchText.toString().toLowerCase())
        }

        return option
          .toString()
          .toLowerCase()
          .includes(this.searchText.toString().toLowerCase())
      },
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside)
    document.addEventListener("keyup", this.handleClickOutside)
    if (this.value && this.options.includes(this.value)) {
      this.selectedOption = this.value
      return
    }
    this.searchText = this.initial
  },
  destroyed() {
    document.removeEventListener("keyup", this.handleClickOutside)
    document.removeEventListener("click", this.handleClickOutside)
  },
  data() {
    return {
      searchText: null,
      selectedOption: null,
      dropdownOpen: false,
    }
  },

  watch: {
    value(curr, prev) {
      this.selectedOption = curr
    },
    searchText(curr, prev) {
      if (curr !== prev) {
        this.pointer = -1
      }
    },
    selectedOption(curr, prev) {
      this.$emit("input", curr)
    },
    dropdownOpen(curr, prev) {
      if (curr === prev) {
        return
      }

      if (!curr) {
        this.searchText = null
        return
      }

      if (!this.searchText) {
        this.searchText = ""
      }

      this.$nextTick().then(() => {
        this.$refs.search.focus()
      })
    },
  },
  computed: {
    isRequired() {
      if (!this.required) {
        return ""
      }

      if (this.selectedOption) {
        return ""
      }

      return "required"
    },
    matchingOptions() {
      if (this.searchText === null) {
        return null
      }
      if (!this.searchText.length) {
        return [...this.options].slice(0, this.maxResults)
      }

      return this.options.filter(option => this.filterBy(option)).slice(0, this.maxResults)
    },
  },
  methods: {
    setPointerIdx(idx) {
      this.pointer = idx
    },
    seedSearchText() {
      if (this.searchText !== null) {
        return
      }

      this.searchText = ""
    },
    switchToSearch(event) {
      this.$refs.selectedValue.value = null
      this.searchText = event.target.value
      this.selectedOption = null
      this.dropdownOpen = true
    },
    toggleDropdown() {
      if (this.disabled) return
      this.dropdownOpen = !this.dropdownOpen
    },
    closeOut() {
      this.selectedOption = null
      this.dropdownOpen = false
      this.searchText = null
    },
    movePointerDown() {
      if (!this.matchingOptions) {
        return
      }
      if (this.pointer >= this.matchingOptions.length - 1) {
        return
      }

      this.pointer++
    },

    movePointerUp() {
      if (this.pointer > 0) {
        this.pointer--
      }
    },
    setOption() {
      if (!this.matchingOptions || !this.matchingOptions.length) {
        return
      }
      if (this.pointer === -1) {
        this.pointer++
      }

      this.selectedOption = this.matchingOptions[this.pointer]
      this.searchText = null
      this.dropdownOpen = false
      this.pointer = -1
      this.$nextTick().then(() => {
        this.$refs.match.focus()
      })
    },
    handleClickOutside(e) {
      if (this.$el.contains(e.target)) {
        return
      }

      this.dropdownOpen = false
      this.searchText = null
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
    color: set-text-color(#2ca4ab, $color-white);
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

.w-full {
  width: 100%;
}
.inline-block {
  display: inline-block;
}

.flex {
  display: flex;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.items-center {
  align-items: center;
}

.px-2 {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.mt-px {
  margin-top: 1px;
}
.list-reset {
  list-style: none;
  padding: 0;
}
.overflow-auto {
  overflow: auto;
}
.appearance-none {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.icons {
  padding: 0 1em;
  right: 0;
  top: 0;
  bottom: 0;
  fill: #606f7b;
}
.icons svg {
  width: 0.75em;
  height: 0.75em;
}
.single-select-wrapper {
  position: relative;
  margin-bottom: 0.5em;
}

.cursor-pointer {
  cursor: pointer;
}
.dropdown {
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  color: #606f7b;
  border-radius: 0.25em;
  line-height: 1.25;
  text-align: left;
}
.dropdown > li {
  padding: 0.5em 0.75em;
}
</style>
<docs>
  ```jsx
  <div>
    <PkDropdown label="Input Medium" placeholder="Write your text" :options="[1,2,3]"  id="input-0" size="medium" />
    <PkDropdown label="Input Large" placeholder="Write your text" :options="[1,2,3]"     id="input-1" size="large" />
    <PkDropdown label=":hover" state="hover" :options="[1,2,3]" placeholder="Write your text" id="input-2" />
    <PkDropdown label=":focus" state="focus":options="[1,2,3]"  placeholder="Write your text" id="input-3" />
    <PkDropdown label="[disabled]" disabled :options="[1,2,3]" value="Write your text" id="input-4" />
  </div>
  ```
</docs>
