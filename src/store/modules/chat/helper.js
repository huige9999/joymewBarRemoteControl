import { generateRandomId, getCurrentDate } from '@/utils/index';

// 聊天记录中的礼物图标(通用)
const CHAT_ICON = {
  bapin: 'https://ustatic.joymew.com/joymewScreen/hd2/bapinIconNew.png',
  photo: 'https://ustatic.joymew.com/joymewScreen/hd2/photoIconNew.png',
  rocket: 'https://ustatic.joymew.com/joymewScreen/hd2/danmuIconNew.png',
  superDanmu: 'https://ustatic.joymew.com/joymewScreen/hd2/superDanmuIcon.png',
  hbkd: 'https://ustatic.joymew.com/joymewScreen/hd2/hbkdIconNew.png',
  photoWall: 'https://ustatic.joymew.com/joymewScreen/hd2/photoWallIconNew.png',
};
// 中式婚礼版聊天记中的图标
const CHATICON_ZSHL = {
  bapin: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zfhfIconEtry.png',
  photo: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoIcon.png',
  rocket: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/zsdm.png',
  superDanmu: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/allScreenIcon.png',
  hbkd: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/hbkdIcon.png',
  photoWall: 'https://ustatic.joymew.com/joymewScreen/zshl/mobile/photoInstant.png',
};

/**
 * 获取礼物图片
 */
const getGiftImg = ({ giftType, giftId, sceneType }) => {
  if (sceneType === '91') {
    if (giftId.includes('Miao_Bq')) {
      const XR_DANMUS = [
        'https://ustatic.joymew.com/joymewMp/zshl/danmu/dragonIcon.png',
        'https://ustatic.joymew.com/joymewMp/zshl/danmu/phonixIcon.png',
        'https://ustatic.joymew.com/joymewMp/zshl/danmu/sklinIcon.png',
      ];
      const targetNum = Number(giftId.split('_')[2]);
      return XR_DANMUS[targetNum - 1];
    }
    return CHATICON_ZSHL[giftType];
  }
  return CHAT_ICON[giftType];
};

const GIFT_TYPE = {
  Miao_Bp: {
    label: '祝福横幅',
    value: 'Miao_Bp',
    image: getGiftImg({ giftType: 'bapin', giftId: 'Miao_Bp', sceneType: '' }),
  },
  Miao_Tp: {
    label: '照片霸屏',
    value: 'Miao_Tp',
    image: getGiftImg({ giftType: 'photo', giftId: 'Miao_Tp', sceneType: '' }),
  },
  Miao_Bq: {
    label: '火箭弹幕',
    value: 'Miao_Bq',
    image: getGiftImg({ giftType: 'rocket', giftId: 'Miao_Bq', sceneType: '' }),
  },
  Miao_SuperDanmu: {
    label: '超级弹幕',
    value: 'Miao_SuperDanmu',
    image: getGiftImg({ giftType: 'superDanmu', giftId: 'Miao_SuperDanmu', sceneType: '' }),
  },
  hbkd: {
    label: '红包',
    value: 'hbkd',
    image: getGiftImg({ giftType: 'hbkd', giftId: 'hbkd', sceneType: '' }),
  },
  Miao_PhotoWall: {
    label: '照片墙',
    value: 'Miao_PhotoWall',
    image: getGiftImg({ giftType: 'photoWall', giftId: 'Miao_PhotoWall', sceneType: '' }),
  },
  gift: (giftList, giftId) => {
    const tmpGift = giftList.find((item) => item.giftconst === giftId);
    if (tmpGift) {
      return {
        label: tmpGift.giftname,
        value: 'gift',
        image: tmpGift.imglink,
      };
    }
    return null;
  },
};

// 工具函数，用来生成content
// const generateContent = (giftTypeInfo, content) => {
//   if (giftTypeInfo) {
//     return content
//       ? `送来了：${giftTypeInfo.label}\n${content}` // 如果content有值
//       : `送来了：${giftTypeInfo.label}`; // 如果content无值
//   }
//   return content; // 如果giftTypeInfo无值，直接返回原始content
// };

/**
 *
 * @param {string} giftId
 * @param {Array} giftList
 * @returns {{label:string,value:string} | null}
 */
export const getGiftType = (giftId, giftList = []) => {
  if (!giftId) {
    return null;
  }
  // 处理非gift类型的礼物
  const giftKeys = Object.keys(GIFT_TYPE).filter((key) => key !== 'gift');
  const matchedKey = giftKeys.find((key) => giftId.includes(key));
  if (matchedKey) {
    return GIFT_TYPE[matchedKey];
  }
  // 处理gift类型的礼物
  return GIFT_TYPE.gift(giftList, giftId);
};

export const mapChatList = (chatList, giftListAll) => {
  return chatList.map((chat) => {
    const giftTypeInfo = getGiftType(chat.miaoLiwuId, giftListAll);
    return {
      id: generateRandomId(),
      nickname: chat.miaoName,
      avatar: chat.miaoTxUrl,
      // 【修改】直接使用原始 content，不再拼接 "送来了..."
      content: chat.miaoContent,
      rawContent: chat.miaoContent, // 保留原始 content
      sendDateTime: chat.sentTime,
      userId: chat.miaoId,
      giftId: chat.miaoLiwuId,
      giftTypeInfo, // 包含 { label, value, image } 的对象
      // 【新增】将礼物图片地址提升为顶层属性，方便模板直接使用
      giftImage: giftTypeInfo ? giftTypeInfo.image : null,
      photo: chat.miaoTpUrl,
    };
  });
};

export const formatChatFromWSH5 = (chat, giftListAll) => {
  // 获取礼物类型信息，使用与mapChatList相同的逻辑
  const giftTypeInfo = getGiftType(chat.miaoLwId, giftListAll);

  return {
    id: generateRandomId(),
    nickname: chat.miaoName,
    avatar: chat.miaoHeadUrl,
    // 【修改】直接使用原始 content (bless)
    content: chat.miaoBless,
    rawContent: chat.miaoBless,
    sendDateTime: getCurrentDate(),
    userId: chat.miaoId,
    giftId: chat.miaoLwId,
    giftTypeInfo, // 包含 { label, value, image } 的对象
    // 【新增】将礼物图片地址提升为顶层属性
    giftImage: giftTypeInfo ? giftTypeInfo.image : null,
    photo: chat.miaoTuUrl,
  };
};
