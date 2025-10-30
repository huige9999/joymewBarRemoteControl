import store from '@/store/index';
import request from '@/utils/request';

export function editMusicStatus({
  sort,
  heartWallId,
  heart_wall_id: heartWallIdSnake,
}) {
  const targetHeartWallId = heartWallId || heartWallIdSnake;
  return request.post('hmGiftController/editMusicStatus', {
    splid: store.state.liveId,
    heartWallId: targetHeartWallId,
    sort,
  });
}

export function getMusicList() {
  return request.post('hmGiftController/getMusicList', {
    splid: store.state.liveId,
  });
}
