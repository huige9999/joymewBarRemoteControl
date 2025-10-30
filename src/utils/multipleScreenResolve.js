/**
 * 多个大屏解决方案
 *
 * 默认导出vue实例，可以实现通信
 */

import * as utils from '@/utils';
import Vue from 'vue';
// 雀神大赛

/**
 * 总题库，答案数量为1~6各三十道题目，总共180道题目
 * @date 2024-11-07
 * @author LXY
 */
export const TOTALSUBJECTLIST = [
  {
    mahjongSubjectList: [2, 2, 3, 4, 5, 6, 6, 7, 8, 8, 9, 9, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 2, 4, 4, 5, 6, 7, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 5, 6, 6, 6, 7, 9, 9, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 5, 6, 6, 6, 7, 8, 9, 9],
    mahjongAnswerList: [5],
  },
  {
    mahjongSubjectList: [1, 3, 4, 4, 4, 6, 6, 6, 7, 7, 7, 8, 9],
    mahjongAnswerList: [2],
  },
  {
    mahjongSubjectList: [1, 1, 2, 4, 4, 4, 5, 5, 6, 6, 7, 8, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 9],
    mahjongAnswerList: [2],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 8, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 1, 1, 3, 3, 4, 4, 5, 5, 6, 7, 7, 8],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 4, 5, 5, 5, 6, 7, 8, 9, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 4, 5, 6, 6, 6, 7, 7, 8, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [2, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [2],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 8, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 1, 3, 4, 4, 4, 4, 5, 5, 7, 7, 9, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 4, 4, 4, 5, 7, 8, 8, 9, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 4, 4, 5, 6, 7, 8, 8, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 5, 5, 6, 7, 7, 7, 8, 9],
    mahjongAnswerList: [6],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 8, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 5, 5, 5, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [2],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 4, 5, 5, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 3, 3, 3, 4, 6, 6, 7, 8, 8],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 5, 7, 8, 8, 8, 9, 9],
    mahjongAnswerList: [6],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 4, 4, 5, 5, 5, 6, 6, 8, 8],
    mahjongAnswerList: [5],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 4, 4, 4, 6, 6, 8, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 4, 4, 5, 6, 7, 7, 8, 9],
    mahjongAnswerList: [3],
  },
  {
    mahjongSubjectList: [1, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 9],
    mahjongAnswerList: [2],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 5, 5, 6, 6, 7, 7, 9],
    mahjongAnswerList: [9],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 2, 6, 6, 7, 8, 8, 9, 9, 9],
    mahjongAnswerList: [7],
  },
  {
    mahjongSubjectList: [3, 4, 5, 5, 5, 6, 7, 7, 8, 8, 8, 9, 9],
    mahjongAnswerList: [6, 7],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 6, 7, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 6, 6, 7, 7, 8, 9, 9],
    mahjongAnswerList: [5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 3, 3, 4, 4, 6, 7, 8, 8],
    mahjongAnswerList: [5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 3, 4, 5, 5, 6, 6, 7, 8],
    mahjongAnswerList: [4, 7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 2, 4, 4, 5, 5, 5, 7, 8, 9],
    mahjongAnswerList: [1, 4],
  },
  {
    mahjongSubjectList: [1, 1, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9],
    mahjongAnswerList: [2, 5],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 7, 9, 9],
    mahjongAnswerList: [7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 6, 6, 7, 7, 7, 8, 9, 9],
    mahjongAnswerList: [7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 9],
    mahjongAnswerList: [1, 4],
  },
  {
    mahjongSubjectList: [1, 1, 3, 3, 3, 4, 5, 6, 6, 7, 7, 8, 9],
    mahjongAnswerList: [5, 8],
  },
  {
    mahjongSubjectList: [1, 2, 2, 2, 3, 3, 4, 5, 7, 7, 9, 9, 9],
    mahjongAnswerList: [2, 7],
  },
  {
    mahjongSubjectList: [1, 2, 2, 2, 3, 4, 4, 5, 6, 7, 7, 8, 9],
    mahjongAnswerList: [2, 4],
  },
  {
    mahjongSubjectList: [1, 1, 3, 3, 4, 4, 5, 5, 5, 6, 7, 8, 8],
    mahjongAnswerList: [1, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9],
    mahjongAnswerList: [5, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 5, 5, 6, 8, 8, 8, 9, 9],
    mahjongAnswerList: [5, 9],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8, 8],
    mahjongAnswerList: [3, 6],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 4, 5, 5, 7, 7, 8, 8, 9],
    mahjongAnswerList: [6, 9],
  },
  {
    mahjongSubjectList: [1, 1, 3, 4, 5, 5, 6, 7, 7, 8, 8, 8, 9],
    mahjongAnswerList: [1, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 4, 5, 7, 7, 7, 8, 9],
    mahjongAnswerList: [3, 6],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 5, 6, 7, 7, 8, 8, 8, 9],
    mahjongAnswerList: [1, 8],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 5, 6, 7, 8, 8, 8, 9, 9],
    mahjongAnswerList: [4, 9],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 7, 8, 8],
    mahjongAnswerList: [1, 4],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 4, 4, 6, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [6, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 8, 8, 9],
    mahjongAnswerList: [4, 8],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 4, 5, 6, 6, 6, 7, 8, 8, 8],
    mahjongAnswerList: [1, 4],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 2, 3, 4, 5, 6, 6, 6, 7, 7],
    mahjongAnswerList: [1, 7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 9],
    mahjongAnswerList: [1, 9],
  },
  {
    mahjongSubjectList: [1, 1, 3, 3, 4, 4, 5, 5, 7, 8, 8, 8, 9],
    mahjongAnswerList: [1, 8],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9],
    mahjongAnswerList: [2, 5],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 9],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 3, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [1, 2, 3],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8],
    mahjongAnswerList: [2, 5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 4, 5, 6, 6, 7, 7, 8],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 7, 7, 8],
    mahjongAnswerList: [2, 5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 5, 6, 6, 6, 7, 7, 8, 8],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [2, 3, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8],
    mahjongAnswerList: [1, 3, 4],
  },
  {
    mahjongSubjectList: [1, 1, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 9],
    mahjongAnswerList: [2, 5, 8],
  },
  {
    mahjongSubjectList: [2, 3, 3, 3, 4, 4, 5, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [3, 6, 9],
  },
  {
    mahjongSubjectList: [1, 1, 4, 4, 4, 4, 5, 5, 6, 6, 7, 9, 9],
    mahjongAnswerList: [1, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9],
    mahjongAnswerList: [3, 6, 9],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 4, 5, 6, 6, 6, 7, 8, 9],
    mahjongAnswerList: [1, 3, 6],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [3, 6, 9],
  },
  {
    mahjongSubjectList: [3, 3, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [3, 6, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 5, 6, 7, 8, 8, 8, 9, 9],
    mahjongAnswerList: [5, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 9, 9, 9],
    mahjongAnswerList: [4, 6, 9],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 5, 6, 6, 6, 6, 7, 8, 9],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 5, 6, 6, 6, 7, 7, 8, 9],
    mahjongAnswerList: [1, 4, 6],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 9, 9],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 8, 8, 9],
    mahjongAnswerList: [2, 5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 9],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 8],
    mahjongAnswerList: [2, 5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [3, 6, 9],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 3, 4, 4, 5, 6, 6, 7, 8, 9],
    mahjongAnswerList: [1, 4, 5],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8],
    mahjongAnswerList: [1, 4, 7],
  },
  {
    mahjongSubjectList: [3, 3, 3, 4, 5, 5, 6, 7, 8, 8, 8, 9, 9],
    mahjongAnswerList: [3, 6, 9],
  },
  {
    mahjongSubjectList: [1, 1, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9],
    mahjongAnswerList: [1, 5, 8],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 3, 3, 4, 5, 6, 6, 7, 8, 9],
    mahjongAnswerList: [3, 6, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 5, 6, 7, 7, 7, 8, 8, 8],
    mahjongAnswerList: [3, 5, 6],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9],
    mahjongAnswerList: [5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 9],
    mahjongAnswerList: [1, 4, 7, 9],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 2, 3, 4, 5, 6, 7, 7, 8, 9],
    mahjongAnswerList: [1, 2, 5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7],
    mahjongAnswerList: [2, 3, 5, 8],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 4, 4, 5, 6, 7, 7, 7, 9, 9],
    mahjongAnswerList: [1, 4, 7, 9],
  },
  {
    mahjongSubjectList: [1, 1, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 8],
    mahjongAnswerList: [1, 3, 6, 9],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 4, 4, 6, 7, 8, 8, 8],
    mahjongAnswerList: [1, 4, 5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 7, 8, 9],
    mahjongAnswerList: [2, 3, 5, 6],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 9, 9, 9],
    mahjongAnswerList: [1, 4, 7, 8],
  },
  {
    mahjongSubjectList: [2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9],
    mahjongAnswerList: [1, 2, 4, 7],
  },
  {
    mahjongSubjectList: [1, 1, 1, 4, 4, 5, 5, 6, 6, 7, 7, 9, 9],
    mahjongAnswerList: [1, 4, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 9, 9, 9],
    mahjongAnswerList: [1, 4, 7, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 4, 5, 5, 6, 6, 9, 9],
    mahjongAnswerList: [1, 4, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 8],
    mahjongAnswerList: [2, 3, 4, 5],
  },
  {
    mahjongSubjectList: [2, 3, 3, 4, 4, 5, 5, 6, 7, 7, 9, 9, 9],
    mahjongAnswerList: [1, 4, 7, 8],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8],
    mahjongAnswerList: [2, 3, 5, 8],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 4, 5, 5, 6, 7, 9, 9, 9],
    mahjongAnswerList: [1, 4, 7, 8],
  },
  {
    mahjongSubjectList: [1, 2, 3, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 6, 6, 6, 7, 7, 8, 9, 9],
    mahjongAnswerList: [1, 4, 7, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 4, 4, 6, 6, 6, 8, 8],
    mahjongAnswerList: [1, 4, 6, 8],
  },
  {
    mahjongSubjectList: [1, 2, 2, 2, 3, 4, 5, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [1, 3, 6, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9],
    mahjongAnswerList: [6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 2, 7, 7, 8, 8, 9, 9, 9],
    mahjongAnswerList: [6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 4, 5, 5, 5, 7, 8, 9],
    mahjongAnswerList: [1, 3, 4, 6],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 2, 2, 2, 3, 4, 5, 6, 7, 7, 8, 9],
    mahjongAnswerList: [1, 3, 4, 7],
  },
  {
    mahjongSubjectList: [1, 2, 3, 5, 5, 6, 6, 7, 7, 8, 9, 9, 9],
    mahjongAnswerList: [4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 3, 4, 4, 5, 6, 6, 6, 7, 8],
    mahjongAnswerList: [2, 5, 6, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 7, 8],
    mahjongAnswerList: [1, 3, 4, 5],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 4, 5, 6, 6, 8, 8, 8],
    mahjongAnswerList: [3, 5, 6, 7],
  },
  {
    mahjongSubjectList: [1, 1, 1, 3, 3, 3, 4, 5, 6, 7, 7, 8, 9],
    mahjongAnswerList: [2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 6, 7, 7, 8, 8, 8],
    mahjongAnswerList: [1, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9, 9, 9],
    mahjongAnswerList: [2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [4, 4, 4, 4, 5, 6, 6, 7, 8, 8, 8, 8, 9],
    mahjongAnswerList: [3, 5, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 5, 5, 5, 5, 6, 7, 8, 9],
    mahjongAnswerList: [1, 3, 4, 6, 7],
  },
  {
    mahjongSubjectList: [2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 9, 9, 9],
    mahjongAnswerList: [1, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7],
    mahjongAnswerList: [2, 3, 5, 6, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9],
    mahjongAnswerList: [2, 3, 5, 6, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 5, 6, 6, 6, 7, 8],
    mahjongAnswerList: [4, 5, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9],
    mahjongAnswerList: [1, 2, 3, 4, 7],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 5, 5, 5, 6, 6, 7, 8],
    mahjongAnswerList: [3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 3, 4, 5, 5, 6, 7, 8, 9, 9, 9],
    mahjongAnswerList: [2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9],
    mahjongAnswerList: [1, 2, 3, 6, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 4, 5, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [3, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 8],
    mahjongAnswerList: [4, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 5, 6, 7, 7, 8, 9, 9, 9],
    mahjongAnswerList: [5, 6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [3, 3, 3, 4, 5, 6, 7, 7, 8, 8, 9, 9, 9],
    mahjongAnswerList: [3, 6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 5, 5, 5, 6, 6, 7, 8, 9],
    mahjongAnswerList: [3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8, 8],
    mahjongAnswerList: [3, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 6, 6, 6, 7, 8, 8, 8, 9, 9, 9],
    mahjongAnswerList: [5, 6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 4, 5, 6, 7, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [1, 4, 7, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 5, 6, 6, 6, 7, 7, 7],
    mahjongAnswerList: [2, 4, 5, 6, 7],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [1, 4, 7, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 9, 9],
    mahjongAnswerList: [1, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [2, 2, 3, 3, 4, 4, 5, 6, 6, 6, 7, 8, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7],
  },
  {
    mahjongSubjectList: [2, 2, 2, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9],
    mahjongAnswerList: [3, 4, 5, 6, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 5, 5, 6, 6, 6, 7, 7],
    mahjongAnswerList: [2, 3, 5, 6, 7],
  },
  {
    mahjongSubjectList: [1, 2, 3, 5, 6, 7, 7, 7, 8, 8, 9, 9, 9],
    mahjongAnswerList: [4, 6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7, 8, 9],
    mahjongAnswerList: [2, 3, 4, 5, 7],
  },
  {
    mahjongSubjectList: [1, 2, 3, 3, 4, 5, 6, 7, 7, 7, 7, 8, 8],
    mahjongAnswerList: [2, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9],
    mahjongAnswerList: [1, 4, 5, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [2, 3, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 7, 8],
    mahjongAnswerList: [1, 2, 3, 4, 5, 8],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [3, 3, 3, 4, 5, 6, 6, 7, 7, 7, 8, 8, 8],
    mahjongAnswerList: [3, 5, 6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8],
    mahjongAnswerList: [2, 3, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 9, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8],
    mahjongAnswerList: [3, 4, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [1, 1, 1, 4, 5, 6, 7, 8, 8, 8, 9, 9, 9],
    mahjongAnswerList: [3, 4, 6, 7, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 6, 7, 7, 8, 8, 8, 8, 9],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8],
    mahjongAnswerList: [2, 3, 5, 6, 8, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 8],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 6, 6, 6, 6, 7, 7, 8, 8, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 6, 7, 7, 8, 8, 9, 9, 9, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 8],
    mahjongAnswerList: [1, 4, 5, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 5, 5, 5, 6, 7, 8, 8, 8],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 6, 6, 6, 6, 7, 9, 9, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [2, 3, 4, 5, 5, 5, 6, 7, 7, 7, 9, 9, 9],
    mahjongAnswerList: [1, 4, 5, 6, 7, 8],
  },
  {
    mahjongSubjectList: [2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 9, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [1, 1, 1, 2, 2, 2, 3, 4, 4, 4, 5, 6, 7],
    mahjongAnswerList: [1, 2, 3, 4, 5, 8],
  },
  {
    mahjongSubjectList: [1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 8, 8],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [1, 2, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9],
    mahjongAnswerList: [1, 3, 4, 5, 6, 9],
  },
  {
    mahjongSubjectList: [2, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 8, 9],
    mahjongAnswerList: [1, 3, 4, 5, 6, 9],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 3, 3, 4, 5, 6, 6, 7, 7, 8],
    mahjongAnswerList: [2, 3, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 9, 9],
    mahjongAnswerList: [1, 2, 4, 5, 7, 8],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 4, 5, 5, 6, 6, 6, 7, 7, 8],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
  {
    mahjongSubjectList: [2, 2, 2, 3, 4, 5, 6, 7, 7, 8, 8, 9, 9],
    mahjongAnswerList: [1, 3, 4, 6, 7, 9],
  },
].map((item) => {
  // 随机改变花色
  function getRandomNumber() {
    return 1 + Math.floor(Math.random() * 3); // 生成1到3之间的随机数
  }

  const type = getRandomNumber();
  return {
    mahjongSubjectList: item.mahjongSubjectList.map((item) => {
      let newItem = item;
      if (type === 2) {
        newItem = item + 10;
      } else if (type === 3) {
        newItem = item + 20;
      }
      return newItem;
    }),
    mahjongAnswerList: item.mahjongAnswerList.map((item) => {
      let newItem = item;
      if (type === 2) {
        newItem = item + 10;
      } else if (type === 3) {
        newItem = item + 20;
      }
      return newItem;
    }),
  };
});

/**
 * 每张牌对应的图片链接
 * @date 2024-11-08
 * @author LXY
 */
// 1-9 -> 万；11-19 -> 筒；21-29 -> 条
const MAHJONGIMGS = [
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/1.png',
    value: 1,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/2.png',
    value: 2,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/3.png',
    value: 3,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/4.png',
    value: 4,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/5.png',
    value: 5,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/6.png',
    value: 6,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/7.png',
    value: 7,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/8.png',
    value: 8,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/9.png',
    value: 9,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/11.png',
    value: 11,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/12.png',
    value: 12,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/13.png',
    value: 13,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/14.png',
    value: 14,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/15.png',
    value: 15,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/16.png',
    value: 16,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/17.png',
    value: 17,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/18.png',
    value: 18,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/19.png',
    value: 19,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/21.png',
    value: 21,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/22.png',
    value: 22,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/23.png',
    value: 23,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/24.png',
    value: 24,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/25.png',
    value: 25,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/26.png',
    value: 26,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/27.png',
    value: 27,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/28.png',
    value: 28,
  },
  {
    imgUrl: 'https://ustatic.joymew.com/joymewScreen/screenImage/miniGame/mahjong/29.png',
    value: 29,
  },
];

/**
 * 生成题目列表
 */
class MahjongQuestioner {
  #list;

  #index = -1;

  /**
   * @param {Number} total 总题数
   * @param {Number} type 题目类型 1:简单 2:普通
   */
  constructor(type = 1, total = 20) {
    this.total = total;
    /**
     * 目前的逻辑是简单的所有题库为1~3
     * 困难的为3~6
     */
    let result;
    if (type === 1) {
      result = TOTALSUBJECTLIST.filter(($) => $.mahjongAnswerList.length <= 3);
    } else {
      result = TOTALSUBJECTLIST.filter(($) => $.mahjongAnswerList.length >= 3);
    }

    /**
     * 将数组里面的数据，
     */
    this.#list = result
      .sort(() => Math.random() - 0.5) // 随机排序
      .slice(0, total)
      .map((item) => {
        const getImgUrl = (value) => MAHJONGIMGS.find((img) => img.value === value);
        // 将每张牌转化为图片链接
        const subjectList = item.mahjongSubjectList.map(getImgUrl);
        const answerList = item.mahjongAnswerList.map(getImgUrl);
        return {
          subjectList,
          answerList,
        };
      });
  }

  /**
   * 获取下一题，如果没有则是undefined需要判断
   * @returns
   */
  next(number) {
    /**
     * 因为index的默认值是-1，每次调用该方法必先加一
     * 所以 this.#list[this.#index]表示的是当前题目
     *
     *
     */
    this.#index++;
    if (!this.#list[this.#index]) return undefined;
    // 没传递任何参数则是正常获取下一题
    if (!number) {
      return this.#list[this.#index];
    }
    // 说明需要指定下一张牌的答案张数
    // 从总题库中取出答案为该张数的所有题目，目前是个30道总共180
    const allQuestion = TOTALSUBJECTLIST.filter(($) => $.mahjongAnswerList.length === number);
    // 判断从已经答题的题目中是否存在相同的题目
    const passQuestion = this.#list.slice(0, this.#index);

    // 拿到所有没有出现过的，符合答案张数的题目
    const noAppearQuestion = allQuestion.filter((question) => {
      // 如果所有题目中，该题目已经存在于已答题的题目中，则跳过
      let flag = false;
      passQuestion.forEach((passQ) => {
        if (passQ.subjectList.map((item) => item.value).toString() === question.mahjongSubjectList.toString()) {
          flag = true;
        }
      });
      return !flag;
    });
    // 打乱noAppearQuestion
    noAppearQuestion.sort(() => Math.random() - 0.5);
    // 拿出一题
    const current = noAppearQuestion.shift();

    // 将索引加一并且将上一题的题目改成刚才拿出的题目，
    const getImgUrl = (value) => MAHJONGIMGS.find((img) => img.value === value);
    this.#list[this.#index] = {
      answerList: current.mahjongAnswerList.map(getImgUrl),
      subjectList: current.mahjongSubjectList.map(getImgUrl),
    };

    return this.#list[this.#index];
  }

  getList() {
    return this.#list;
  }
}

let type = 1;
/**
 * 设置麻将题目的难易程度
 * @param {String} difficult
 */
export function setDifficulty(difficult) {
  if (difficult === 'easy') {
    type = 1;
  } else if (difficult === 'hard') {
    type = 2;
  }
}
/**
 * 获取麻将题库
 * @returns
 */

export function getQuestioner() {
  return new MahjongQuestioner(type);
}

let lastExeTime = 0;
/**
 * 是否可以执行代码
 * @returns
 */
export function canIExe() {
  const now = Date.now();
  if (now - lastExeTime > 1000) {
    lastExeTime = now;
    return true;
  }
  return false;
}

let fromScreen = false;

export function setFromScreen(isFromScreen) {
  fromScreen = isFromScreen;
}

export function getFromScreen() {
  return fromScreen;
}

/**
 *
 * 说颜色的多屏解决方案
 */

const COLORS = [
  { color: 'red', text: '红' },
  { color: 'orange', text: '橙' },
  { color: 'yellow', text: '黄' },
  { color: 'green', text: '绿' },
  { color: 'blue', text: '蓝' },
  { color: 'purple', text: '紫' },
  { color: 'black', text: '黑' },
  { color: 'gray', text: '灰' },
];
export class GuessColorQuestioner {
  #list;

  #index = -1;

  constructor(number = 20) {
    /**
     * 生成指定数量的题目，
     */
    const list = [];
    for (let i = 0; i < number; i++) {
      const question = [];
      for (let j = 0; j < 6; j++) {
        /**
         * 拿到随机的颜色
         */
        const { color } = COLORS[utils.getRandom(0, COLORS.length)];

        /**
         * 拿到随机的内容
         */
        const { text } = COLORS[utils.getRandom(0, COLORS.length)];

        question.push({
          color,
          text,
        });
      }
      list.push(question);
    }
    this.#list = list;

    console.log('所有说颜色的题目内容', list);
  }

  /**
   * 所有题目的答案
   */
  get answerList() {
    const answerList = [];

    this.#list.forEach((item) => {
      const answer = [];
      item.forEach((item) => {
        answer.push(item.text);
      });
      answerList.push(answer);
    });
    return answerList;
  }

  /**
   * 获取下一题
   */
  next() {
    return this.#list[++this.#index];
  }

  /**
   * 随机获取一道题目,不限次数
   */
  static getQuestion() {
    const question = [];
    for (let j = 0; j < 6; j++) {
      /**
       * 拿到随机的颜色
       */
      const { color } = COLORS[utils.getRandom(0, COLORS.length)];
      /**
       * 拿到随机的内容
       */
      const { text } = COLORS[utils.getRandom(0, COLORS.length)];

      question.push({
        color,
        text,
      });
    }
    return question;
  }

  static qToA(q) {
    switch (q) {
      case 'red':
        return '红';
      case 'orange':
        return '橙';
      case 'yellow':
        return '黄';
      case 'green':
        return '绿';
      case 'blue':
        return '蓝';
      case 'purple':
        return '紫';
      case 'black':
        return '黑';
      case 'gray':
        return '灰';
      default:
        return '';
    }
  }

  /**
   *
   */
}

/**
 * 遥控器进入猜文字颜色页面的时间戳,
 * 目的:存储
 */
let timeStamp = 0;

export function setCwzTimeStamp(number) {
  // alert(number);
  timeStamp = number;
}

export function getCwzTimeStamp() {
  return timeStamp;
}

export default new Vue();
