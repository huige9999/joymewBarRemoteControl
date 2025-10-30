/**
 * 从礼物API响应数据中提取并计算giftListAll数组
 * @param {Object} giftApiRes - getGiftList() API的返回数据
 * @returns {Array} 完整的礼物列表数组
 */
export const computeGiftListAll = (giftApiRes) => {
  if (!giftApiRes || !giftApiRes.data) {
    return [];
  }

  const { data: giftListObj } = giftApiRes;
  let giftListAll = [];

  // 合并所有分类的礼物列表
  Object.keys(giftListObj).forEach((key) => {
    if (Array.isArray(giftListObj[key])) {
      giftListAll = giftListAll.concat(giftListObj[key]);
    }
  });

  return giftListAll;
};
export const noop = () => {};
