<!-- 10/12/2021 CN JLAYAOG -->
<template>
  <input :value="value" @change="$emit('change')" class="form-control icon" :ref="elRef" :placeholder="format">
</template>

<script>
import Pikaday from "pikaday";
import "pikaday/css/pikaday.css";

export default {
  props: {
    value: { require: true },
    format: { default: "YYYY-MM-DD" },
    options: { default: {} },
    elRef: { require: true}
  },
  mounted() {
    const datePicker = new Pikaday({
      field: this.$refs[this.elRef],
      format: this.format,
      onSelect: () => {
        this.$emit("input", datePicker.toString());
      },
      ...this.options
    });
  },
  // methods:{
  //   onChange(event){
  //     this.$emit("change",event.target.value)
  //   }
  // }
};
</script>
<style scoped>
.icon {
    padding-right: calc(1.5em + .75rem);
    background-image: url(../assets/images/calendar-check.svg);
    background-repeat: no-repeat;
    background-position: center right calc(.375em + .1875rem);
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
     font-size: 12px;
}


</style>