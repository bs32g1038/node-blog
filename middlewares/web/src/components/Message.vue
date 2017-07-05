<template>
  <div class="message">
    <transition name="move-up">
      <div class="message-notice" v-show="visible">
        <div class="message-notice-content">
          <div class="message-custom-content message-info">
            <InfoSvg style="vertical-align: middle"></InfoSvg>
            <span> {{ content }} </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import InfoSvg from '../svgs/Info.vue'
  let defaultDuration = 1.5;
  export default{
    components: {
      InfoSvg
    },
    props: {
      duration: {
        type: Number,
        default: 1.5
      },
      onClose: {
        type: Function,
        default: function () {

        }
      }
    },
    data(){
      return {
        content: '',
        visible: false
      }
    },
    methods: {
      info(content, duration = defaultDuration, onClose){
        this.content = content;
        this.visible = true;
        this.duration = duration;
        this.show();
      },
      clearCloseTimer () {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer);
          this.closeTimer = null;
        }
      },
      close () {
        this.clearCloseTimer();
        this.onClose();
      },
      show(){
        this.clearCloseTimer();
        if (this.duration !== 0) {
          this.closeTimer = setTimeout(() => {
            this.visible = false;
            this.close();
          }, this.duration * 1000);
        }
      }
    },
    beforeDestroy () {
      this.clearCloseTimer();
    }
  }

</script>

<style lang="scss" scoped>
  .message {
    font-size: 12px;
    position: fixed;
    z-index: 1010;
    width: 100%;
    top: 16px;
    left: 0;
  }
  .message-notice {
    width: auto;
    vertical-align: middle;
    position: absolute;
    left: 50%;
  }
  .message-notice-content {
    position: relative;
    right: 50%;
    padding: 8px 16px;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    background: #fff;
    display: block;
  }
</style>
