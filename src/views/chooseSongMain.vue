<template>
  <div class="main">
    <div class="header publicVCenter">
      <img
        src="@/assets/image/scanQRCode.png"
        @click="openQrcode"
      />
      <div class="title">驻场音乐</div>
      <img
        src="@/assets/image/toHome.png"
        @click="toHome"
      />
    </div>
    <div class="songList">
      <div
        class="songItem"
        @click="chooseTargetSongOrder(item)"
        @touchstart="startPress(item)"
        @touchend="stopPress"
        v-for="item in songOrderList"
        :key="item.heart_wall_id"
        :class="{
          wait: item.sort === 0 && currentSongOrderId !== item.heart_wall_id,
          end: item.sort === 1 && currentSongOrderId !== item.heart_wall_id,
          in: currentSongOrderId === item.heart_wall_id,
        }"
      >
        <div class="songName">{{ item.title }}</div>
        <div class="songStatus">{{ statusFilter(item.sort, item.heart_wall_id) }}</div>
      </div>
    </div>
    <div class="menusBottom">
      <div
        class="menuSong prev publicHvCenter"
        @click="prevSongOrder"
      >
        上一首
      </div>
      <div
        class="menuSong next publicHvCenter"
        @click="nextSongOrder"
      >
        下一首
      </div>
      <div
        class="menuToHome publicHvCenter"
        @click="toHome"
      >
        回到首页
      </div>
    </div>
  </div>
</template>
<script>
import { editMusicStatus, getMusicList } from '@/api/index';
import sendInstrunction from '@/api/sendCode';
import { CODE } from '@/assets/constant/index';
import { mapState } from 'vuex';

export default {
  name: 'chooseSongMain',
  computed: {
    ...mapState({
      currentSongId: (state) => state.currentSongId,
    }),
    currentSongOrderIndex() {
      return this.songOrderList.findIndex((item) => item.heart_wall_id === this.currentSongOrderId);
    },
    songOrderListLength() {
      return this.songOrderList.length;
    },
  },
  components: {},
  data() {
    return {
      pressTimer: null,
      songOrderList: [
        {
          id: 1,
          songName: '小幸运',
          status: 1, // 取值 0: 待唱 1: 已唱
        },
        {
          id: 2,
          songName: '暖暖',
          status: 1,
        },
        {
          id: 3,
          songName: '今天我要结婚了',
          status: 1,
        },
        {
          id: 4,
          songName: '青花瓷',
          status: 0,
        },
        {
          id: 5,
          songName: '今天我要结婚了',
          status: 1,
        },
        {
          id: 6,
          songName: '今天我要结婚了',
          status: 1,
        },
        {
          id: 7,
          songName: '今天我要结婚了',
          status: 1,
        },
        {
          id: 8,
          songName: '今天我要结婚了',
          status: 1,
        },
      ],
      currentSongOrderId: undefined, // 当前唱的点歌
    };
  },
  created() {
    this.requestMusicList();
  },
  watch: {
    currentSongId: {
      handler(newVal) {
        if (newVal) {
          this.currentSongOrderId = newVal;
          const targetIndex = this.songOrderList.findIndex((item) => item.heart_wall_id === this.currentSongOrderId);
          editMusicStatus({
            // heart_wall_id: targetSongOrder.heart_wall_id,
            heart_wall_id: this.currentSongOrderId,
            sort: 1,
          })
            .then((res) => {
              console.log('修改状态:', res);
              this.requestMusicList(targetIndex);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      setter(newVal) {
        return newVal;
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    async toHome() {
      await sendInstrunction({
        code: CODE.HOME,
      });
      this.$router.replace({
        path: '/controller',
      });
    },
    async openQrcode() {
      await sendInstrunction({
        code: CODE.QRCODE,
      });
    },
    async updateData(orderId) {
      await sendInstrunction({
        code: CODE.ORDERSONGUPDATE,
        param: orderId,
      });
    },
    chooseTargetSongOrder(targetSongOrder) {
      if (targetSongOrder.heart_wall_id === this.currentSongOrderId) {
        return;
      }
      const targetSongOrderIndex = this.songOrderList.findIndex((item) => item.heart_wall_id === targetSongOrder.heart_wall_id);
      if (targetSongOrder.sort === 1) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '该歌曲已唱过,是否需要再唱一遍?',
          })
          .then(() => {
            editMusicStatus({
              // heart_wall_id: targetSongOrder.heart_wall_id,
              heart_wall_id: this.currentSongOrderId,
              sort: 1,
            })
              .then((res) => {
                console.log('修改状态:', res);
                this.requestMusicList(targetSongOrderIndex);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch(() => {});
      } else {
        editMusicStatus({
          // heart_wall_id: targetSongOrder.heart_wall_id,
          heart_wall_id: this.currentSongOrderId,
          sort: 1,
        })
          .then((res) => {
            console.log('修改状态:', res);
            this.requestMusicList(targetSongOrderIndex);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    resetTargetSongOrder(targetSongOrder) {
      if (targetSongOrder.heart_wall_id === this.currentSongOrderId) {
        return;
      }
      if (targetSongOrder.sort === 0) {
        return;
      }
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否重置该歌曲状态为待唱?',
        })
        .then(() => {
          editMusicStatus({
            heart_wall_id: targetSongOrder.heart_wall_id,
            sort: 0,
          })
            .then((res) => {
              console.log('修改状态:', res);
              this.requestMusicList(-1);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    prevSongOrder() {
      if (this.currentSongOrderIndex === -1) {
        this.$toast('当前没有歌曲在唱!');
        return;
      }
      if (this.currentSongOrderIndex === 0) {
        this.$toast('已经是第一首了!');
        return;
      }
      const tmpPrevSongSort = this.songOrderList[this.currentSongOrderIndex - 1].sort;
      if (tmpPrevSongSort === 1) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '该歌曲已唱过,是否需要再唱一遍?',
          })
          .then(() => {
            editMusicStatus({
              heart_wall_id: this.songOrderList[this.currentSongOrderIndex].heart_wall_id,
              sort: 1,
            })
              .then((res) => {
                console.log('修改状态:', res);
                this.requestMusicList(this.currentSongOrderIndex - 1);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch(() => {});
      } else {
        editMusicStatus({
          heart_wall_id: this.songOrderList[this.currentSongOrderIndex].heart_wall_id,
          sort: 1,
        })
          .then((res) => {
            console.log('修改状态:', res);
            this.requestMusicList(this.currentSongOrderIndex - 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    nextSongOrder() {
      if (this.currentSongOrderIndex === -1) {
        this.$toast('当前没有歌曲在唱!');
        return;
      }
      if (this.currentSongOrderIndex === this.songOrderListLength - 1) {
        this.$toast('已经是最后一首了!');
        return;
      }
      const tmpNextSongSort = this.songOrderList[this.currentSongOrderIndex + 1].sort;
      if (tmpNextSongSort === 1) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '该歌曲已唱过,是否需要再唱一遍?',
          })
          .then(() => {
            editMusicStatus({
              heart_wall_id: this.songOrderList[this.currentSongOrderIndex].heart_wall_id,
              sort: 1,
            })
              .then((res) => {
                console.log('修改状态:', res);
                this.requestMusicList(this.currentSongOrderIndex + 1);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch(() => {});
      } else {
        editMusicStatus({
          heart_wall_id: this.songOrderList[this.currentSongOrderIndex].heart_wall_id,
          sort: 1,
        })
          .then((res) => {
            console.log('修改状态:', res);
            this.requestMusicList(this.currentSongOrderIndex + 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    statusFilter(status, id) {
      if (id === this.currentSongOrderId) {
        return '进行中';
      } if (status === 0) {
        return '待唱';
      } if (status === 1) {
        return '已唱';
      }
      return '其他状态';
    },
    requestMusicList(targetIndex) {
      getMusicList()
        .then((res) => {
          console.log('musicList:', res);
          this.songOrderList = res.data.list;
          if (targetIndex > -1) {
            this.currentSongOrderId = this.songOrderList[targetIndex].heart_wall_id;
            this.updateData(this.currentSongOrderId);
          } else if (targetIndex === -1) {
            console.log('空操作！');
            this.updateData('noneId');
          } else {
            const tmpIndex = this.songOrderList.findIndex((item) => item.sort === 0);
            if (tmpIndex > -1) {
              this.currentSongOrderId = this.songOrderList[tmpIndex].heart_wall_id;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    startPress(targetSongOrder) {
      if (this.pressTimer) {
        return;
      }
      this.pressTimer = setTimeout(() => {
        console.log('长按事件结束');
        this.resetTargetSongOrder(targetSongOrder);
      }, 1000); // 这里设置为1秒，以区分长按和点击
    },
    stopPress() {
      if (this.pressTimer) {
        clearTimeout(this.pressTimer); // 清除定时器
        this.pressTimer = null;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-size: 100% 100%;
  background-image: url('../assets/image/song.png');
  padding-top: 180px;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 50px 30px;
    padding-bottom: 0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    img {
      width: 68px;
      height: 68px;
    }
    .title {
      font-size: 32px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .songList {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    height: calc(100vh - 440px);
    overflow-y: scroll;
    padding-bottom: 80px;
    .songItem {
      flex-shrink: 0;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      width: 686px;
      height: 136px;
      padding: 0 32px;
      align-items: center;
      margin-bottom: 18px;
      .songName {
        font-size: 36px;
      }
      .songStatus {
        font-size: 36px;
      }
      &.wait {
        background: linear-gradient(180deg, #544ba8, #544ba8 100%);
        .songName {
          color: #ece9ff;
        }
        .songStatus {
          color: #ffffff;
        }
      }
      &.in {
        background-color: #ffffff;
        .songName {
          color: #333333;
        }
        .songStatus {
          color: #fb5aa7;
        }
      }
      &.end {
        background-color: #2b243f;
        .songName {
          color: #ece9ff;
        }
        .songStatus {
          color: #ffffff;
        }
      }
    }
  }
  .menusBottom {
    position: absolute;
    bottom: 0;
    height: 320px;
    width: 100%;
    padding: 40px;
    padding-top: 60px;
    background-color: #fff;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    column-gap: 100px;
    row-gap: 20px;
    justify-items: center;
    .menuSong {
      padding: 10px 44px;
      border-radius: 8px;
      color: #fff;
      font-size: 36px;
      width: max-content;
      height: max-content;
      &.prev {
        background-color: #c5c5c5;
      }
      &.next {
        background-color: #6d46e5;
      }
      &:nth-child(1) {
        justify-self: end;
      }
      &:nth-child(2) {
        justify-self: start;
      }
    }
    .menuToHome {
      width: max-content;
      height: max-content;
      padding: 10px 56px;
      border-radius: 8px;
      color: #6d46e5;
      grid-area: 2 / 1 / span 2 / span 1;
      border: 2px solid #6d46e5;
    }
  }
}
</style>
