<template>
  <div class="multiMediaBox">
    <div class="nav">
      <div
        class="navItem publicHCenter"
        :class="{ active: currentNavId === item.id }"
        v-for="item in navList"
        :key="item.id"
        @click="chooseNav(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="listWrap publicHCenter">
      <div
        class="listItem publicHvCenter"
        v-for="item in mediaList"
        :key="item.id"
        :class="{ active: item.id === currentMediaId }"
        @click="chooseMedia(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { CODE } from '@/assets/constant/index';
import sendInstrunction from '@/api/sendCode';

const NAVS = [
  {
    id: 1,
    name: '播放视频',
  },
  {
    id: 2,
    name: '画面定格',
  },
];
export default {
  name: 'multiMedia',
  computed: {
    ...mapState({
      mediaList: (state) => state.mediaList,
    }),
  },
  props: {
    navIdProp: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    navIdProp: {
      handler(newVal) {
        this.currentNavId = newVal;
      },
      immediate: true,
    },
  },
  data() {
    return {
      navList: NAVS,
      currentNavId: 1,
      currentMediaId: '',
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    chooseNav(id) {
      this.currentNavId = id;
      const tmpCode = id === 1 ? CODE.VIDEOPLAYOPEN : CODE.FIXEDSCREENOPEN;
      sendInstrunction({
        code: tmpCode,
      });
    },
    chooseMedia(id) {
      this.currentMediaId = id;
      sendInstrunction({
        code: CODE.MULTIMEDIAPLAY,
        param: this.currentMediaId,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.multiMediaBox {
  width: 750px;
  padding-bottom: 144px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: rgba(1, 9, 22, 0.96);
  .nav {
    height: 72px;
    position: relative;
    display: flex;
    align-items: flex-end;
    .navItem {
      font-size: 26px;
      font-weight: 400;
      margin-left: 35px;
      color: rgba(255, 255, 255, 0.4);
      position: relative;
      &.active {
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
        &::after {
          display: block;
          content: '';
          width: 20px;
          height: 4px;
          background: #ffffff;
          border-radius: 4px;
          position: absolute;
          bottom: -8px;
        }
      }
    }
  }
  .listWrap {
    flex-wrap: wrap;
    margin-top: 40px;
    .listItem {
      margin: 0 10px;
      margin-bottom: 20px;
      width: 216px;
      height: 84px;
      background: rgba(255, 255, 255, 0.16);
      border: 2px solid #65697c;
      border-radius: 78px;
      font-size: 28px;
      font-weight: 400;
      color: #ffffff;
      &.active {
        background: linear-gradient(90deg, #fc4d88, #fd024f 100%);
      }
    }
  }
}
</style>
