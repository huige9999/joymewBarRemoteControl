<template>
  <div class="giftBox">
    <div class="nav publicVCenter">
      <div
        class="navItem"
        :class="{ active: giftNavId === item.id }"
        v-for="item in giftTitleList"
        :key="item.id"
        @click="chooseGiftNav(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="giftListWrap">
      <van-swipe class="gift-swipe" :loop="false" indicator-color="white" ref="swiper" @change="onChange">
        <van-swipe-item class="page" :key="index" v-for="(group, index) in giftList">
          <div v-for="gift in group" class="item publicHvCenter" :key="gift.giftconst" @click="chooseGiftType(gift.giftconst)">
            <img class="giftImg" :src="gift.imglink" :class="{ active: gift.giftconst === currentGiftType }" />
            <div class="name" v-show="gift.giftconst !== currentGiftType">{{ gift.giftname }}</div>
            <div class="price publicHvCenter" v-show="gift.giftprice" :class="{ active: gift.giftconst === currentGiftType }">
              <img src="@/assets/image/diamond.png" class="unit" />{{ gift.giftprice }}
            </div>
            <div class="activeBox" v-show="gift.giftconst === currentGiftType">
              <div class="sendBtn publicHvCenter" @click="send">赠送</div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { sendGiftMessage } from '@/api/index';

export default {
  name: 'gift',
  computed: {
    ...mapState({
      giftTitleList: (state) => state.giftTitleList,
      giftList: (state) => state.giftList,
      giftListAll: (state) => state.giftListAll,
    }),
  },
  data() {
    return {
      giftNavId: 'list1',
      currentGiftType: '',
    };
  },
  components: {},
  created() {},
  methods: {
    chooseGiftNav(g) {
      this.giftNavId = g;
      const targetIndex = this.giftTitleList.findIndex((item) => item.id === this.giftNavId);
      this.$refs.swiper.swipeTo(targetIndex);
    },
    chooseGiftType(g) {
      this.currentGiftType = g;
    },
    onChange(index) {
      this.giftNavId = this.giftTitleList[index].id;
    },
    send() {
      sendGiftMessage({
        miaoColor: 'freeGift',
        sendType: '1',
        giftId: this.currentGiftType,
      }).then((res) => {
        console.log(res);
        this.$toast('礼物发送成功!');
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.giftBox {
  width: 750px;
  height: 1000px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: rgba(1, 9, 22, 0.96);
  .nav {
    height: 80px;
    padding: 0 32px;
    padding-left: 0px;
    margin-bottom: 2.5vw;
    position: relative;
    .navItem {
      display: flex;
      align-items: center;
      height: 80px;
      font-size: 26px;
      font-weight: 400;
      margin-left: 35px;
      color: rgba(255, 255, 255, 0.3);
      padding-bottom: 4px;

      &.active {
        font-size: 28px;
        font-weight: 500;
        color: #ffffff;
        border-bottom: 4px solid #fff;
      }
    }
  }
  .giftListWrap {
    width: 100%;
    height: 120vw;
    position: relative;
    padding-bottom: 4vw;
    .gift-swipe {
      height: 100%;
      .page {
        width: 100%;
        height: 100%;
        padding: 0 2%;
        overflow-y: scroll;
        .item {
          position: relative;
          flex-direction: column;
          width: 25%;
          height: 32vw;
          float: left;
          .giftImg {
            width: 14vw;
            height: 14vw;

            &.active {
              animation-name: bounceIn;
              animation-duration: 2.5s;
              animation-iteration-count: infinite;
              animation-delay: 0;
            }
          }

          .name {
            font-size: 3.6vw;
            color: #fff;
            margin-top: 20px;
          }

          .price {
            margin-top: 1.2vw;
            color: rgba(255, 255, 255, 0.6);
            font-size: 3.6vw;
            .unit {
              width: 28px;
              height: 21px;
              margin-right: 6px;
            }
            &.active {
              padding-bottom: 5vw;
            }
          }

          .activeBox {
            position: absolute;
            top: 0;
            width: 90%;
            height: 100%;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 16px;
            .sendBtn {
              width: 100%;
              height: 50px;
              background: linear-gradient(90deg, #fc4d88, #fd024f 100%);
              font-size: 24px;
              font-weight: 400;
              color: #ffffff;
              position: absolute;
              bottom: 0;
              left: 0;
              border-bottom-left-radius: 16px;
              border-bottom-right-radius: 16px;
            }
          }
        }
      }
    }
  }
  @keyframes bounceIn {
    from,
    20%,
    40%,
    60%,
    80%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
      -webkit-transform: scale3d(0.9, 0.9, 0.9);
      transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
      -webkit-transform: scale3d(0.97, 0.97, 0.97);
      transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
      opacity: 1;
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
}
</style>
