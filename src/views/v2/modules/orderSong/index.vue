<template>
  <div class="sign-wrap">
    <div class="page-title-wrap">
      <button class="back-button" @click="handleBackToMenu">返回</button>
      <PageTitleWrap :pageTitle="pageTitle" />
    </div>
    <div class="songList" :class="{ 'songList-empty': songOrderList.length === 0 }">
      <template v-if="songOrderList.length > 0">
        <div
          class="songItem"
          v-for="item in songOrderList"
          :key="item.heart_wall_id"
          :class="{
            wait: item.sort === 0 && currentSongOrderId !== item.heart_wall_id,
            end: item.sort === 1 && currentSongOrderId !== item.heart_wall_id,
            in: currentSongOrderId === item.heart_wall_id,
          }"
          @click="chooseTargetSongOrder(item)"
          @touchstart="startPress(item)"
          @touchend="stopPress"
        >
          <div class="songName">{{ item.title }}</div>
          <div class="songStatus">{{ statusFilter(item.sort, item.heart_wall_id) }}</div>
        </div>
      </template>
      <template v-else>
        <div class="no-song">暂无歌曲</div>
      </template>
    </div>
    <div class="func-button-container">
      <FuncButton @click="prevSongOrder" class="func-button">上一首</FuncButton>
      <FuncButton @click="nextSongOrder" class="func-button">下一首</FuncButton>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PageTitleWrap from '@/views/v2/components/PageTitle.vue';
import FuncButton from '@/views/v2/components/FuncButton.vue';
import { editMusicStatus, getMusicList } from '@/api/index';

export default {
  name: 'OrderSong',
  components: {
    PageTitleWrap,
    FuncButton,
  },
  data() {
    return {
      pressTimer: null,
      songOrderList: [],
      currentSongOrderId: undefined,
      pageTitle: '点歌',
    };
  },
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
            heart_wall_id: this.currentSongOrderId,
            sort: 1,
          })
            .then(() => {
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
  methods: {
    handleBackToMenu() {
      this.$emit('back-to-menu');
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
              .then(() => {
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
          .then(() => {
            this.requestMusicList(this.currentSongOrderIndex - 1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
              heart_wall_id: this.currentSongOrderId,
              sort: 1,
            })
              .then(() => {
                this.requestMusicList(targetSongOrderIndex);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch(() => {});
      } else {
        editMusicStatus({
          heart_wall_id: this.currentSongOrderId,
          sort: 1,
        })
          .then(() => {
            this.requestMusicList(targetSongOrderIndex);
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
              .then(() => {
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
          .then(() => {
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
      }
      if (status === 0) {
        return '待唱';
      }
      if (status === 1) {
        return '已唱';
      }
      return '其他状态';
    },
    requestMusicList(targetIndex) {
      getMusicList()
        .then((res) => {
          this.songOrderList = res.data.list || [];
          if (targetIndex > -1) {
            this.currentSongOrderId = this.songOrderList[targetIndex]?.heart_wall_id;
            this.updateData(this.currentSongOrderId);
          } else if (targetIndex === -1) {
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
        this.resetTargetSongOrder(targetSongOrder);
      }, 1000);
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
            .then(() => {
              this.requestMusicList(-1);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    stopPress() {
      if (this.pressTimer) {
        clearTimeout(this.pressTimer);
        this.pressTimer = null;
      }
    },
    async updateData(param) {
      if (this.$toast && this.$toast.loading) {
        this.$toast.loading({
          message: '加载中...',
          duration: 0,
        });
      }
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'orderSongUpdate',
        param,
      });
      if (this.$toast && this.$toast.clear) {
        this.$toast.clear();
      }
    },
  },
};
</script>

<style scoped>
.sign-wrap {
  height: 100%;
}
.page-title-wrap {
  position: relative;
}
.back-button {
  position: absolute;
  left: 32px;
  top: 64px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 26px;
  color: #ffffff;
  font-size: 28px;
  padding: 12px 32px;
  backdrop-filter: blur(4px);
}
.back-button:active {
  opacity: 0.8;
}
.func-button-container {
  display: flex;
  margin-top: 39px;
  justify-content: center;
  margin-top: 5.2vw;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 4vw;
  column-gap: 4vw;
  padding: 0 4vw;
}
.songList {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 400px;
  overflow-y: scroll;
}
.songList-empty {
  height: 100px;
  justify-content: center;
}
.no-song {
  font-size: 36px;
  color: #333333;
}
.songItem {
  flex-shrink: 0;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  width: 686px;
  height: 100px;
  padding: 0 32px;
  align-items: center;
}
.songName {
  font-size: 32px;
}
.songStatus {
  font-size: 32px;
}
.songItem.wait {
  background: linear-gradient(180deg, #544ba8, #544ba8 100%);
}
.songItem.wait .songName {
  color: #ece9ff;
}
.songItem.wait .songStatus {
  color: #ffffff;
}
.songItem.in {
  background-color: #ffffff;
}
.songItem.in .songName {
  color: #333333;
}
.songItem.in .songStatus {
  color: #fb5aa7;
}
.songItem.end {
  background-color: #2b243f;
}
.songItem.end .songName {
  color: #ece9ff;
}
.songItem.end .songStatus {
  color: #ffffff;
}
</style>
