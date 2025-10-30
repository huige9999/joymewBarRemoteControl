<template>
  <div class="music-lib-play">
    <!-- 音乐列表 -->
    <div class="music-list-wrapper">
      <div
        v-for="(song, index) in songs"
        :key="song.id"
        class="music-item"
        :class="{ active: currentSongIndex === index }"
        @click="playSong(index)"
      >
        <span class="song-name">{{ song.name }}</span>
        <div
          class="play-pause-btn"
          @click.stop="playPauseItem(index)"
        >
          <i :class="getIconClassForItem(index)"></i>
        </div>
      </div>
    </div>

    <!-- 控制按钮区域 -->
    <div class="control-area">
      <div class="main-controls">
        <button class="control-btn" @click="playPrev">上一首</button>
        <button class="control-btn play-pause-main" @click="togglePlayPause">
          <i :class="playPauseIconClass"></i>
        </button>
        <button class="control-btn" @click="playNext">下一首</button>
      </div>
      <div class="volume-controls">
        <button class="control-btn" @click="increaseVolume">音量增</button>
        <button class="control-btn" @click="decreaseVolume">音量减</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicLibPlay',
  data() {
    return {
      // 模拟音乐列表数据
      // songs: [
      //   { id: 1, name: '音乐1 - 晴天' },
      //   { id: 2, name: '音乐2 - 七里香' },
      //   { id: 3, name: '音乐3 - 夜曲' },
      //   { id: 4, name: '音乐4 - 稻香' },
      //   { id: 5, name: '音乐5 - 青花瓷' },
      //   { id: 6, name: '音乐6 - 告白气球' },
      //   { id: 7, name: '音乐7 - 等你下课' },
      //   { id: 8, name: '音乐8 - 最伟大的作品' },
      //   { id: 9, name: '音乐9 - 红尘客栈' },
      //   { id: 10, name: '音乐10 - 不能说的秘密' },
      //   { id: 11, name: '音乐11 - 彩虹' },
      //   { id: 12, name: '音乐12 - 说好的幸福呢' },
      //   { id: 13, name: '音乐13 - 退后' },
      //   { id: 14, name: '音乐14 - 黑色毛衣' },
      //   { id: 15, name: '音乐15 - 轨迹' },
      // ],
      currentSongIndex: null, // 当前播放歌曲的索引
      isPlaying: false, // 全局播放状态
      volume: 10, // 音量 (0-20)
    };
  },
  computed: {
    // 主控制区播放/暂停按钮的图标class
    playPauseIconClass() {
      // 遵循图片提示: <div class="iconfont bofang或者zanting"/>
      return this.isPlaying ? 'iconfont icon-zanting' : 'iconfont icon-bofang';
    },
    songs() {
      // 从store中获取音乐播放器数据
      return this.$store.state.musicPlayerData ? this.$store.state.musicPlayerData.map((item) => ({
        id: item.musicId,
        name: item.name,
      })) : [];
    },
  },
  methods: {
    // 点击列表项播放歌曲
    playSong(index) {
      this.currentSongIndex = index;
      this.isPlaying = true;
      this.sendInstruction('playMusic', this.songs[index].id);
    },
    // 点击列表项中的播放/暂停按钮
    playPauseItem(index) {
      if (this.currentSongIndex === index) {
        // 如果点击的是当前播放的歌曲，则切换播放/暂停状态
        this.isPlaying = !this.isPlaying;
        // Send instruction based on the new state
        this.sendInstruction('playMusic', this.isPlaying ? this.songs[index].id : '');
      } else {
        // 如果点击的是其他歌曲，则切换到该歌曲并播放
        this.currentSongIndex = index;
        this.isPlaying = true;
        this.sendInstruction('playMusic', this.songs[index].id);
      }
    },
    // 主控制区切换播放/暂停
    togglePlayPause() {
      if (this.currentSongIndex === null && this.songs.length > 0) {
        // 如果从未播放过，默认播放第一首
        this.currentSongIndex = 0;
        this.isPlaying = true;
        this.sendInstruction('playMusic', this.songs[0].id);
      } else if (this.currentSongIndex !== null) {
        this.isPlaying = !this.isPlaying;
        // Send instruction based on the new state
        this.sendInstruction('playMusic', this.isPlaying ? this.songs[this.currentSongIndex].id : '');
      }
    },
    // 播放下一首
    playNext() {
      if (this.songs.length === 0) return;
      if (this.currentSongIndex === null) {
        this.currentSongIndex = 0;
      } else {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
      }
      this.isPlaying = true;
      this.sendInstruction('songControl', 'next');
    },
    // 播放上一首
    playPrev() {
      if (this.songs.length === 0) return;
      if (this.currentSongIndex === null) {
        this.currentSongIndex = 0;
      } else {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
      }
      this.isPlaying = true;
      this.sendInstruction('songControl', 'prev');
    },
    // 增加音量
    increaseVolume() {
      this.volume = Math.min(20, this.volume + 1); // 音量范围 0-20，每次增加1
      // 可在此处添加实际的音量控制逻辑
      // console.log('Current Volume:', this.volume);
      this.sendInstruction('volume', 'add');
    },
    // 减少音量
    decreaseVolume() {
      this.volume = Math.max(0, this.volume - 1); // 音量范围 0-20，每次减少1
      // 可在此处添加实际的音量控制逻辑
      // console.log('Current Volume:', this.volume);
      this.sendInstruction('volume', 'sub');
    },
    // 获取列表项中按钮的图标class
    getIconClassForItem(index) {
      if (this.currentSongIndex === index && this.isPlaying) {
        return 'iconfont icon-zanting';
      }
      return 'iconfont icon-bofang';
    },
    async sendInstruction(action, param) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0, // 持续显示
      });
      await this.$store.dispatch('instructions/sendInstruction', {
        type: 'game_control',
        action,
        param,
      });
      this.$toast.clear();
    },
  },
};
</script>

<style lang="less" scoped>
.music-lib-play {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  padding: 20px 15px;
  box-sizing: border-box;
  color: #333;
}

// 音乐列表
.music-list-wrapper {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 8px 0;
  // 滚动条样式优化
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #ccc;
  }
}

.music-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
  transition: background-color 0.2s;
  font-size: 35px;
  line-height: 50px;
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f8f8;
  }

  &.active {
    color: #c21f30; // 选中时的颜色
    font-weight: 500;
  }

  .song-name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 15px;
  }

  .play-pause-btn {

    .iconfont {
      margin-right: 3px;
      font-size: 45px;
    }
  }
}

// 控制区域
.control-area {
  flex-shrink: 0;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 12px;
}

.main-controls,
.volume-controls {
  display: flex;
  align-items: center;
}

.main-controls {
  justify-content: space-around;
}

.volume-controls {
  justify-content: center;
  margin-top: 10px;
  gap: 25px; // 按钮间距
}

.control-btn {
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 10px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.2s;
  font-size: 35px;
  &:hover {
    background-color: #f0f0f0;
  }

  &.play-pause-main {
    font-size: 16px;
    font-weight: 500;

    .iconfont {
      font-size: 52px;
    }
  }
}
</style>
