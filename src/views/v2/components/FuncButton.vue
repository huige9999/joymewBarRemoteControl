<template>
    <div class="func-button" @click="handleClick">
        <div class="button-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FuncButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    },
  },
};
</script>

<style scoped>
.func-button {
    display: inline-block;
    background: #FFFFFF;
    border-radius: 19px 19px 19px 19px;
    font-size: 30px;
    font-weight: bold;
    color: #3E80F8;
    padding: 11px 19px 6px 19px;
}
</style>
