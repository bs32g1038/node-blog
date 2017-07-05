<template>
  <form class="comment-form" ref="form">
    <div class="comment-form__group">
      <label class="comment-form__label">昵称</label>
      <input ref="nickName" placeholder="输入你的昵称" type="text" spellcheck="false" maxlength="20" class="comment-form__input" />
    </div>
    <div class="comment-form__group">
      <label class="comment-form__label">邮箱</label>
      <input ref="email" placeholder="输入你的email" type="text" spellcheck="false" maxlength="50" class="comment-form__input" />
    </div>
    <div class="comment-form__group">
      <textarea ref="content" rows="3" placeholder="留点空白给你说~" spellcheck="false" class="comment-form__textarea"></textarea>
    </div>
    <div class="comment-form__footer">
      <button type="submit" class="comment-form__button" :class="{ 'btn-loading': buttonLoading }" @click.prevent="ok">
        <LoadingSvg v-if="buttonLoading" class="load-loop" style="vertical-align: bottom;fill: #fff;"></LoadingSvg>
        提 交
      </button>
    </div>
  </form>
</template>
<script>
import LoadingSvg from '../svgs/Loading.vue';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
export default {
  components: {
    LoadingSvg,
  },
  props: {
    articleId: {
      type: String
    },
    replyId: {
      type: String
    }
  },
  data() {
    return {
      buttonLoading: false
    }
  },
  methods: {
    flash(el) {
      let count = 1;
      let intervalID = setInterval(function() {
        if (count % 2 == 0) {
          el.style = 'background-color: #ffdab9';
        } else {
          el.style = 'background-color: #fff'
        }
        count++;
        if (count >= 8) {
          clearInterval(intervalID);
        }
      }, 140);
    },
    ok() {
      const elContent = this.$refs.content;
      const elNickName = this.$refs.nickName;
      const elEmail = this.$refs.email;
      if (isEmpty(elNickName.value)) {
        this.flash(elNickName);
        return;
      } else if (isEmpty(elEmail.value) || !isEmail(elEmail.value)) {
        this.flash(elEmail);
        return;
      } else if (isEmpty(elContent.value)) {
        this.flash(elContent);
        return;
      }
      let self = this;
      this.buttonLoading = true;
      let data = {
        nick_name: elNickName.value,
        content: elContent.value,
        email: elEmail.value,
        article_id: this.articleId
      };
      console.log(data)
      if (this.replyId) {
        Object.assign(data, {
          reply_id:this.replyId
        })
      }
      this.$store.dispatch('ADD_COMMENT', data).then(() => {
        this.$Message.info("提交成功！刷新后即可看见评论！", 4);
        this.$emit('input', false);
        this.buttonLoading = false;
        this.$refs.form.reset();
      }).catch((err) => {
        this.buttonLoading = false;
        this.$Message.info("提交数据失败，请重新尝试！")
        console.log(err)
      })
    }
  },
  mounted() {
    console.log(this.article_id)
  }
}
</script>