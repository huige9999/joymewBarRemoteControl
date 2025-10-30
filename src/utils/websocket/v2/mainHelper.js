import store from '@/store';

const REPLYCODE = {
  ON_NEXTSONG: '5090',
};

const handleRemoteControlMessage = (message) => {
  try {
    if (message?.type !== 'yaokongqi') {
      return;
    }
    const payload = message?.data?.miaoYkqCode;
    if (!payload) {
      return;
    }
    const parsed = JSON.parse(payload);
    if (parsed.code === REPLYCODE.ON_NEXTSONG) {
      store.commit('setCurrentSongId', parsed.param);
    }
  } catch (error) {
    console.error('Failed to handle remote control message', error);
  }
};

export default handleRemoteControlMessage;
