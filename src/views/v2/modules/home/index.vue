<template>
  <div class="home-container">
    <!-- 顶部区域 -->
    <div class="top-section">
      <div
        class="gift-rank"
        @click="showGiftRankPopup"
      >
        <i class="iconfont icon-bangdan"></i>
        礼物榜
        <div class="user-avatars">
          <img
            v-for="user in giftRankUsersTop3"
            :key="user.userId"
            :src="user.avator"
            class="avatar"
          />
          <span
            v-if="giftSenderRankList.length > 3"
            class="more"
          >
            ...
          </span>
        </div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="bottom-section">
      <!-- 左侧区域（消息列表） -->
      <div class="left-section">
        <MessageItem
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
          @block-user="handleBlockUser"
        />
      </div>
      <!-- 右侧区域（数字统计） -->
      <div class="right-section">
        <div class="stat-item" @click="toggleHeaderIcon('hb')">
          <i class="iconfont icon-hongbao"></i>
          {{ balance }}
        </div>
        <div class="stat-item" @click="toggleHeaderIcon('sign')">
          <i class="iconfont icon-lianxiren"></i>
          {{ person }}
        </div>
        <div
          class="stat-item"
          @click="toggleSongLib"
        >
          <i class="iconfont icon-diange"></i>
        </div>
      </div>
    </div>

    <!-- 礼物榜弹窗 -->
    <van-popup
      v-model="giftRankVisible"
      position="bottom"
      :style="{ height: '60%' }"
      round
    >
      <div class="gift-rank-popup">
        <div class="popup-header">祝福礼物排行榜</div>
        <div class="gift-rank-list">
          <div
            v-for="(user, index) in giftSenderRankList"
            :key="user.userId"
            class="gift-rank-item"
          >
            <div class="avatar-wrap">
              <img
                :src="user.avator"
                class="avatar"
              />
              <span class="num">{{ index + 1 }}</span>
            </div>
            <div class="relative">{{ user.positionName }}</div>
            <div class="nickname">{{ user.wx_name }}</div>
            <div class="consume-wrap">
              <span class="key">祝福礼物总金额</span>
              <span class="value">{{ user.money }}元</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 音乐库播放控制弹窗 -->
      <van-popup
      v-model="musicLibraryVisible"
      position="bottom"
      :style="{ height: '80%' }"
      round
    >
      <MusicLibPlay />
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MessageItem from './MessageItem.vue';
import MusicLibPlay from './MusicLibPlay.vue';

export default {
  name: 'Home',
  components: {
    MessageItem,
    MusicLibPlay,
  },
  data() {
    return {
      giftRankVisible: false,
      musicLibraryVisible: false,
    };
  },
  computed: {
    ...mapState({
      messages: (state) => state.chat.chatList,
      giftSenderRankList: (state) => state.gift.giftSenderRankList,
      balance: (state) => state.live.balance,
      person: (state) => state.live.person,
    }),
    giftRankUsersTop3() {
      return this.giftSenderRankList.slice(0, 3);
    },
  },
  methods: {
    showGiftRankPopup() {
      this.giftRankVisible = true;
    },
    handleBlockUser(message) {
      // 处理用户被加入黑名单的逻辑
      console.log('用户已被加入黑名单:', message);
      // 这里可以调用API或更新本地状态
    },
    async toggleSongLib(needTogglePopup = true) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action: 'toggleSongLib',
      });
      if (needTogglePopup) {
        this.musicLibraryVisible = !this.musicLibraryVisible;
      }
      this.$toast.clear();
    },
    async toggleHeaderIcon(type) {
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'global_control',
        action: 'toggle_header_icon',
        param: type,
      });
    },
  },
  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          const container = this.$el.querySelector('.left-section');
          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth',
            });
          }
        });
      },
      deep: true,
    },
    musicLibraryVisible(newVal, oldVal) {
      // 当弹窗从打开状态变为关闭状态时执行
      if (oldVal === true && newVal === false) {
        this.toggleSongLib(false);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.home-container {
  padding: 0 28px 0 32px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .top-section {
    padding-top: 50px;
    margin-bottom: 37px;
    font-size: 22px;
    color: #fff;

    .gift-rank {
      display: flex;
      align-items: center;
      padding-left: 24px;
      width: 302px;
      height: 54px;
      border-radius: 27px 27px 27px 27px;
      border: 2px solid #ffffff;
      margin-left: auto;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .icon-bangdan {
        margin-right: 8px;
        font-size: 28px;
      }

      .user-avatars {
        margin-left: 14px;

        .avatar {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          margin-right: 2px;

          &:nth-child(3) {
            margin-right: 0;
          }
        }

        .more {
          font-size: 28px;
          margin-left: 12px;
          vertical-align: 10px;
        }
      }
    }
  }

  .bottom-section {
    display: flex;
    flex: 1;
    overflow-y: auto;
    .left-section {
      scroll-behavior: smooth;
      flex: 1;
      padding: 10px;
      overflow-y: auto;
    }

    .right-section {
      .stat-item {
        width: 119px;
        height: 43px;
        border-radius: 27px 27px 27px 27px;
        border: 2px solid #ffffff;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 22px;
        font-weight: 500;
        padding-left: 22px;

        &:not(:last-child) {
          margin-bottom: 20px;
        }
        &:last-child {
          width: 80px;
          margin-left: auto;
        }

        .iconfont {
          margin-right: 10px;
          font-size: 28px;
        }
      }
    }
  }
}

.van-popup.van-popup--round.van-popup--bottom {
  border-radius: 30px 30px 0 0;
}

// 礼物榜弹窗样式
.gift-rank-popup {
  display: flex;
  flex-direction: column;
  height: 100%;
  .popup-header {
    text-align: center;
    height: 104px;
    padding-top: 34px;
    font-weight: 500;
    font-size: 30px;
  }

  .gift-rank-list {
    padding-left: 35px;
    color: #000000;
    font-size: 22px;
    flex: 1;
    overflow-y: auto;
    .gift-rank-item {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
      .avatar-wrap {
        width: 73px;
        height: 73px;
        position: relative;

        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .num {
          display: block;
          width: 26px;
          height: 26px;
          background: #5998ff;
          border: 2px solid #ffffff;
          position: absolute;
          bottom: -13px;
          left: 0;
          right: 0;
          margin: auto;
          font-size: 18px;
          color: #fff;
          border-radius: 50%;
          text-align: center;
          line-height: 26px;
        }
      }
      .relative {
        margin-left: 26px;
        width: 91px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .nickname {
        margin-left: 41px;
        width: 132px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .consume-wrap {
        margin-left: 41px;
        .value {
          margin-left: 41px;
          color: #5998ff;
        }
      }
    }
  }
}
</style>
