<template>
  <div class="message-item">
    <div class="top">
      <img :src="message.avatar" class="avatar" />
      <div class="nickname">{{ message.nickname }}</div>
      <i class="iconfont icon-close" @click="handleBlockUser"></i>
    </div>
    <div class="content">
      <!-- 礼物信息展示区域 -->
      <div class="gift-info" v-if="message.giftTypeInfo">
        <div class="send-text">
          <span class="gift-action-text">送来了</span>
          <span class="gift-name">{{ message.giftTypeInfo.label }}</span>
        </div>
        <div class="send-img">
          <!-- 礼物图标 -->
          <img
            v-if="message.giftImage"
            :src="message.giftImage"
            class="gift-icon"
          />
        </div>
      </div>
      <!-- 普通文本消息 -->
      <div class="message-content" v-if="message.content">
        {{ message.content }}
      </div>
      <!-- 照片 -->
      <div class="photo-wrap" v-if="message.photo">
        <img :src="message.photo" class="photo-img" />
      </div>
    </div>
    <div class="footer">
      <div class="send-time">{{ message.sendDateTime }}</div>
     <div class="resend-btn" v-if="shouldShowResendButton(message)" @click="handleResendGift">
        重发一次
      </div>
    </div>
  </div>
</template>

<script>
import { addBlackList, resendGiftMsgToWs } from '@/api/indexV2';

export default {
  name: 'MessageItem',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleBlockUser() {
      this.$dialog
        .confirm({
          message: '是否将该用户加入本场活动的黑名单？',
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          className: 'custom-blacklist-dialog',
          confirmButtonColor: '#ee0a24',
          cancelButtonColor: '#666',
        })
        .then(async () => {
          // 点击确认后的逻辑
          try {
            await addBlackList({ userId: this.message.userId, type: '1' });
            this.$toast.success('用户已加入黑名单');
            this.$emit('block-user', this.message);
          } catch (e) {
            this.$toast.fail('拉黑失败');
          }
        })
        .catch(async () => {
          // 点击取消后的逻辑，执行取消拉黑
          try {
            await addBlackList({ userId: this.message.userId, type: '0' });
            this.$toast.success('已取消拉黑');
          } catch (e) {
            this.$toast.fail('取消拉黑失败');
          }
        });
    },
    async handleResendGift() {
      try {
        await this.resendGiftCommon();
        this.$toast.success('重发成功');
      } catch (e) {
        this.$toast.fail('重发失败');
      }
    },
    resendGiftCommon() {
      // 直接调用新版重发礼物接口
      return resendGiftMsgToWs({
        userId: this.message.userId,
        giftid: this.message.giftId,
        miaoContent: this.message.rawContent,
      });
    },
    shouldShowResendButton(message) {
      return message.giftId && message.giftTypeInfo && message.giftTypeInfo.value !== 'hbkd';
    },
  },
};
</script>

<style lang="less" scoped>
.message-item {
  margin-bottom: 19px;
  width: 397px;
  min-height: 203px;
  background: linear-gradient(180deg, #ffffff 0%, #c1daff 100%);
  box-shadow: inset 0px 7 19px 0px rgba(255, 255, 255, 0.3);
  border-radius: 19px 19px 19px 19px;
  border: 2px solid #ffffff;
  padding: 21px 19px 17px 22px;

  &:last-child {
    margin-bottom: 0;
  }

  .top {
    display: flex;
    align-items: center;
    position: relative;

    .avatar {
      width: 49px;
      height: 49px;
      border-radius: 50%;
    }

    .nickname {
      width: 257px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #497fe1;
      font-size: 22px;
      margin-left: 13px;
    }

    .icon-close {
      color: #3a81f5;
      font-size: 24px;
      font-weight: 600;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;

      &:hover {
        color: #ee0a24;
      }
    }
  }

  .content {
    display: flex;
    position: relative;
    margin-top: 19px;
    flex-direction: column;
    .gift-info {
      width: 100%;
      .send-text {
        color: #ff80a0;
        font-size: 28px;
        margin-bottom: 10px;
        .gift-action-text {
          margin-right: 4px;
        }
      }

      .send-img {
        text-align: right;
        .gift-icon {
          // 礼物图标样式
          width: 200px;
          height: 200px;
          object-fit: contain;
        }
      }
    }

    .message-content {
      color: #ff80a0;
      font-size: 28px;
      white-space: pre-line;
    }

    .photo-wrap {
      width: 100%;
      text-align: right;
      .photo-img {
        width: 200px;
        height: 200px;
        object-fit: contain;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 11px;
    font-size: 17px;

    .send-time {
      color: #3a81f5;
    }

    .resend-btn {
      color: #fff;
      background: #3a81f5;
      border-radius: 10px;
      width: 101px;
      height: 35px;
      font-size: 17px;
      text-align: center;
      line-height: 35px;
    }
  }
}
</style>
