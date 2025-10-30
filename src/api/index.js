import store from '@/store/index';
import request from '@/utils/request';

export function editMusicStatus({
  sort,
  heart_wall_id,
}) {
  return request.post('hmGiftController/editMusicStatus', {
    splid: store.state.liveId,
    heart_wall_id,
    sort,
  });
}

export function getMusicList() {
  return request.post('hmGiftController/getMusicList', {
    splid: store.state.liveId,
  });
}
