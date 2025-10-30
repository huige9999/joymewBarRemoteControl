<!--
  * @description: 「抽奖」游戏控制通用组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-09
  TODO 后续再将差异较大的抽奖游戏拆分出来
-->
<template>
  <div class="lotteryMod">
    <div
      class="mod"
      v-if="lotteryType === '3d'"
    >
      <van-form v-show="!lottyerInAni">
        <div class="fItem publicVCenter">
          <label>奖项切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevPrize"
            ></div>
            <div class="prize-name">{{ activePrizeName }}</div>
            <div
              class="btn right"
              @click="nextPrize"
            ></div>
          </div>
        </div>
        <div class="fItem publicVCenter">
          <label>一次抽取：</label>
          <input
            type="number"
            class="pickInput"
            @blur="confirmPick"
            v-model="pickNum"
          />
        </div>
        <van-field
          name="isPersonStopLottery"
          label="手动停止抽奖："
        >
          <template #input>
            <van-checkbox
              v-model="isPersonStopLottery"
              shape="square"
            />
          </template>
        </van-field>
      </van-form>
      <van-form v-show="!lottyerInAni">
        <div class="fItem publicVCenter">
          <label>获奖名单切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevSheet"
            ></div>
            <div
              class="btn right"
              @click="nextSheet"
            ></div>
          </div>
        </div>
      </van-form>
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery"
          v-show="!lottyerInAni"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="stopLottery"
          v-show="personStopBtnVisible"
        >
          停止抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="resetLottery"
          v-show="!lottyerInAni"
        >
          重置抽奖
        </funcButton>
      </div>
    </div>
    <!-- 弹幕抽奖 -->
    <div
      class="mod"
      v-if="lotteryType === 'danmu'"
    >
    <van-form>
        <div
          class="fItem publicVCenter"
          v-show="danmuLotteryStatus === '0'"
        >
          <label>奖项切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevPrize"
            ></div>
            <div class="prize-name">{{ activePrizeName }}</div>
            <div
              class="btn right"
              @click="nextPrize"
            ></div>
          </div>
        </div>
        <div
          class="fItem publicVCenter"
          v-show="danmuLotteryStatus === '0'"
        >
          <label>一次抽取：</label>
          <input
            type="number"
            class="pickInput"
            @blur="confirmPick"
            v-model="pickNum"
          />
        </div>
      </van-form>
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery"
          v-show="danmuLotteryStatus === '0'"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="openPrizeSheet"
          v-show="danmuLotteryStatus === '0'"
        >
          打开中奖名单
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('sheet')"
          v-show="danmuLotteryStatus === '0'"
        >
          关闭中奖名单
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="stopLottery"
          v-show="danmuLotteryStatus === 1"
        >
          停止抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('result')"
          v-show="danmuLotteryStatus === 2"
        >
          关闭中奖结果
        </funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="resetLottery"
          v-show="danmuLotteryStatus === '0'"
        >
          清空中奖名单
        </funcButton>
      </div>
    </div>
    <div
      class="mod"
      v-if="lotteryType === 'sheet' && !isSheetLotteryNoUpload"
    >
      <van-form>
        <div
          class="fItem publicVCenter"
          v-show="sheetLotteryStatus === '0' || sheetLotteryStatus === 1"
        >
          <label>奖项切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevPrize"
            ></div>
            <div class="prize-name">{{ activePrizeName }}</div>
            <div
              class="btn right"
              @click="nextPrize"
            ></div>
          </div>
        </div>
        <div
          class="fItem publicVCenter"
          v-show="sheetLotteryStatus === '0'"
        >
          <label>一次抽取：</label>
          <input
            type="number"
            class="pickInput"
            @blur="confirmPick"
            v-model="pickNum"
          />
        </div>
      </van-form>
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery"
          v-show="sheetLotteryStatus === '0'"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="stopLottery"
          v-show="sheetLotteryStatus === 2"
        >
          停止抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('result')"
          v-show="sheetLotteryStatus === 3"
        >
          关闭中奖结果
        </funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="openPrizeSheet"
          v-show="sheetLotteryStatus === '0'"
        >
          打开中奖名单
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('sheet')"
          v-show="sheetLotteryStatus === 1"
        >
          关闭中奖名单
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="resetLottery"
          v-show="sheetLotteryStatus === 1"
        >
          清空中奖名单
        </funcButton>
      </div>
    </div>
    <div
      class="mod"
      v-if="lotteryType === 'screen'"
    >
      <van-form>
        <div
          class="fItem publicVCenter"
          v-show="screenLotteryStatus === '0' || screenLotteryStatus === 1"
        >
          <label>奖项切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevPrize"
            ></div>
            <div class="prize-name">{{ activePrizeName }}</div>
            <div
              class="btn right"
              @click="nextPrize"
            ></div>
          </div>
        </div>
        <div
          class="fItem publicVCenter"
          v-show="screenLotteryStatus === '0'"
        >
          <label>一次抽取：</label>
          <input
            type="number"
            class="pickInput"
            @blur="confirmPick"
            v-model="pickNum"
          />
        </div>
      </van-form>
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery"
          v-show="screenLotteryStatus === '0'"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="stopLottery"
          v-show="screenLotteryStatus === 2"
        >
          停止抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('result')"
          v-show="screenLotteryStatus === 3"
        >
          关闭中奖结果
        </funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="openPrizeSheet"
          v-show="screenLotteryStatus === '0'"
        >
          打开中奖名单
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('sheet')"
          v-show="screenLotteryStatus === 1"
        >
          关闭中奖名单
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="resetLottery"
          v-show="screenLotteryStatus === 1"
        >
          清空中奖名单
        </funcButton>
      </div>
    </div>
    <div
      class="mod"
      v-if="lotteryType === 'earth'"
    >
      <van-form>
        <div
          class="fItem publicVCenter"
          v-show="earthLotteryStatus === '0'"
        >
          <label>奖项切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevPrize"
            ></div>
            <div class="prize-name">{{ activePrizeName }}</div>
            <div
              class="btn right"
              @click="nextPrize"
            ></div>
          </div>
        </div>
        <div
          class="fItem publicVCenter"
          v-show="earthLotteryStatus === '0'"
        >
          <label>一次抽取：</label>
          <input
            type="number"
            class="pickInput"
            @blur="confirmPick"
            v-model="pickNum"
          />
        </div>
      </van-form>
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery"
          v-show="earthLotteryStatus === '0'"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="stopLottery"
          v-show="earthLotteryStatus === 1"
        >
          停止抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('result')"
          v-show="earthLotteryStatus === 2"
        >
          关闭中奖结果
        </funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="resetLottery"
          v-show="earthLotteryStatus === '0'"
        >
          清空中奖名单
        </funcButton>
      </div>
    </div>
    <div
      class="mod"
      v-if="lotteryType === 'picture' && !isSheetLotteryNoUpload"
    >
      <van-form>
        <div
          class="fItem publicVCenter"
          v-show="pictureLotteryStatus === '0'"
        >
          <label>奖项切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevPrize"
            ></div>
            <div class="prize-name">{{ activePrizeName }}</div>
            <div
              class="btn right"
              @click="nextPrize"
            ></div>
          </div>
        </div>
        <div
          class="fItem publicVCenter"
          v-show="pictureLotteryStatus === '0'"
        >
          <label>一次抽取：</label>
          <input
            type="number"
            class="pickInput"
            @blur="confirmPick"
            v-model="pickNum"
          />
        </div>
      </van-form>
      <van-form v-show="pictureLotteryStatus === 1">
        <div class="fItem publicVCenter">
          <label>获奖名单切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevSheet"
            ></div>
            <div
              class="btn right"
              @click="nextSheet"
            ></div>
          </div>
        </div>
      </van-form>
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery"
          v-show="pictureLotteryStatus === '0'"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="stopLottery"
          v-show="pictureLotteryStatus === 2"
        >
          停止抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('result')"
          v-show="pictureLotteryStatus === 3"
        >
          关闭中奖结果
        </funcButton>
      </div>
      <div class="commonMenus publicHCenter">
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="openPrizeSheet"
          v-show="pictureLotteryStatus === '0'"
        >
          打开中奖名单
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('sheet')"
          v-show="pictureLotteryStatus === 1"
        >
          关闭中奖名单
        </funcButton>
        <funcButton
          bWidth="24vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="resetLottery"
          v-show="pictureLotteryStatus === 1"
        >
          清空中奖名单
        </funcButton>
      </div>
    </div>
    <div
      class="mod"
      v-if="lotteryType === 'card'"
    >
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery1"
          v-show="cardLotteryStatus === '0'"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery1"
          v-show="cardLotteryStatus === 1"
        >
          在玩一次
        </funcButton>
      </div>
      <div
        class="card_box"
        v-show="cardLotteryStatus === 1"
      >
        <div
          v-for="(item, index) in cardAnswer"
          :key="index"
          @click="getCardanswer(index)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
    <div
      class="mod"
      v-if="lotteryType === 'box'"
    >
      <van-form v-show="!lottyerInAni">
        <div class="fItem publicVCenter">
          <label>奖项切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevPrize"
            ></div>
            <div class="prize-name">{{ activePrizeName }}</div>
            <div
              class="btn right"
              @click="nextPrize"
            ></div>
          </div>
        </div>
        <div class="fItem publicVCenter">
          <label>一次抽取：</label>
          <input
            type="number"
            class="pickInput"
            @blur="confirmPick"
            v-model="pickNum"
          />
        </div>
      </van-form>
      <van-form v-show="!lottyerInAni">
        <div class="fItem publicVCenter">
          <label>获奖名单切换：</label>
          <div class="arrowBtnGroup publicVCenter">
            <div
              class="btn left"
              @click="prevSheet"
            ></div>
            <div
              class="btn right"
              @click="nextSheet"
            ></div>
          </div>
        </div>
      </van-form>
      <div class="funcMenus publicVCenter">
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="startLottery"
          v-show="!lottyerInAni"
        >
          开始抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="stopLottery"
          v-show="lottyerInAni"
        >
          停止抽奖
        </funcButton>
        <funcButton
          bWidth="32vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="resetLottery"
          v-show="!lottyerInAni"
        >
          重置抽奖
        </funcButton>
        <funcButton
          bWidth="35vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="openPrizeSheet"
          v-show="!lottyerInAni"
        >
          打开/关闭中奖名单
        </funcButton>
        <funcButton
          bWidth="35vw"
          bHeight="10.67vw"
          bFontSize="3.47vw"
          @clickEvent="closeResult('result')"
        >
          关闭中奖结果
        </funcButton>
      </div>
    </div>
    <div
      class="arranged-lottery-test"
      v-if="$route.meta.isShowArrangedLotteryTest"
    >
      <span class="label">开启内定抽奖测试</span>
      <van-popover
        v-model="isShowArrangedLotteryTestPopover"
        trigger="click"
        placement="top"
        :actions="[{ text: '内定抽奖测试打开后，抽奖过程中用户将不会收到抽奖通知，中奖数据将不会显示在手机端' }]"
      >
        <template #reference>
          <van-icon
            name="question-o"
            size="20px"
            color="#fff"
          />
        </template>
      </van-popover>
      <van-switch
        size="32px"
        active-color="#9100ff"
        style="margin-left: 10px"
        v-model="isSwitchOnArrangedLotteryTest"
        @change="onArrangedLotteryTestChange"
      ></van-switch>
    </div>
  </div>
</template>
<script>
import { reqGetActivityDetail, reqSwitchArrangedLotteryTest } from '@/api';
import sendInstrunction from '@/api/sendCode';
import { CODE } from '@/assets/constant/index';
import funcButton from '@/components/funcButton.vue';
import { Toast } from 'vant';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'LotteryCommon',
  components: {
    funcButton,
  },
  data() {
    return {
      isShowArrangedLotteryTestPopover: false,
      isPersonStopLottery: false,
      pickNum: '1',
      isSwitchOnArrangedLotteryTest: false,
      activeIndex: 0, // 当前激活的奖项
    };
  },
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
      lotteryType: (state) => state.lotteryType,
      isSheetLotteryNoUpload: (state) => state.isSheetLotteryNoUpload,
      personStopBtnVisible: (state) => state.personStopBtnVisible,
      lottyerInAni: (state) => state.lottyerInAni,
      sheetLotteryStatus: (state) => state.sheetLotteryStatus,
      sheetChoosePeople: (state) => state.sheetChoosePeople,
      screenLotteryStatus: (state) => state.screenLotteryStatus,
      earthLotteryStatus: (state) => state.earthLotteryStatus,
      danmuLotteryStatus: (state) => state.danmuLotteryStatus,
      pictureLotteryStatus: (state) => state.pictureLotteryStatus,
      cardLotteryStatus: (state) => state.cardLotteryStatus,
      cardAnswer: (state) => state.cardAnswer,
      lotteryPrizeInfo: (state) => state.lotteryPrizeInfo,
    }),
    activePrizeName() {
      return this.lotteryPrizeInfo.list[this.activeIndex] || '';
    },
  },
  watch: {
    async isPersonStopLottery() {
      await sendInstrunction({
        code: CODE.LOTTERYISPERSON,
      });
    },
    isSheetLotteryNoUpload(newVal) {
      if (newVal) {
        this.promptUploadSheet();
      }
    },
    sheetChoosePeople(newVal) {
      if (newVal) {
        if (typeof newVal === 'string' && newVal.indexOf('reset') > -1) {
          this.pickNum = 1;
        } else {
          this.pickNum = newVal;
        }
      }
    },
    lotteryPrizeInfo(newVal) {
      if (newVal) {
        this.activeIndex = newVal.activeIndex;
      }
    },
  },
  created() {
    this.getIsSwitchOnArrangedLotteryTest();
  },
  beforeDestroy() {},
  methods: {
    ...mapMutations([
      'updateSheetChoosePeople',
      'updateIsSheetLotteryNoUpload',
      'setCurrentMenuId',
      'setLotteryType',
      'updateSheetLotteryStatus',
    ]),
    async getIsSwitchOnArrangedLotteryTest() {
      const resData = await reqGetActivityDetail('isSwitchOnArrangedLotteryTest');
      this.isSwitchOnArrangedLotteryTest = resData?.isSwitchOnArrangedLotteryTest === '1';
    },
    async onArrangedLotteryTestChange(e) {
      try {
        const resData = await reqSwitchArrangedLotteryTest(e);
        if (resData !== 'SUCCESS') throw new Error(resData);

        Toast.success('修改成功，请刷新大屏');
      } catch (error) {
        Toast.fail(error.message);
        this.isSwitchOnArrangedLotteryTest = !e;
      }
    },
    async getCardanswer(index) {
      await sendInstrunction({
        code: CODE.CARDANSWER,
        param: index,
      });
    },
    async prevPrize() {
      await sendInstrunction({
        code: CODE.LOTTERYPREV,
      });
      if (this.activeIndex <= 0) {
        // 已经是第一个奖项，不可切换
        return;
      }
      this.activeIndex -= 1;
    },
    async nextPrize() {
      await sendInstrunction({
        code: CODE.LOTTERYNEXT,
      });
      if (this.activeIndex >= this.lotteryPrizeInfo.list.length - 1) {
        // 已经是最后一个奖项，不可切换
        return;
      }
      this.activeIndex += 1;
    },
    async prevSheet() {
      await sendInstrunction({
        code: CODE.LOTTERYPRIZEPREV,
      });
    },
    async nextSheet() {
      await sendInstrunction({
        code: CODE.LOTTERYPRIZENEXT,
      });
    },
    async startLottery() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否要开始抽奖',
        })
        .then(async () => {
          // on confirm
          await sendInstrunction({
            code: CODE.LOTTERYSTART,
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    async startLottery1() {
      await sendInstrunction({
        code: CODE.LOTTERYSTART,
      });
    },
    async stopLottery() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否要停止抽奖',
        })
        .then(async () => {
          // on confirm
          await sendInstrunction({
            code: CODE.LOTTERYSTOP,
          });
          this.$store.commit('updatePersonStopBtnVisible', false);
        })
        .catch(() => {
          // on cancel
        });
    },
    promptUploadSheet() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '请上传抽奖名单后刷新页面',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    resetLottery() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否要重置抽奖',
        })
        .then(async () => {
          // on confirm
          await sendInstrunction({
            code: CODE.LOTTERYRESET,
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    async confirmPick() {
      const r = /^\+?[1-9][0-9]*$/; // 正整数
      if (!r.test(this.pickNum)) {
        this.pickNum = 1;
      }
      console.log(this.pickNum);
      await sendInstrunction({
        code: CODE.LOTTERYNUN,
        param: this.pickNum,
      });
    },
    async openPrizeSheet() {
      await sendInstrunction({
        code: CODE.LOTTERYSHEETOPEN,
      });
    },
    async closeResult(type) {
      await sendInstrunction({
        code: CODE.LOTTERYSHEETCLOSE,
        param: type,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.lotteryMod {
  width: 100%;
  height: 100%;
  position: relative;

  .funcMenus {
    position: relative;
    width: 100%;
    flex-direction: column;
  }

  .commonMenus {
    position: relative;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
  }

  .mod::v-deep {
    .card_box {
      padding-left: 2vw;
      padding-right: 2vw;
      gap: 2vw;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 10vw;
      grid-auto-rows: 10vw;

      div {
        background-color: #fff;
        border-radius: 4vw;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    @media screen and (max-height: 700px) {
      .card_box {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .van-form {
      margin-bottom: 40px;

      .van-cell {
        font-size: 3.8vw;
        line-height: 10vw;
        padding: 1.333vw 6vw;

        .van-cell__title {
          width: 27vw;
        }

        .van-field__error-message {
          font-size: 3vw;
        }
      }

      .van-button {
        height: 10vw;
        margin-bottom: 4vw;

        &.van-button--normal {
          font-size: 3.8vw;
        }
      }

      .van-checkbox__icon {
        font-size: 5.7vw;
        margin-top: 2vw;
      }
    }

    form {
      width: 80vw;
      margin: 0 auto;
    }

    .fItem {
      padding: 1.333vw 6vw;
      line-height: 10vw;
      background-color: #fff;

      label {
        font-size: 3.8vw;
        color: #646566;
        margin-right: 4vw;
      }

      .arrowBtnGroup {
        .btn {
          width: 88px;
          height: 88px;
          background-size: 100% 100%;

          &.left {
            background-image: url('~@/assets/image/leftArrow.png');
          }

          &.right {
            background-image: url('~@/assets/image/rightArrow.png');
          }
        }
        .prize-name {
          max-width: 37vw;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      .pickInput {
        width: 200px;
        border: 2px solid #9e83ff;
        outline: none;
        border-radius: 10px;
      }
    }

    .van-popup {
      .van-picker__cancel,
      .van-picker__confirm {
        font-size: 3.8vw;
      }

      .van-picker-column {
        font-size: 4.2vw;
      }
    }
  }

  .arranged-lottery-test {
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;

    .label {
      color: #fff;
      // color: #dfb2ff;
    }
  }
}
</style>

<style lang="less">
.van-popover {
  transform: scale(1.5) translateY(-10%);

  .van-popover__action {
    padding: 15px 10px;
    height: auto;

    .van-popover__action-text {
      text-align: justify;
    }
  }
}
</style>
