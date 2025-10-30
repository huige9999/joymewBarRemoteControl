import globalControlMenu from '@/assets/constant/globalControlMenu';
import pageInteractionMenu from '@/assets/constant/pageInteractionMenu';

// 来自于司仪后台的数据拷贝
// 用于将来自于司仪后台的菜单配置数据转换为适配当前菜单的数据
// const controlMode = [
//   {
//     value: '3DSignIn',
//     label: '3D签到',
//   },
//   {
//     value: 'signBook',
//     label: '签到簿',
//   },
//   {
//     value: 'handwrittenSignIn',
//     label: '手写签到',
//   },
//   {
//     value: 'startRite',
//     label: '启动仪式',
//   },
//   {
//     value: 'spinItUp',
//     label: '转一转',
//   },
//   {
//     value: 'twistItUp',
//     label: '扭一扭',
//   },
//   {
//     value: 'guessRedPacket',
//     label: '猜红包',
//   },
//   {
//     value: 'raceAgainstTime',
//     label: '争分夺秒',
//   },
//   {
//     value: 'sendBlessing',
//     label: '送祝福',
//   },
//   {
//     value: 'luckyWheel',
//     label: '幸运小转盘',
//   },
//   {
//     value: 'tapRedPacket',
//     label: '点红包',
//   },
//   {
//     value: 'shakeRedPacket',
//     label: '摇红包',
//   },
//   {
//     value: 'peopleRedPacketRain',
//     label: '全民红包雨',
//   },
//   {
//     value: 'defaultShake',
//     label: '默认摇一摇',
//   },
//   {
//     value: 'monkeyClimbing',
//     label: '猴子爬树',
//   },
//   {
//     value: 'crazySwimming',
//     label: '疯狂游泳',
//   },
//   {
//     value: 'urbanRacing',
//     label: '都市赛车',
//   },
//   {
//     value: 'whoIsTheBest',
//     label: '谁最牛',
//   },
//   {
//     value: 'chasingTheBride',
//     label: '追新娘',
//   },
//   {
//     value: 'weddingCarShake',
//     label: '婚车摇一摇',
//   },
//   {
//     value: 'dragonBoatRace',
//     label: '赛龙舟',
//   },
//   {
//     value: 'liftThePalanquin',
//     label: '抬花轿',
//   },
//   {
//     value: 'tigerYearSkiing',
//     label: '虎年滑雪',
//   },
//   {
//     value: 'rabbitFlying',
//     label: '兔飞猛进',
//   },
//   {
//     value: 'dragonInTheSky',
//     label: '飞龙在天',
//   },
//   {
//     value: 'cutFruit',
//     label: '切水果',
//   },
//   {
//     value: 'countingMoney',
//     label: '数钞票',
//   },
//   {
//     value: 'countingMoneyNew',
//     label: '数钞票(新)',
//   },
//   {
//     value: 'pigout',
//     label: '狼吞虎咽',
//   },
//   {
//     value: 'clickTiger',
//     label: '武松打虎',
//   },
//   {
//     value: 'playFootball',
//     label: '谁是射手王',
//   },
//   {
//     value: 'basketballShoot',
//     label: '兔子投篮',
//   },
//   {
//     value: 'dragonPlayBead',
//     label: '游龙戏珠',
//   },
//   {
//     value: 'redPacketWall',
//     label: '红包墙',
//   },
//   {
//     value: 'openTreasureBox',
//     label: '开宝箱',
//   },
//   {
//     value: 'threeDLotteryEnterprise',
//     label: '3D抽奖',
//   },
//   {
//     value: 'listLottery',
//     label: '名单抽奖',
//   },
//   {
//     value: 'listLotteryParticle',
//     label: '新名单抽奖',
//   },
//   {
//     value: 'bigScreenLottery',
//     label: '巨幕抽奖',
//   },
//   {
//     value: 'earthLottery',
//     label: '地球抽奖',
//   },
//   {
//     value: 'pictureLottery',
//     label: '图片抽奖',
//   },
//   {
//     value: 'cardDraw',
//     label: '卡牌抽奖',
//   },
//   {
//     value: 'wheelLottery',
//     label: '转盘抽奖',
//   },
//   {
//     value: 'guessStar',
//     label: '搞笑猜明星',
//   },
//   {
//     value: 'guessStarCommon',
//     label: '猜明星',
//   },
//   {
//     value: 'guessIdiom',
//     label: '开心猜成语',
//   },
//   {
//     value: 'guessIdiomCommon',
//     label: '猜成语',
//   },
//   {
//     value: 'vote',
//     label: '投票',
//   },
//   {
//     value: 'guessHero',
//     label: '猜英雄',
//   },
//   {
//     value: 'guessSong',
//     label: '猜歌名',
//   },
//   {
//     value: 'guessStarBySteps',
//     label: '火眼金睛',
//   },
//   {
//     value: 'mahjong',
//     label: '互动雀神大赛',
//   },
//   {
//     value: 'mahjongV1',
//     label: '雀神大赛',
//   },
//   {
//     value: 'poem',
//     label: '诗词答题',
//   },
//   {
//     value: 'jumpBone',
//     label: '跳一跳',
//   },
//   {
//     value: 'giveMark',
//     label: '评分',
//   },
//   {
//     value: 'aoteman',
//     label: '猜奥特曼',
//   },
//   {
//     value: 'guessTextColor',
//     label: '说颜色',
//   },
//   {
//     value: 'guessGenerality',
//     label: '猜电影',
//   },
//   {
//     value: 'hanzi',
//     label: '神奇的汉字',
//   },
//   {
//     value: 'happyQA',
//     label: '开心问答',
//   },
//   {
//     value: 'guessLanternRiddle',
//     label: '猜灯谜',
//   },
//   {
//     value: 'gestureRiddle',
//     label: '你划我猜',
//   },
//   {
//     value: 'msgWall',
//     label: '祝福榜',
//   },
//   {
//     value: 'danmu',
//     label: '弹幕',
//   },
//   {
//     value: 'qrCode',
//     label: '二维码',
//   },
//   {
//     value: 'music',
//     label: '音乐',
//   },
//   {
//     value: 'curtainCall',
//     label: '谢幕',
//   },
//   {
//     value: 'guessSpeech',
//     label: '台词模仿秀',
//   },
//   {
//     value: 'guessPicture',
//     label: '看图识景',
//   },
//   {
//     value: 'guessBrand',
//     label: '品牌达人',
//   },
//   {
//     value: 'shoutRedPacket',
//     label: '喊红包',
//   },
//   {
//     value: 'luckySnake',
//     label: '福蛇贺岁',
//   },
//   {
//     value: 'goldenSnake',
//     label: '金蛇纳福',
//   },
//   {
//     value: 'playGift',
//     label: '免费发礼物',
//   },
//   {
//     value: 'playPicture',
//     label: '画面定格',
//   },
//   {
//     value: 'playVideo',
//     label: '视频播放',
//   },
// ];

// 扁平化页面交互菜单
const allPageInteractionItems = (function flatten(items) {
  return items.reduce((acc, item) => {
    if (item.children) {
      return acc.concat(flatten(item.children));
    }
    acc.push(item);
    return acc;
  }, []);
}(pageInteractionMenu));

// 合并所有菜单项并创建ID到菜单项的Map
const allMenuItems = [...allPageInteractionItems, ...globalControlMenu];
const menuItemsById = new Map(allMenuItems.map((item) => [item.id, item]));

// controlMode.value到菜单项ID的映射
const controlValueMapping = {
  danmu: 'danmu',
  curtainCall: 'curtainCall',
  '3DSignIn': '3dSign',
  startRite: 'openingCeremony',
  spinItUp: 'zyz',
  twistItUp: 'nyn',
  raceAgainstTime: 'zfdm',
  sendBlessing: 'wishRank',
  tapRedPacket: 'clickRedEnvelope',
  shakeRedPacket: 'shakeRedEnvelope',
  peopleRedPacketRain: 'nationalRedEnvelopeRain',
  shoutRedPacket: 'shoutRedEnvelope',
  monkeyClimbing: 'monkeyClimbingTree',
  urbanRacing: 'cityCarRace',
  chasingTheBride: 'chaseBride',
  liftThePalanquin: 'carryWeddingSedan',
  rabbitFlying: 'rabbitFlyingForward',
  dragonInTheSky: 'flyingDragon',
  luckySnake: 'fortuneSnake',
  countingMoney: 'mouseCashTicket',
  countingMoneyNew: 'countCashNew',
  pigout: 'wolfSwallow',
  clickTiger: 'wusongFightTiger',
  playFootball: 'whoIsTheShooter',
  basketballShoot: 'rabbitBasketball',
  dragonPlayBead: 'swimmingDragon',
  redPacketWall: 'hbWall',
  openTreasureBox: 'kbx',
  threeDLotteryEnterprise: '3dDraw',
  listLottery: 'listDraw',
  listLotteryParticle: 'newListDraw',
  bigScreenLottery: 'giantWheelDraw',
  earthLottery: 'earthDraw',
  pictureLottery: 'imageDraw',
  wheelLottery: 'turntableDraw',
  guessStar: 'funnyGuessStar',
  guessStarCommon: 'guessStar',
  guessIdiom: 'happyGuessIdioms',
  guessIdiomCommon: 'guessIdioms',
  guessSong: 'guessSongName',
  mahjong: 'interactiveGodCompetition',
  mahjongV1: 'godCompetition',
  poem: 'poetryQuiz',
  jumpBone: 'jump',
  giveMark: 'rating',
  guessGenerality: 'guessMovie',
  happyQA: 'happyQnA',
  guessLanternRiddle: 'guessRiddle',
  gestureRiddle: 'drawGuess',
  guessPicture: 'guessLandmarks',
  msgWall: 'wishWall',
  qrCode: 'qrcode',
  music: 'voice',
  playGift: 'freeGift',
  playPicture: 'photoFix',
  playVideo: 'videoPlay',
  cutFruit: 'cutFruit',
  tigerYearSkiing: 'tigerYearSkiing',
  crazySwimming: 'crazySwimming',
  whoIsTheBest: 'whoIsTheBest',
  weddingCarShake: 'weddingCarShake',
  dragonBoatRace: 'dragonBoatRace',
  cardDraw: 'cardDraw',
  aoteman: 'aoteman',
  guessTextColor: 'guessTextColor',
  hanzi: 'hanzi',
  guessSpeech: 'guessSpeech',
  guessBrand: 'guessBrand',
  guessHero: 'guessHero',
};

export function convertControlModeToMenu(controlModePart) {
  if (!Array.isArray(controlModePart)) {
    return [];
  }
  return controlModePart
    .map((value) => {
      const targetId = controlValueMapping[value] || value;
      return menuItemsById.get(targetId);
    })
    .filter(Boolean);
}

// Add these new helper functions at the bottom of the file
export function filterMenuByConverted(convertedMenu, pageInteractionMenu, globalControlMenu) {
  const filteredPageMenu = [];
  const filteredGlobalMenu = [];

  const isInConvertedMenu = (item) => {
    return convertedMenu.some((convertedItem) => convertedItem.id === item.id);
  };

  // Filter pageInteractionMenu
  pageInteractionMenu.forEach((section) => {
    const filteredSection = { ...section };
    if (section.children) {
      filteredSection.children = section.children.filter((child) => {
        if (child.children) {
          child.children = child.children.filter((subChild) => isInConvertedMenu(subChild));
          return child.children.length > 0;
        }
        return isInConvertedMenu(child);
      });
    }
    if (filteredSection.children && filteredSection.children.length > 0) {
      filteredPageMenu.push(filteredSection);
    }
  });

  // Special handling for globalControlMenu
  const specialMenuIds = new Set(['freeGift', 'photoFix', 'videoPlay', 'qrcode', 'voice', 'curtainCall', 'wishWall', 'danmu']);
  globalControlMenu.forEach((item) => {
    if (specialMenuIds.has(item.id)) {
      // Only include if exists in convertedMenu
      if (isInConvertedMenu(item)) {
        filteredGlobalMenu.push(item);
      }
    } else {
      // Include all other items
      filteredGlobalMenu.push(item);
    }
  });

  return {
    filteredPageMenu,
    filteredGlobalMenu,
  };
}
