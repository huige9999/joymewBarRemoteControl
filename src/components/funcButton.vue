<template>
  <div
    class="funcButton publicHvCenter"
    :style="{ width: bWidth, height: bHeight, fontSize: bFontSize }"
    @click="handleClick"
    :class="{ active: isBtnActive}"
  >
    <slot></slot>
  </div>
</template>
<script>
import { timeoutTask } from '@/utils/index';

export default {
  name: 'funcButton',
  computed: {},
  data() {
    return {
      isBtnActive: false,
    };
  },
  props: {
    bWidth: {
      type: String,
      default: '32vw',
    },
    bHeight: {
      type: String,
      default: '10.67vw',
    },
    bFontSize: {
      type: String,
      default: '4.27vw',
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      this.isBtnActive = true;
      timeoutTask(() => {
        this.isBtnActive = false;
        this.$emit('clickEvent');
      }, 200);
    },
  },
};
</script>
<style lang="less" scoped>
.funcButton {
  margin-bottom: 30px;
  border-radius: 28px;
  color: #fff;
  border: 2px solid #fff;
  transition: all 0.2s linear;
  &.active {
    background-color: rgba(255, 255, 255, 0.6);
  }
}
</style>
