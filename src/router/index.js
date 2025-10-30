import { CODE } from '@/assets/constant/index';
import app from '@/main';
import Vue from 'vue';
import VueRouter from 'vue-router';

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function newReplace(location) {
  originalReplace.call(this, location).catch((err) => err);
};

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function newPush(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

/**
 * @description 原始的路由配置
 * @type {import("../types/index").CustomRouteConfig[]}
 */
export const ORIGINAL_ROUTES = [
  {
    path: '/controller',
    name: 'home',
    component: () => import('@/views/v2/index.vue'), // 改为新版
    meta: {
      title: '遥控器',
      keepAlive: true,
    },
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main.vue'),
    meta: {
      title: '遥控器',
      keepAlive: true,
    },
    // TODO 迁移进来的旧模块后续等通信模块重构完成，再添加screenUrl，修改原按钮点击事件
    children: [
      {
        path: 'sign',
        name: 'sign',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '0',
          name: '签到',
          icon: require('@/assets/image/signIn.png'),
          bg: require('@/assets/image/signBg.png'),
        },
        children: [
          {
            path: '3DSignIn',
            name: '3DSignIn',
            component: () => import('@/views/signIn/3DSignIn.vue'),
            meta: {
              parentId: '0',
              id: '0-1',
              title: '3D签到',
              toScreen: {
                code: CODE.SIGN,
              },
            },
          },
          {
            path: 'signBook',
            name: 'signBook',
            component: () => import('@/views/signIn/SignBook.vue'),
            meta: {
              parentId: '0',
              id: '0-2',
              title: '签到簿',
              toScreen: {
                code: CODE.SIGNBOOK,
              },
            },
          },
          {
            path: 'handwrittenSignIn',
            name: 'handwrittenSignIn',
            component: () => import('@/views/signIn/HandwrittenSignIn.vue'),
            meta: {
              parentId: '0',
              id: '0-3',
              title: '手写签到',
              toScreen: {
                code: CODE.SIGNBUBBLE,
              },
            },
          },
          {
            path: 'startRite',
            name: 'startRite',
            component: () => import('@/views/signIn/StartRite.vue'),
            meta: {
              parentId: '0',
              id: '0-4',
              title: '启动仪式',
              toScreen: {
                code: CODE.STARTRITE,
              },
            },
          },
          {
            path: 'signWeddingBook',
            name: 'signWeddingBook',
            component: () => import('@/views/signIn/SignWeddingBook.vue'),
            meta: {
              parentId: '0',
              id: 'signWeddingBook',
              title: '签婚书',
              screenUrl: 'signWeddingBook',
            },
          },
        ],
      },
      {
        path: 'luckyTreasure',
        name: 'luckyTreasure',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '1',
          name: '幸运夺宝',
          icon: require('@/assets/image/niuyiniu.png'),
          bg: require('@/assets/image/fullScreen.png'),
        },
        children: [
          {
            path: 'spinItUp',
            name: 'spinItUp',
            component: () => import('@/views/luckyTreasure/SpinItUp.vue'),
            meta: {
              parentId: '1',
              id: '1-1',
              title: '转一转',
              toScreen: {
                code: CODE.XYDB,
              },
            },
          },
          {
            path: 'twistItUp',
            name: 'twistItUp',
            component: () => import('@/views/luckyTreasure/TwistItUp.vue'),
            meta: {
              parentId: '1',
              id: '1-2',
              title: '扭一扭',
              toScreen: {
                code: CODE.NYN,
              },
            },
          },
          {
            path: 'guessRedPacket',
            name: 'guessRedPacket',
            component: () => import('@/views/luckyTreasure/GuessRedPacket.vue'),
            meta: {
              parentId: '1',
              id: '1-3',
              title: '猜红包',
              toScreen: {
                code: CODE.GUESSHB,
              },
            },
          },
          {
            path: 'raceAgainstTime',
            name: 'raceAgainstTime',
            component: () => import('@/views/luckyTreasure/RaceAgainstTime.vue'),
            meta: {
              parentId: '1',
              id: '1-4',
              title: '争分夺秒',
              toScreen: {
                code: CODE.ZFDM,
              },
            },
          },
          {
            path: 'sendBlessing',
            name: 'sendBlessing',
            component: () => import('@/views/luckyTreasure/SendBlessing.vue'),
            meta: {
              parentId: '1',
              id: '1-5',
              title: '送祝福',
              toScreen: {
                code: CODE.SZF,
              },
            },
          },
          {
            path: 'luckyWheel',
            name: 'luckyWheel',
            component: () => import('@/views/luckyTreasure/LuckyWheel.vue'),
            meta: {
              parentId: '1',
              id: '1-6',
              title: '幸运小转盘',
              toScreen: {
                code: CODE.LUCKYWHEEL,
              },
            },
          },
        ],
      },
      {
        path: 'redPacketRain',
        name: 'redPacketRain',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '2',
          name: '红包雨',
          icon: require('@/assets/image/redPackageRain.png'),
          bg: require('@/assets/image/QRCode.png'),
          toScreenChildrenId: '2-2',
        },
        children: [
          {
            path: 'tapRedPacket',
            name: 'tapRedPacket',
            component: () => import('@/views/redPacketRain/TapRedPacket.vue'),
            meta: {
              parentId: '2',
              id: '2-1',
              title: '点红包',
              toScreen: {
                code: CODE.CLICKHB,
              },
            },
          },
          {
            path: 'shakeRedPacket',
            name: 'shakeRedPacket',
            component: () => import('@/views/redPacketRain/ShakeRedPacket.vue'),
            meta: {
              parentId: '2',
              id: '2-2',
              title: '摇红包',
              toScreen: {
                code: CODE.HBY,
              },
            },
          },
          {
            path: 'peopleRedPacketRain',
            name: 'peopleRedPacketRain',
            component: () => import('@/views/redPacketRain/PeopleRedPacketRain.vue'),
            meta: {
              parentId: '2',
              id: '2-3',
              title: '全民红包雨',
              toScreen: {
                code: CODE.ALLHBY,
              },
            },
          },
          {
            path: 'shoutRedPacket',
            name: 'shoutRedPacket',
            component: () => import('@/views/redPacketRain/ShoutRedPacket.vue'),
            meta: {
              parentId: '2',
              id: '2-4',
              title: '喊红包',
              screenUrl: 'shoutHb',
            },
          },
        ],
      },
      {
        path: 'shake',
        name: 'shake',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '3',
          name: '摇一摇',
          icon: require('@/assets/image/yaoyiyao.png'),
          bg: require('@/assets/image/blessList.png'),
        },
        children: [
          {
            path: 'defaultShake',
            name: 'defaultShake',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-1',
              title: '默认摇一摇',
              toScreen: {
                code: CODE.SHAKE,
                param: 'default',
              },
            },
          },
          {
            path: 'monkeyClimbing',
            name: 'monkeyClimbing',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-2',
              title: '猴子爬树',
              toScreen: {
                code: CODE.SHAKE,
                param: 'monkeyShake',
              },
            },
          },
          {
            path: 'crazySwimming',
            name: 'crazySwimming',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-3',
              title: '疯狂游泳',
              toScreen: {
                code: CODE.SHAKE,
                param: 'swimShake',
              },
            },
          },
          {
            path: 'urbanRacing',
            name: 'urbanRacing',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-4',
              title: '都市赛车',
              toScreen: {
                code: CODE.SHAKE,
                param: 'cityCarShake',
              },
            },
          },
          {
            path: 'whoIsTheBest',
            name: 'whoIsTheBest',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-5',
              title: '谁最牛',
              toScreen: {
                code: CODE.SHAKE,
                param: 'cattleShake',
              },
            },
          },
          {
            path: 'chasingTheBride',
            name: 'chasingTheBride',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-6',
              title: '追新娘',
              toScreen: {
                code: CODE.SHAKE,
                param: 'husWifeShake',
              },
            },
          },
          {
            path: 'weddingCarShake',
            name: 'weddingCarShake',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-7',
              title: '婚车摇一摇',
              toScreen: {
                code: CODE.SHAKE,
                param: 'weddingCarShake',
              },
            },
          },
          {
            path: 'dragonBoatRace',
            name: 'dragonBoatRace',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-8',
              title: '赛龙舟',
              toScreen: {
                code: CODE.SHAKE,
                param: 'dragonBoatTeamShake',
              },
            },
          },

          {
            path: 'liftThePalanquin',
            name: 'liftThePalanquin',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-9',
              title: '抬花轿',
              toScreen: {
                code: CODE.SHAKE,
                param: 'sedanChairShake',
              },
            },
          },
          {
            path: 'tigerYearSkiing',
            name: 'tigerYearSkiing',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-10',
              title: '虎年滑雪',
              toScreen: {
                code: CODE.SHAKE,
                param: 'tigerShake',
              },
            },
          },
          {
            path: 'rabbitFlying',
            name: 'rabbitFlying',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-11',
              title: '兔飞猛进',
              toScreen: {
                code: CODE.SHAKE,
                param: 'rubbitShake',
              },
            },
          },

          {
            path: 'dragonInTheSky',
            name: 'dragonInTheSky',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: 'dragonInTheSky',
              title: '飞龙在天',
              screenUrl: 'dragonInTheSky',
            },
          },
          {
            name: 'luckySnake',
            path: 'luckySnake',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-12',
              title: '福蛇贺岁',
              toScreen: {
                code: CODE.LUCKYSNAKE,
              },
            },
          },
          {
            path: 'moneyTreeShake',
            name: 'moneyTreeShake',
            component: () => import('@/views/shake/ShakeCommon.vue'),
            meta: {
              parentId: '3',
              id: '3-13',
              title: '摇钱树',
              screenUrl: 'moneyTreeShake',
            },
          },
        ],
      },
      {
        path: 'swipe',
        name: 'swipe',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '4',
          name: '划一划',
          icon: require('@/assets/image/yaoyiyao.png'),
          bg: require('@/assets/image/blessList.png'),
        },
        children: [
          {
            path: 'countingMoney',
            name: 'countingMoney',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: '4-2',
              title: '数钞票',
              toScreen: {
                code: CODE.HYH,
              },
            },
          },
          {
            path: 'cutFruit',
            name: 'cutFruit',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: '4-1',
              title: '切水果',
              toScreen: {
                code: CODE.CUTFRUIT,
              },
            },
          },
          {
            path: 'countingMoneyNew',
            name: 'countingMoneyNew',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: '4-3',
              title: '数钞票(新)',
              toScreen: {
                code: CODE.HYH2,
              },
            },
          },
          {
            path: 'pigout',
            name: 'pigout',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: '4-4',
              title: '狼吞虎咽',
              toScreen: {
                code: CODE.PIGOUT,
              },
            },
          },
          {
            path: 'clickTiger',
            name: 'clickTiger',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: '4-5',
              title: '武松打虎',
              toScreen: {
                code: CODE.CLICKTIGER,
              },
            },
          },
          {
            path: 'playFootball',
            name: 'playFootball',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: '4-6',
              title: '谁是射手王',
              toScreen: {
                code: CODE.PLAYFOOTBALL,
              },
            },
          },
          {
            path: 'basketballShoot',
            name: 'basketballShoot',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: 'basketballShoot',
              title: '兔子投篮',
              screenUrl: 'basketballShoot',
            },
          },
          {
            path: 'dragonPlayBead',
            name: 'dragonPlayBead',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: 'dragonPlayBead',
              title: '游龙戏珠',
              screenUrl: 'dragonPlayBead',
            },
          },
          {
            path: 'goldenSnake',
            name: 'goldenSnake',
            component: () => import('@/views/swipe/SwipeCommon.vue'),
            meta: {
              parentId: '4',
              id: '4-9',
              title: '金蛇纳福',
              toScreen: {
                code: CODE.GOLDENSNAkE,
              },
            },
          },
        ],
      },
      {
        path: 'openTreasure',
        name: 'openTreasure',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '5',
          name: '开宝',
          icon: require('@/assets/image/guessBox.png'),
          bg: require('@/assets/image/signBg.png'),
        },
        children: [
          {
            path: 'redPacketWall',
            name: 'redPacketWall',
            component: () => import('@/views/openTreasure/RedPacketWall.vue'),
            meta: {
              parentId: '5',
              id: '5-1',
              title: '红包墙',
              toScreen: {
                code: CODE.HBWALL,
              },
            },
          },
          {
            path: 'openTreasureBox',
            name: 'openTreasureBox',
            component: () => import('@/views/openTreasure/OpenTreasureBox.vue'),
            meta: {
              parentId: '5',
              id: '5-2',
              title: '开宝箱',
              toScreen: {
                code: CODE.KBX,
              },
            },
          },
        ],
      },
      {
        path: 'lottery',
        name: 'lottery',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '6',
          name: '抽奖',
          icon: require('@/assets/image/screenRoll.png'),
          bg: require('@/assets/image/music.png'),
        },
        children: [
          {
            path: 'threeDLotteryEnterprise',
            name: 'threeDLotteryEnterprise',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-1',
              title: '3D抽奖',
              toScreen: {
                code: CODE.LOTTERY,
                param: '3d',
              },
              isShowArrangedLotteryTest: true,
            },
          },
          {
            path: 'listLottery',
            name: 'listLottery',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-2',
              title: '名单抽奖',
              toScreen: {
                code: CODE.LOTTERY,
                param: 'sheet',
              },
              isShowArrangedLotteryTest: true,
            },
          },
          {
            path: 'bigScreenLottery',
            name: 'bigScreenLottery',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-3',
              title: '巨幕抽奖',
              toScreen: {
                code: CODE.LOTTERY,
                param: 'screen',
              },
              isShowArrangedLotteryTest: true,
            },
          },
          {
            path: 'earthLottery',
            name: 'earthLottery',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-4',
              title: '地球抽奖',
              toScreen: {
                code: CODE.LOTTERY,
                param: 'earth',
              },
              isShowArrangedLotteryTest: true,
            },
          },
          {
            path: 'pictureLottery',
            name: 'pictureLottery',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-5',
              title: '图片抽奖',
              toScreen: {
                code: CODE.LOTTERY,
                param: 'picture',
              },
            },
          },
          {
            path: 'cardDraw',
            name: 'cardDraw',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-6',
              title: '卡牌抽奖',
              toScreen: {
                code: CODE.LOTTERY,
                param: 'card',
              },
            },
          },
          {
            path: 'wheelLottery',
            name: 'wheelLottery',
            component: () => import('@/views/lottery/wheelLottery.vue'),
            meta: {
              parentId: '6',
              id: '6-7',
              title: '转盘抽奖',
              screenUrl: 'wheelLottery',
            },
          },
          {
            path: 'listLotteryParticle',
            name: 'listLotteryParticle',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-8',
              title: '新名单抽奖',
              screenUrl: 'listLotteryParticle',
              isShowArrangedLotteryTest: true,
            },
          },
          {
            path: 'danmuLottery',
            name: 'danmuLottery',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-9',
              title: '弹幕抽奖',
              screenUrl: 'danmuLottery',
            },
          },
          {
            path: 'boxLottery',
            name: 'boxLottery',
            component: () => import('@/views/lottery/LotteryCommon.vue'),
            meta: {
              parentId: '6',
              id: '6-10',
              title: '抽奖箱抽奖',
              screenUrl: 'boxLottery',
            },
          },
        ],
      },
      {
        path: 'miniGame',
        name: 'miniGame',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '7',
          name: '小游戏',
          icon: require('@/assets/image/miniGame.png'),
          bg: require('@/assets/image/home.png'),
          toScreen: {
            code: CODE.MINIGAME,
          },
        },
        children: [
          {
            path: 'guessStar',
            name: 'guessStar',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-1',
              title: '搞笑猜明星',
              toScreen: {
                code: CODE.MINIGAME_GXCMX,
              },
            },
          },
          {
            path: 'guessStarCommon',
            name: 'guessStarCommon',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-2',
              title: '猜明星',
              toScreen: {
                code: CODE.MINIGAME_CMX,
              },
            },
          },
          {
            path: 'guessIdiom',
            name: 'guessIdiom',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-3',
              title: '开心猜成语',
              toScreen: {
                code: CODE.MINIGAME_KXCCY,
              },
            },
          },
          {
            path: 'guessIdiomCommon',
            name: 'guessIdiomCommon',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-4',
              title: '猜成语',
              toScreen: {
                code: CODE.MINIGAME_CCY,
              },
            },
          },
          {
            path: 'vote',
            name: 'vote',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-5',
              title: '投票',
              toScreen: {
                code: CODE.MINIGAME_VOTE,
              },
            },
          },
          {
            path: 'guessHero',
            name: 'guessHero',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-6',
              title: '猜英雄',
              toScreen: {
                code: CODE.MINIGAME_CYX,
              },
            },
          },
          {
            path: 'guessSong',
            name: 'guessSong',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-7',
              title: '猜歌名',
              toScreen: {
                code: CODE.MINIGAME_CGM,
              },
            },
          },
          {
            path: 'guessStarBySteps',
            name: 'guessStarBySteps',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-8',
              title: '火眼金睛',
              toScreen: {
                code: CODE.MINIGAME_HYJJ,
              },
            },
          },
          {
            path: 'mahjong',
            name: 'mahjong',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-9',
              title: '互动雀神大赛',
              toScreen: {
                code: CODE.MINIGAME_QSDSNEW,
              },
            },
          },
          {
            path: 'mahjongV1',
            name: 'mahjongV1',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-18',
              title: '雀神大赛',
              toScreen: {
                code: CODE.MINIGAME_QSDS,
              },
            },
          },
          {
            path: 'poem',
            name: 'poem',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-10',
              title: '诗词答题',
              toScreen: {
                code: CODE.MINIGAME_SCDT,
              },
            },
          },
          {
            path: 'jumpBone',
            name: 'jumpBone',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-11',
              title: '跳一跳',
              toScreen: {
                code: CODE.JUMPBONE,
              },
            },
          },
          {
            path: 'giveMark',
            name: 'giveMark',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-12',
              title: '评分',
              toScreen: {
                code: CODE.GIVEMARK,
              },
            },
          },
          {
            path: 'aoteman',
            name: 'aoteman',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-14',
              title: '猜奥特曼',
              toScreen: {
                code: CODE.ENTERAOTEMAN,
              },
            },
          },
          {
            path: 'guessTextColor',
            name: 'guessTextColor',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-13',
              title: '说颜色',
              toScreen: {
                code: CODE.MINIGAME_CWZYS,
              },
            },
          },
          {
            path: 'guessGenerality',
            name: 'guessGenerality',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-15',
              title: '猜电影',
              toScreen: {
                code: CODE.GUESSGENERALITY,
              },
            },
          },
          {
            path: 'hanzi',
            name: 'hanzi',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-16',
              title: '神奇的汉字',
              toScreen: {
                code: CODE.MINIGAME_HANZI,
              },
            },
          },
          {
            path: 'happyQA',
            name: 'happyQA',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-17',
              title: '开心问答',
              toScreen: {
                code: CODE.MINIGAME_HAPPYQA,
              },
            },
          },
          {
            path: 'gestureRiddle',
            name: 'gestureRiddle',
            component: () => import('@/views/miniGame/gestureRiddle.vue'),
            meta: {
              parentId: '7',
              id: '7-19',
              title: '你划我猜',
              screenUrl: 'gestureRiddle',
            },
          },
          {
            path: 'guessLanternRiddle',
            name: 'guessLanternRiddle',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-20',
              title: '猜灯谜',
              screenUrl: 'guessLanternRiddle',
            },
          },
          {
            path: 'guessSpeech',
            name: 'guessSpeech',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-21',
              title: '台词模仿秀',
              toScreen: {
                code: CODE.GUESSSPEECH,
              },
            },
          },
          {
            path: 'guessPicture',
            name: 'guessPicture',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-22',
              title: '看图识景',
              screenUrl: 'guessPicture',
            },
          },
          {
            path: 'guessBrand',
            name: 'guessBrand',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-23',
              title: '品牌达人',
              screenUrl: 'guessBrand',
            },
          },
          {
            path: 'guessAni',
            name: 'guessAni',
            component: () => import('@/views/miniGame/MiniGameCommon.vue'),
            meta: {
              parentId: '7',
              id: '7-24',
              title: '猜动画',
              screenUrl: 'guessAni',
            },
          },
          // {
          //   path: 'playpoker',
          //   name: 'playpoker',
          //   component: () => import('@/views/miniGame/MiniGameCommon.vue'),
          //   meta: {
          //     parentId: '7',
          //     id: '7-25',
          //     title: '扑克残局',
          //     toScreen: {
          //       code: CODE.MINIGAME_PLAYPOKER,
          //     },
          //   },
          // },
        ],
      },
      {
        path: 'basicFunctions',
        name: 'basicFunctions',
        component: { render: (h) => h('router-view') },
        meta: {
          id: '8',
          name: '基础功能',
          icon: require('@/assets/image/miniGame.png'),
          bg: require('@/assets/image/home.png'),
          isIgnoreAuth: true,
        },
        children: [
          {
            path: 'msgWall',
            name: 'msgWall',
            component: () => import('@/views/basicFunctions/BasicFunctionsCommon.vue'),
            meta: {
              parentId: '8',
              id: '8-1',
              title: '祝福榜',
            },
          },
          {
            path: 'danmu',
            name: 'danmu',
            component: () => import('@/views/basicFunctions/BasicFunctionsCommon.vue'),
            meta: {
              parentId: '8',
              id: '8-2',
              title: '弹幕',
            },
          },
          {
            path: 'qrCode',
            name: 'qrCode',
            component: () => import('@/views/basicFunctions/BasicFunctionsCommon.vue'),
            meta: {
              parentId: '8',
              id: '8-3',
              title: '二维码',
            },
          },
          {
            path: 'music',
            name: 'music',
            component: () => import('@/views/basicFunctions/BasicFunctionsCommon.vue'),
            meta: {
              parentId: '8',
              id: '8-4',
              title: '音乐',
            },
          },
          {
            path: 'curtainCall',
            name: 'curtainCall',
            component: () => import('@/views/basicFunctions/BasicFunctionsCommon.vue'),
            meta: {
              parentId: '8',
              id: '8-6',
              title: '谢幕',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/chooseSongMain',
    name: 'chooseSongMain',
    component: () => import('@/views/chooseSongMain.vue'),
    meta: {
      title: '遥控器',
      keepAlive: true,
    },
  },
  {
    path: '/controllerV2',
    name: 'controllerV2',
    component: () => import('@/views/home.vue'), // 改为旧版
    meta: {
      title: '遥控器V2',
      keepAlive: true,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes: [],
});

// 如果路由meta里有menuId就设置菜单id
// XXX 后续子组件换成路由的形式后，这里的逻辑可以整合删除
router.beforeEach((to, from, next) => {
  // 检查是否进入home路由，并且localStorage中的version为old
  const version = localStorage.getItem('version');
  if (to.path === '/controller') {
    const version = localStorage.getItem('version');
    if (version === 'old') {
      // 如果version为old，跳转到旧版路由
      next({
        path: '/controllerV2',
        query: to.query,
      });
      return;
    }
  }
  // 检查是否进入controllerV2路由，并且localStorage中的version为new
  if (to.path === '/controllerV2') {
    if (version === 'new') {
      next({
        path: '/controller',
        query: to.query,
      });
      return;
    }
  }

  if (to?.meta?.id) {
    app.$store.commit('setCurrentMenuId', to.meta.id);
  }
  next();
});
export default router;
