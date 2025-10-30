<template>
    <div :class="cardClass" @click="onCardClick">
        <div :class="cardValueClass"></div>
        <div :class="cardHuaseClass"></div>
    </div>
</template>

<script>

export default {
  data: () => ({
  }),
  props: {
    cardType: {
      type: Number, // 1表示玩家手牌，
      default: 1,
    },
    cardValue: {
      type: String,
      default: '1-1',
    },
    cardSelected: {
      type: Boolean,
      default: false,
    },
    cardIndex: {
      type: Number,
      default: 0,
    },
    dragable: {
      type: Boolean,
      default: false,
    },
    dragging: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardClass() {
      const classes = [];
      const base = 'card-item';
      classes.push(base);
      classes.push(this.cardTypeClass);
      classes.push(this.cardSelected ? 'card-selected' : '');
      classes.push(this.dragging ? 'card-drag' : '');
      // console.log("classes",classes)
      return classes;
    },
    cardTypeClass() {
      switch (this.cardType) {
        case 1:
          return 'player';
        default:
          return 'player';
      }
    },
    cardValueClass() {
      return `card-value card-${this.cardValue}`;
    },
    cardHuaseClass() {
      const arr = this.cardValue.split('-');
      if (arr[0] === '5') {
        return '';
      }
      return `card-huase card-huase-${arr[0]}`;
    },
  },
  methods: {
    onCardClick(e) {
      // console.log('click事件')
      this.$emit('click', e);
    },
    onDragStart(e) {
      console.log('touchDown 事件', this.cardIndex);
      if (!this.dragable) { return; }
      if (e.button === 0) {
        this.$emit('dragstart', e, this.cardIndex);
      }
    },
    onDragEnd(e) {
      if (!this.dragable) { return; }
      console.log('touchup事件', e, this.cardIndex);
      this.$emit('dragend', e, this.cardIndex);
    },
    onDragMove(e) {
      if (!this.dragable) { return; }
      console.log('touchmove事件', this.cardIndex);
      this.$emit('dragmove', e, this.cardIndex);
    },
  },

};
</script>
<style scoped lang="less">
.card-item {
    position: relative;
    background-image: url('https://ustatic.joymew.com/%20miao/poker/poker-card.png');
    background-size: 100% 100%;

    cursor: pointer;
    transition: transform 0.3s ease;
    user-select: none;

    &.card-selected {
        transform: translateY(-10vw);
    }

    &.card-drag {
        background: linear-gradient(rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0.3)), url('https://ustatic.joymew.com/%20miao/poker/poker-card.png');
    }

    &.player {
        margin-left: -8vw;
        width: 15vw;
        height: 22vw;

        .card-value {
            position: absolute;
            background-image: url('https://ustatic.hudongmiao.com/joymewScreen/img/playPoker/large_card_num.png');
            background-repeat: no-repeat;
            top: 10px;
            left: 5px;
            width: 42px;
            height: 46px;
            background-size: 546px 138px;

            &.card-1-1 {
                background-position: 0px 0px;
            }

            &.card-2-1 {
                background-position: 0px 0px;
            }

            &.card-3-1 {
                background-position: 0px -92px;
            }

            &.card-4-1 {
                background-position: 0px -92px;
            }

            &.card-1-2 {
                background-position: -42px 0px;
            }

            &.card-2-2 {
                background-position: -42px 0px;
            }

            &.card-3-2 {
                background-position: -42px -92px;
            }

            &.card-4-2 {
                background-position: -42px -92px;
            }

            &.card-1-3 {
                background-position: -84px 0px;
            }

            &.card-2-3 {
                background-position: -84px 0px;
            }

            &.card-3-3 {
                background-position: -84px -92px;
            }

            &.card-4-3 {
                background-position: -84px -92px;
            }

            &.card-1-4 {
                background-position: -126px 0px;
            }

            &.card-2-4 {
                background-position: -126px 0px;
            }

            &.card-3-4 {
                background-position: -126px -92px;
            }

            &.card-4-4 {
                background-position: -126px -92px;
            }

            &.card-1-5 {
                background-position: -168px 0px;
            }

            &.card-2-5 {
                background-position: -168px 0px;
            }

            &.card-3-5 {
                background-position: -168px -92px;
            }

            &.card-4-5 {
                background-position: -168px -92px;
            }

            &.card-1-6 {
                background-position: -210px 0px;
            }

            &.card-2-6 {
                background-position: -210px 0px;
            }

            &.card-3-6 {
                background-position: -210px -92px;
            }

            &.card-4-6 {
                background-position: -210px -92px;
            }

            &.card-1-7 {
                background-position: -252px 0px;
            }

            &.card-2-7 {
                background-position: -252px 0px;
            }

            &.card-3-7 {
                background-position: -252px -92px;
            }

            &.card-4-7 {
                background-position: -252px -92px;
            }

            &.card-1-8 {
                background-position: -294px 0px;
            }

            &.card-2-8 {
                background-position: -294px 0px;
            }

            &.card-3-8 {
                background-position: -294px -92px;
            }

            &.card-4-8 {
                background-position: -294px -92px;
            }

            &.card-1-9 {
                background-position: -336px 0px;
            }

            &.card-2-9 {
                background-position: -336px 0px;
            }

            &.card-3-9 {
                background-position: -336px -92px;
            }

            &.card-4-9 {
                background-position: -336px -92px;
            }

            &.card-1-10 {
                background-position: -378px 0px;
            }

            &.card-2-10 {
                background-position: -378px 0px;
            }

            &.card-3-10 {
                background-position: -378px -92px;
            }

            &.card-4-10 {
                background-position: -378px -92px;
            }

            &.card-1-11 {
                background-position: -420px 0px;
            }

            &.card-2-11 {
                background-position: -420px 0px;
            }

            &.card-3-11 {
                background-position: -420px -92px;
            }

            &.card-4-11 {
                background-position: -420px -92px;
            }

            &.card-1-12 {
                background-position: -462px 0;
            }

            &.card-2-12 {
                background-position: -462px 0;
            }

            &.card-3-12 {
                background-position: -462px -92px;
            }

            &.card-4-12 {
                background-position: -462px -92px;
            }

            &.card-1-13 {
                background-position: -504px 0px;
            }

            &.card-2-13 {
                background-position: -504px 0px;
            }

            &.card-3-13 {
                background-position: -504px -92px;
            }

            &.card-4-13 {
                background-position: -504px -92px;
            }

            &.card-5-1 {
                background-image: url('https://ustatic.hudongmiao.com/joymewScreen/img/playPoker/large_card_king_num.png');
                top: 10px;
                left: 10px;
                background-size: 22px 77px;
                width: 11px;
                height: 77px;
                background-position: 0 0;
            }

            &.card-5-2 {
                background-image: url('https://ustatic.hudongmiao.com/joymewScreen/img/playPoker/large_card_king_num.png');
                top: 10px;
                left: 10px;
                background-size: 22px 77px;
                width: 11px;
                height: 77px;
                background-position: -11px 0;
            }
        }

        .card-huase {
            position: absolute;
            background-image: url('https://ustatic.hudongmiao.com/joymewScreen/img/playPoker/large_card_huase.png');
            background-repeat: no-repeat;
            top: 70px;
            left: 10px;
            width: 30px;
            height: 20px;
            background-size: 150px 20px;

            &.card-huase-1 {
                background-position: -30px 0;
            }

            &.card-huase-2 {
                background-position: -90px 0;
            }

            &.card-huase-3 {
                background-position: 0px 0;
            }

            &.card-huase-4 {
                background-position: -60px 0;
            }
        }
    }
}
</style>
