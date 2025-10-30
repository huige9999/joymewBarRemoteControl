import freeGiftIcon from '../imageV2/free-gift_icon.png';
import refreshIcon from '../imageV2/refresh_icon.png';
import giftRankIcon from '../imageV2/gift-rank_icon.png';
import danmuIcon from '../imageV2/danmu_icon.png';
import voiceIcon from '../imageV2/voice_icon.png';
// import fullscreenIcon from '../imageV2/fullscreen_icon.png';
import qrcodeIcon from '../imageV2/qrcode_icon.png';
import zfWallIcon from '../imageV2/zf-wall_icon.png';
import xiemuIcon from '../imageV2/xiemu_icon.png';
import photoFixIcon from '../imageV2/photo-fix_icon.png';
import videoPlayIcon from '../imageV2/video-play_icon.png';

const globalControlMenu = [
  { icon: freeGiftIcon, name: '免费礼物', id: 'freeGift' },
  { icon: refreshIcon, name: '刷新', id: 'refresh' },
  { icon: giftRankIcon, name: '礼物榜', id: 'giftRank' },
  { icon: danmuIcon, name: '弹幕', id: 'danmu' },
  { icon: voiceIcon, name: '声音', id: 'voice' },
  // { icon: fullscreenIcon, name: '全屏', id: 'fullscreen' },
  { icon: qrcodeIcon, name: '二维码', id: 'qrcode' },
  { icon: zfWallIcon, name: '祝福榜', id: 'wishWall' },
  { icon: xiemuIcon, name: '谢幕', id: 'curtainCall' },
  { icon: photoFixIcon, name: '画面定格', id: 'photoFix', meta: { path: '/fixedScreen' }, component: 'MultiMedia' },
  { icon: videoPlayIcon, name: '播放视频', id: 'videoPlay', meta: { path: '/videoPlayer' }, component: 'MultiMedia' },
];

export default globalControlMenu;
