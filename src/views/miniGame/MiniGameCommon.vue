<!--
  * @description: 「小游戏」控制通用组件
  * @author: Ruan Jiazhen
  * @date: 2024-01-09
-->
<template>
    <div class="miniGameMod">
        <!-- 搞笑猜明星 猜明星 品牌达人-->
        <div class="m1" v-if="currentMenuId === '7-1' || currentMenuId === '7-2' || currentMenuId === '7-23'">
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="prev">
                    上一个
                </funcButton>
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="next">
                    下一个
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter" v-if="currentMenuId === '7-23' || currentMenuId === '7-2'">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getStart">
                    开始游戏
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getTip">
                    提示
                </funcButton>
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getAnswer">
                    揭晓答案
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="toHome">
                    回到首页
                </funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 猜成语 猜英雄 猜奥特曼 猜电影 猜台词 看图猜景-->
        <div class="m2" v-if="
        currentMenuId === '7-4' ||
        currentMenuId === '7-6' ||
        currentMenuId === '7-7' ||
        currentMenuId === '7-8' ||
        currentMenuId === '7-14' ||
        currentMenuId === '7-15' ||
        currentMenuId === '7-21' ||
        currentMenuId === '7-22' ||
        currentMenuId === '7-24'
      ">
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="prev">
                    上一个
                </funcButton>
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="next">
                    下一个
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getStart">
                    开始
                </funcButton>
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getAnswer">
                    揭晓答案
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="toHome">
                    回到首页
                </funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                <!-- {{ currentMiniGameAnswer }} -->
                <div v-html="currentMiniGameAnswer"></div>
            </div>
        </div>
        <!-- 开心猜成语 -->
        <div class="m3" v-if="currentMenuId === '7-3'">
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="prev">
                    上一个
                </funcButton>
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="next">
                    下一个
                </funcButton>
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getAnswer">
                    揭晓答案
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="toHome">
                    回到首页
                </funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 投票 -->
        <div class="m4" v-if="currentMenuId === '7-5'">
            <div class="funcMenus publicVCenter">
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="clearLate">
                    清空上一轮
                </funcButton>
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="saveLate">
                    保留上一轮
                </funcButton>
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="endVote">
                    结束投票
                </funcButton>
            </div>
        </div>
        <!-- 雀神大赛(旧版) -->
        <div class="m5" v-if="currentMenuId === '7-18'">
           <!-- <div style="display: flex; justify-content: center">
                <funcButton @clickEvent="sendDifficulty('easy')" bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw">
                    简单
                </funcButton>
                <funcButton @clickEvent="sendDifficulty('hard')" bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw">
                    困难
                </funcButton>
            </div> -->
            <div style="display: flex">
                <funcButton :style="qsNum == 1 && 'font-weight: bold; color: black; border: 2px solid black'"
                    @clickEvent="majiangAnswerNum(1)">
                    1张
                </funcButton>
                <funcButton :style="qsNum == 2 && 'font-weight: bold; color: black; border: 2px solid black'"
                    @clickEvent="majiangAnswerNum(2)">
                    2张
                </funcButton>
                <funcButton :style="qsNum == 3 && 'font-weight: bold; color: black; border: 2px solid black'"
                    @clickEvent="majiangAnswerNum(3)">
                    3张
                </funcButton>
                <funcButton :style="qsNum == 4 && 'font-weight: bold; color: black; border: 2px solid black'"
                    @clickEvent="majiangAnswerNum(4)">
                    4张
                </funcButton>
                <funcButton :style="qsNum == 5 && 'font-weight: bold; color: black; border: 2px solid black'"
                    @clickEvent="majiangAnswerNum(5)">
                    5张
                </funcButton>
                <funcButton :style="qsNum == 6 && 'font-weight: bold; color: black; border: 2px solid black'"
                    @clickEvent="majiangAnswerNum(6)">
                    6张
                </funcButton>
            </div>
            <div class="funcMenus publicVCenter">
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="majiangHupai">
                    胡牌
                </funcButton>
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="majiangHupai">
                    继续
                </funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 雀神大赛（新版） -->
        <div class="m5" v-if="currentMenuId === '7-9'">
            <div class="funcMenus publicVCenter">
                <funcButton @clickEvent="startGame">开始游戏</funcButton>
                <funcButton @clickEvent="endGame">结束游戏</funcButton>
                <funcButton @clickEvent="reStartGame">再玩一次</funcButton>
                <funcButton @clickEvent="majiangNext">下一题</funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 诗词大赛 -->
        <div class="m6" v-if="currentMenuId === '7-10'">
            <div class="funcMenus publicVCenter">
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getAnswer">
                    揭晓答案
                </funcButton>
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="next">
                    下一题
                </funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 跳一跳 -->
        <div class="m7" v-if="currentMenuId === '7-11'">
            <div class="funcMenus publicVCenter">
                <funcButton @clickEvent="startGame">开始游戏</funcButton>
                <funcButton @clickEvent="endGame">结束游戏</funcButton>
                <funcButton @clickEvent="reStartGame">再玩一次</funcButton>
                <funcButton @clickEvent="toHome">回到首页</funcButton>
            </div>
        </div>
        <!-- 评分(新版) -->
        <div class="m4" v-if="currentMenuId === '7-12' && giveMarkVersion === 'new'">
            <div class="funcMenus publicVCenter">
                <funcButton @clickEvent="savePrev">保存上一轮数据</funcButton>
                <funcButton @clickEvent="clearPrev">清空上一轮数据</funcButton>
                <funcButton @clickEvent="toNext">下一位</funcButton>
                <funcButton @clickEvent="toPrev">上一位</funcButton>
                <funcButton @clickEvent="endGame">结束游戏</funcButton>
            </div>
        </div>
        <!-- 评分(旧版) -->
        <div class="m4" v-if="currentMenuId === '7-12' && giveMarkVersion === 'old'">
            <div class="funcMenus publicVCenter">
                <funcButton @clickEvent="startGiveMark">查看评分</funcButton>
                <funcButton @clickEvent="checkSumScore">查看总分</funcButton>
                <funcButton @clickEvent="toNext">下一位/排行榜</funcButton>
                <funcButton @clickEvent="endGame">结束游戏</funcButton>
            </div>
        </div>
        <!-- 说颜色 -->
        <div class="m6" v-if="currentMenuId === '7-13'">
            <div class="funcMenus publicVCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="startCwzys">
                    开始
                </funcButton>
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getAnswer">
                    揭晓答案
                </funcButton>
                <funcButton bWidth="32vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="nextCwzys">
                    下一题
                </funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 汉字 -->
        <div class="m7" v-if="currentMenuId === '7-16'">
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="next">
                    下一个
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="getAnswer">
                    揭晓答案
                </funcButton>
            </div>
            <div class="commonMenus publicHCenter">
                <funcButton bWidth="24vw" bHeight="10.67vw" bFontSize="3.47vw" @clickEvent="toHome">
                    回到首页
                </funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 开心问答 -->
        <div class="m5" v-if="currentMenuId === '7-17' || currentMenuId === '7-20'">
            <div class="funcMenus publicVCenter">
                <funcButton @clickEvent="startGame">开始游戏</funcButton>
                <funcButton @clickEvent="endGame">结束游戏</funcButton>
                <funcButton @clickEvent="reStartGame">再玩一次</funcButton>
                <funcButton @clickEvent="getAnswer">揭晓答案</funcButton>
                <funcButton @clickEvent="next">下一题</funcButton>
            </div>
            <div class="answers">
                <label>答案：</label>
                {{ currentMiniGameAnswer }}
            </div>
        </div>
        <!-- 扑克残局 -->
        <!-- <div class="poker-game" v-if="currentMenuId === '7-25'">
            <div class="funcMenus publicVCenter">
                <funcButton bWidth="35vw" bHeight="8vw" bFontSize="4.47vw" @clickEvent="playpokerStart">开始/重新开始
                </funcButton>
            </div>
            <div class="poker-cards" v-if="$store.state.playpokerData.playerCards">
                <PokerCard v-for="(item, index) in $store.state.playpokerData.playerCards" :key="index"
                    :card-value="item" :style="{ zIndex: index + 1 }" :card-index='index' :dragable="true"
                    :card-selected="$store.state.playpokerData.playerCardsStatus[index]"
                    :dragging="$store.state.playpokerData.playerCardsDraggingStatus[index]"
                    @click.stop="(e) => { onPokerCardSwitch(e, index) }"></PokerCard>
            </div>
            <div class="poker-waiting" v-else="">等待数据...</div>
            <div class="poker-btns" v-if="$store.state.playpokerData.playerCards">
                <funcButton v-if="$store.state.playpokerData.playerCards.length>0" bWidth="35vw" bHeight="8vw"
                    bFontSize="4.47vw" @clickEvent="playpokerProduce">出牌</funcButton>
                <funcButton v-if="$store.state.playpokerData.playerCards.length>0 && $store.state.playpokerData.lastRobotPlayedCards.length>0" bWidth="35vw" bHeight="8vw"
                    bFontSize="4.47vw" @clickEvent="playpokerYaobuqi">要不起</funcButton>
            </div>
        </div> -->
    </div>
</template>
<script>
import { getMajiangRoundInfo } from '@/api/index';
import sendInstrunction from '@/api/sendCode';
import { CODE } from '@/assets/constant/index';
import funcButton from '@/components/funcButton.vue';
import { getFromScreen, getQuestioner, GuessColorQuestioner, setFromScreen } from '@/utils/multipleScreenResolve';
import { mapState } from 'vuex';
// import { setDifficulty } from '@/utils/multipleScreenResolve';
// import PokerCard from './components/pokerCard.vue';

export default {
  name: 'MiniGameCommon',
  // 雀神大赛的张数，如果主持人设置了一下道题目的答案张数，那么之后所有的题目都是该答案张数，加上data
  // 目的是为了给个显示，后续可以改一下
  /** @date 2024-11-08 */
  data: () => ({
    qsNum: 0,
    // 获取本次小游戏雀神大赛的题库
    questioner: getQuestioner(),
    showMahjongAnswer: true,
    /**
     * 猜文字游戏的10秒钟的倒计时
     */
    cwzys: {
      timer: false,
    },
    // 扑克残局游戏的拖拉状态
    // pokerDragging: false,
    // pokerDragDirection:0,
    // pokerDragStartIndex:0,
    // pokerLastDraggedIndex:-1,

  }),
  computed: {
    ...mapState({
      currentMenuId: (state) => state.currentMenuId,
      currentMiniGameAnswer: (state) => state.currentMiniGameAnswer,
      giveMarkVersion: (state) => state.giveMarkVersion,
    }),
  },
  components: {
    funcButton,
    // PokerCard,
  },
  watch: {
    currentMenuId: {
      handler(newVal) {
        if (newVal === '7-18') {
          // 当前打开的是雀神大赛
          this.generateMahjongSubjectThenSendToScreen();
        } else if (newVal === '7-13') {
          /** *********************************
           * 猜文字颜色多屏解决方案的若干要点:
           * 1.当遥控器回到猜文字页面时,无事发生,不发送任何指令
           * 2.此时,点击开始游戏发送小游戏开始游戏指令
           * 3.现有两种情况,不分先后,点击揭晓答案发送揭晓答案指令,点击下一题发送下一题指令0138
           *
           */
        }
      },
      immediate: true,
    },
  },
  created() {
    console.log('currentMenuId', this.currentMenuId);
  },
  mounted() {},
  methods: {
    // sendDifficulty(difficult) {
    //   setDifficulty(difficult);
    // },
    async prev() {
      await sendInstrunction({
        code: CODE.MINIGAME_PREV,
      });
    },
    async next() {
      await sendInstrunction({
        code: CODE.MINIGAME_NEXT,
      });
    },
    async getAnswer() {
      await sendInstrunction({
        code: CODE.MINIGAME_ANS,
      });
    },
    async getTip() {
      await sendInstrunction({
        code: CODE.MINIGAME_TIP,
      });
    },
    async getStart() {
      await sendInstrunction({
        code: CODE.MINIGAME_START,
      });
    },
    async toHome() {
      await sendInstrunction({
        code: CODE.HOME,
      });
    },
    async clearLate() {
      await sendInstrunction({
        code: CODE.VOTE_CLEAR,
      });
    },
    async saveLate() {
      await sendInstrunction({
        code: CODE.VOTE_SAVE,
      });
    },
    async endVote() {
      await sendInstrunction({
        code: CODE.VOTE_END,
      });
    },
    async startGame() {
      await sendInstrunction({
        code: CODE.HYHSTARTGAME,
      });
    },
    async endGame() {
      await sendInstrunction({
        code: CODE.HYHENDGAME,
      });
    },
    async reStartGame() {
      await sendInstrunction({
        code: CODE.HYHREPLAY,
      });
    },
    async savePrev() {
      await sendInstrunction({
        code: CODE.GIVEMARK_SAVEPREV,
      });
    },
    async clearPrev() {
      await sendInstrunction({
        code: CODE.GIVEMARK_CLEARPREV,
      });
    },
    async toNext() {
      await sendInstrunction({
        code: CODE.GIVEMARK_TONEXT,
      });
    },
    async toPrev() {
      await sendInstrunction({
        code: CODE.GIVEMARK_TOPREV,
      });
    },
    async startGiveMark() {
      await sendInstrunction({
        code: CODE.GIVEMARK_STARTGIVEMARK,
      });
    },
    async checkSumScore() {
      await sendInstrunction({
        code: CODE.GIVEMARK_CHECKSUMSCORE,
      });
    },
    /** 麻将的下一题 */
    async majiangNext() {
      // 获取当前轮次剩余时间，如果不为0，提示
      const res = await getMajiangRoundInfo();
      console.log('轮次信息', res);
      if (!res || !res.data) return;
      const { remainTime } = res.data;
      // 剩余时间未到，弹窗提示
      if (Number(remainTime || 0) !== 0) {
        this.$toast('来宾正在答题中，待答题时间结束再进行下一题');
        return;
      }
      this.next();
    },

    /** ******************************
     * @date 2024-11-07
     * 决定下一题的答案张数
     */
    async majiangAnswerNum(n) {
      /**
       * @date 2024-11-22
       */
      // 由遥控器生成题目的情况下，不需要再向大屏发送指令控制下一道题的张数，
      // 直接在本地修改即可
      this.qsNum = n;
      await sendInstrunction({
        code: CODE.MINIGAME_QSDS_ANSWER_NUM,
        param: n,
      });
    },
    majiangHupai() {
      /**
       * 如果由遥控器控制，大屏此时不可以主动翻牌
       * 那么一开始是答案未揭晓，答案揭晓……如此循环往复
       */
      if (this.showMahjongAnswer) {
        /**
         * 如果揭晓答案
         */
        sendInstrunction({
          code: CODE.MINIGAME_ANS,
        });

        this.showMahjongAnswer = false;
        return;
      }
      this.showMahjongAnswer = true;

      /**
       * 否则，就发送下一道题目的内容
       */

      const question = this.qsNum !== 0 ? this.questioner.next(this.qsNum) : this.questioner.next();
      if (question) {
        let answerStr = '';
        question.answerList
          .map((i) => i.value)
          .forEach((number) => {
            if (number < 10) {
              answerStr += `${number}万`;
            } else if (number < 20) {
              answerStr += `${number - 10}筒`;
            } else {
              answerStr += `${number - 20}条`;
            }
          });
        // 将遥控器自己生成的题目的答案回显到页面上去
        this.$store.commit('updateCurrentMiniGameAnswer', answerStr);
        sendInstrunction({
          code: CODE.MINIGAME_QSDS_SEND_QUESTION,
          param: question ? JSON.stringify(question) : '',
        });
      } else {
        sendInstrunction({
          code: CODE.MINIGAME_QSDS_SEND_QUESTION,
          param: '',
        });
      }
    },
    /**
     * 遥控器生成下一道麻将题目并发送给大屏
     */
    generateMahjongSubjectThenSendToScreen() {
      // 如果来自于大屏主动控制的跳转则不发送题目
      if (getFromScreen()) {
        setFromScreen(false);
        return;
      }

      const question = this.questioner.next();
      if (question) {
        let answerStr = '';
        question.answerList
          .map((i) => i.value)
          .forEach((number) => {
            if (number < 10) {
              answerStr += `${number}万`;
            } else if (number < 20) {
              answerStr += `${number - 10}筒`;
            } else {
              answerStr += `${number - 20}条`;
            }
          });
        // 将遥控器自己生成的题目的答案回显到页面上去
        this.$store.commit('updateCurrentMiniGameAnswer', answerStr);
        sendInstrunction({
          code: CODE.MINIGAME_QSDS_SEND_QUESTION,
          param: question ? JSON.stringify(question) : '',
        });
      } else {
        sendInstrunction({
          code: CODE.MINIGAME_QSDS_SEND_QUESTION,
          param: '',
        });
      }
    },

    /**
     * 猜文字颜色的下一题
     */
    async nextCwzys() {
      if (this.cwzys.timer) {
        // 如果有猜文字倒计时，则不发送指令
        return;
      }
      this.cwzys.timer = true;
      setTimeout(() => {
        this.cwzys.timer = false;
      }, 10e3);
      const question = GuessColorQuestioner.getQuestion();
      const answer = question.map(({ color }) => GuessColorQuestioner.qToA(color)).toString();
      // alert(answer);
      this.$store.commit('updateCurrentMiniGameAnswer', answer);
      await sendInstrunction({
        code: CODE.MINIGAME_CWZYS_SEND_QUESTION,
        param: JSON.stringify(question),
      });
    },

    /**
     * 猜文字颜色的开始游戏
     */
    async startCwzys() {
      await sendInstrunction({
        code: CODE.MINIGAME_START,
      });
      this.nextCwzys();
    },
    async playpokerStart() {
      this.$store.commit('setNewPokerData', {});
      await sendInstrunction({
        code: CODE.MINIGAME_PLAYPOKER_START,
      });
    },
    onPokerCardSwitch(e, index) {
      this.$store.commit('setSwitchedPokerCardsStatus', index);
    },
    async playpokerProduce() {
      if (!this.$store.state.playpokerData.playerCardsStatus.includes(true)) return;
      if (!this.$store.state.playpokerData.producable) return;
      this.$store.commit('setPokerProducable');
      await sendInstrunction({
        code: CODE.MINIGAME_PLAYPOKER_PRODUCE,
        param: this.$store.state.playpokerData.playerCardsStatus,
      });
    },
    async playpokerYaobuqi() {
      if (!this.$store.state.playpokerData.producable) return;
      this.$store.commit('setPokerProducable');
      await sendInstrunction({
        code: CODE.MINIGAME_PLAYPOKER_YAOBUQI,
      });
    },
    // onPokerCardDragStart(e, index) {
    //         // console.log('onDragStart',index)
    //         this.pokerDragging = true;
    //         this.pokerDragStartIndex = index;
    // },
    // onPokerCardDragEnd(e, index) {
    //         // console.log('onDragEnd', e,index);
    //         e.stopPropagation();
    //         if (!this.pokerDragging) {
    //             this.onPokerCardReset(e);
    //             return;
    //         }
    //         this.pokerDragging = false;
    //         this.pokerDragDirection = 0;
    //         this.pokerLastDraggedIndex = -1;
    //         if (this.pokerDragStartIndex === index) {
    //             return;
    //         }
    //         this.$store.commit('setDragEndPokerCardsStatus')
    //         // console.log('onDragEnd')
    // },
    // onPokerCardDragMove(e, index) {
    //   if (!this.pokerDragging)
    //   return
    //   if (index === this.pokerDragStartIndex) {
    //   if(this.pokerLastDraggedIndex === -1)
    //     this.pokerLastDraggedIndex = index;
    //         this.pokerDragDirection = 0;
    //         this.$store.commit('setDragMiddlePokerCardsStatus',index)
    // }else if (index < this.pokerDragStartIndex) {
    //         this.pokerDragDirection = 1;
    //         // console.log('onDragMove', 'left')
    //     } else if (index > this.pokerDragStartIndex) {
    //         this.pokerDragDirection = 2;
    //         // console.log('onDragMove', 'right')
    //     }

    //     if (this.pokerDragDirection === 0) {
    //        this.$store.commit('setDraggedPokerCardsStatus',index)
    //     } else if (this.pokerDragDirection === 1) {
    //         if (this.pokerLastDraggedIndex < index) {
    //             this.$store.commit('setPokerCardsMutipleDraggingStatus',{start:index,end:this.pokerDragStartIndex,status:true})
    //             this.$store.commit('setPokerCardsMutipleDraggingStatus',{start:this.pokerLastDraggedIndex,end:index,status:false})
    //         } else if (this.pokerLastDraggedIndex > index ) {
    //             this.$store.commit('setPokerCardsMutipleDraggingStatus',{start:index,end:this.pokerDragStartIndex,status:true})
    //         }
    //     } else if (this.pokerDragDirection === 2) {
    //         if (this.pokerLastDraggedIndex > index) {
    //             this.$store.commit('setPokerCardsMutipleDraggingStatus',{start:this.pokerDragStartIndex,end:index,status:true})
    //             this.$store.commit('setPokerCardsMutipleDraggingStatus',{start:index,end:this.pokerLastDraggedIndex,status:false})
    //         } else if (this.pokerLastDraggedIndex < index) {
    //           this.setMultipleDraggingStatus(this.dragStartIndex, index, true)
    //         }
    //     }
    //     this.pokerLastDraggedIndex = index;
    //     // console.log('onDragMove',index)
    // },
    onPokerCardReset() {
      // console.log("onCardReset")
      // if (this.pokerDragging)
      // return;
      // this.$store.commit('setPokerCardsStatusReset')
      // this.pokerDragging = false;
      // this.dragStartIndex = 0;
      // this.pokerLastDraggedIndex = -1;
      // this.pokerDragDirection = 0;
      this.$store.commit('setPokerCardsStatusReset');
    },
  },
};
</script>
<style lang="less" scoped>
.miniGameMod {
    width: 100%;
    height: 100%;
    position: relative;

    .funcMenus {
        position: relative;
        width: 100%;
        flex-direction: column;
    }

    .answers {
        position: relative;
        font-weight: 600;
        font-size: 4.8vw;
        text-align: center;
        margin-top: 40px;

        label {
            font-size: 3.8vw;
            color: #000;
            font-weight: 400;
            margin-right: 12px;
        }
    }
}

.poker-game {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: center;
    height: 100%;
    overflow: hidden;

    .poker-cards {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 5vw;
        margin-right: -8vw;
        height: 30vw;
    }

    .poker-waiting {
        font-size: 30px;
        color: red;
        text-align: center;
        // margin-left: 40vw;
    }

    .poker-btns {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin-top: 5vw;
    }
}
</style>
