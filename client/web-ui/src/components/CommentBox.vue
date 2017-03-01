<template>
    <div>
        <form class="comment-wrap" v-on:submit.prevent="add">
            <textarea placeholder="留点空，让你也说一说..." v-model="content"></textarea>
            <div>
                <div class="form-group">
                    <i class="fa fa-user"></i>
                    <input placeholder="输入你的昵称" type="text" v-model="nick_name" />
                </div>
                <div class="form-group">
                    <i class="fa  fa-envelope"></i>
                    <input placeholder="输入你的email" type="text" v-model="email" />
                </div>
                <button type="submit" class="float-left">提交</button>
            </div>
        </form>
        <ModalInfoDialog ref="infoDialog" :modal-options.sync="modal"></ModalInfoDialog>
    </div>
</template>

<script>
    var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    import ModalInfoDialog from './ModalInfoDialog.vue'

    export default {
        props: ['url', 'article_id', 'reply_id'],
        components: {
            ModalInfoDialog
        },
        data() {
            return {
                nick_name: "",
                email: "",
                content: "",
                modal: {
                    title: '博客',
                    text: ''
                }
            }
        },
        methods: {
            showInfoDialog: function(text) {
                this.modal.text = text;
                this.$refs.infoDialog.confirm().then(() => {
                    this.$refs.infoDialog.show = false;
                }).catch(() => {});
            },
            validate: function() {

                var nick_name = this.nick_name.trim() || '';
                var content = this.content.trim() || '';

                if (nick_name.length <= 0) {
                    this.showInfoDialog('昵称不能为空！');
                    return false;
                } else if (!emailRE.test(this.email)) {
                    this.showInfoDialog('邮箱输入不正确！');
                    return false;
                } else if (content.length <= 0) {
                    this.showInfoDialog('内容不能为空！');
                    return false;
                }
                return true;
            },
            add() {
                var self = this;

                if (this.validate()) {
                    fetch(this.url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nick_name: this.nick_name,
                            email: this.email,
                            content: this.content,
                            article_id: this.article_id,
                            reply_id: this.reply_id
                        })
                    }).then(function(response) {
                        return response.json()
                    }).then(function(json) {
                        if (json.success) {
                            self.nick_name = "";
                            self.email = "";
                            self.content = "";
                            self.showInfoDialog("提交成功，审核通过后将会显示到页面！感谢你的来访！");
                        } else {
                            self.showInfoDialog(json.error_msg);
                        }
                    }).catch(function(ex) {
                        console.log('parsing failed', ex)
                    })
                }
            }
        }
    }
</script>