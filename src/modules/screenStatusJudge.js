import Vue from 'vue';

let screenStatus = 'unknown'; // 取值 unknown | on | off | multiple
let timerForScreenOn = null; // 定时器
const countdown = 3;
let timerForMultiple = null; // 定时器
const tmpMsgQueue = []; // 临时消息队列

const TIP_MAP = {
  off: '大屏未开启',
  multiple: '开启了多个大屏!',
};
/**
 * 清空定时器
 */
function clearTimerForScreenOn() {
  clearTimeout(timerForScreenOn);
  timerForScreenOn = null;
}

function clearTimerForMultiple() {
  clearTimeout(timerForMultiple);
  timerForMultiple = null;
}

/*
 * 设置大屏状态，并提示
 */
function setScreenStatusAndTip(status) {
  screenStatus = status;
  if (TIP_MAP[status]) {
    Vue.prototype.$toast.fail(TIP_MAP[status]);
  }
}
function judgeMsgRepeat() {
  // 判断tmpMsgQueue中的对象是否有重复的
  const msgSet = new Set();
  for (let i = 0; i < tmpMsgQueue.length; i++) {
    const msgStr = JSON.stringify(tmpMsgQueue[i]);
    if (msgSet.has(msgStr)) {
      return true;
    }
    if (!(tmpMsgQueue[i].type === 'gameInit' && !tmpMsgQueue[i].data.gameId)) {
      // 只比较有效的信息
      msgSet.add(msgStr);
    }
  }
  return false;
}

/**
 * 收集1s内的消息，并判断是否有多个大屏开启
 */
function collectMsgInRangeTimeAndJudgeMultiple(msgData) {
  tmpMsgQueue.push(msgData);
  if (timerForMultiple) {
    return;
  }
  timerForMultiple = setTimeout(() => {
    clearTimerForMultiple();
    if (judgeMsgRepeat()) {
      setScreenStatusAndTip('multiple');
    }
    // 1s时间到则清空队列
    tmpMsgQueue.length = 0;
  }, 1000);
}

/**
 * 询问大屏状态
 */
export function queryScreenStatus() {
  if (timerForScreenOn) {
    return;
  }
  timerForScreenOn = setTimeout(() => {
    setScreenStatusAndTip('off');
    clearTimerForScreenOn();
  }, countdown * 1000);
}

/**
 * 告知大屏状态
 */
export function tellScreenStatus(msgData) {
  setScreenStatusAndTip('on');
  if (timerForScreenOn) {
    clearTimerForScreenOn();
  }

  collectMsgInRangeTimeAndJudgeMultiple(msgData);
}

/**
 * 获取当前大屏状态
 */
export function getScreenStatus() {
  return screenStatus;
}
