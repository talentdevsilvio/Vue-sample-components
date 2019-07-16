<template>
  <div style="width: 200px;">
    <div class="pk-select-input-wrapper">
      <input type="text" class="pk-select-input" placeholder="Type to search" />
      <div class="pills" v-show="selectedOptions.length > 0">
        <div v-for="option in selectedOptions" class="pill" @click="removeSelectedOption(option)">
          {{ option }}
          <Icon name="x" size="xs" class="icon" />
        </div>
      </div>
    </div>
    <div class="options">
      <div
        v-for="option in availableOptions"
        :key="option"
        class="option"
        @click="handleClickedOption(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PkSelect",
  status: "ready",
  release: "1.0.0",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedOptions: [],
      availableOptions: this.options,
    }
  },
  methods: {
    handleClickedOption(option) {
      if (this.selectedOptions.indexOf(option) > -1) {
        this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1)
        this.availableOptions.push(option)
      } else {
        this.selectedOptions.push(option)
        this.availableOptions.splice(this.availableOptions.indexOf(option), 1)
      }
    },
    removeSelectedOption(option) {
      this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1)
      this.availableOptions.push(option)
    },
  },
}
</script>
<style scoped>
.icon {
  position: absolute;
  right: 5px;
  top: -4px;
}

.pill {
  cursor: pointer;
  font-family: "Gilroy";
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  background-color: #627e8c;
  font-size: 10px;
  color: white;
  margin-right: 8px;
  padding: 0 16px;
  position: relative;
}

.pills {
  margin: 8px;
  display: flex;
  align-items: center;
}

.options {
  margin-top: 8px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.option {
  cursor: pointer;
  font-family: "Gilroy";
  padding: 8px;
  color: #2ca4ab;
}

.option:hover {
  background-color: #2ca4ab;
  color: white;
}

input:focus {
  outline: none;
}

input {
  font-family: "Gilroy";
  padding: 8px;
  color: #2ca4ab;
  background: white;
  font-size: 18px;
  line-height: 140%;
}

.pk-select-input {
  border: 0;
  border-bottom: solid 2px #2ca4ab;
  height: 42px;
}

input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #c5e1e1;
  opacity: 1;
  /* Firefox */
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c5e1e1;
}

input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #c5e1e1;
}
</style>
<docs>
    ```jsx
    <PkSelect :options="['Kitchen', 'Bathroon']"></PkSelect>
    ```
</docs>
