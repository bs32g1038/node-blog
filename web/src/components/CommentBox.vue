<template>

    <form class="comment-wrap" v-on:submit.prevent="add">
        <textarea placeholder="留点空，让你也说一说..." v-model="content"></textarea>
        <div>
            <div class="form-group">
                <i class="fa fa-user"></i>
                <input placeholder="输入你的昵称" type="text" v-model="nick_name"/>
            </div>
            <div class="form-group">
                <i class="fa  fa-envelope"></i>
                <input placeholder="输入你的email" type="text" v-model="email"/>
            </div>
            <button type="submit" class="float-left">提交</button>
        </div>
    </form>

</template>

<script>
    var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    export default {

        data() {
            return {
                nick_name: "",
                email: "",
                content: "",
            }
        },
        props: ['url', 'post_id', 'reply_id'],
        computed: {
            isValid: function() {
                return this.validation();
            }
        },
        methods: {
            validation: function() {
                var nick_name = this.nick_name.trim() || '';
                var content = this.content.trim() || '';
                if (nick_name.length <= 0) {
                    alert("昵称不能为空！")
                    return false;
                } else if (!emailRE.test(this.email)) {
                    alert("邮箱输入不正确！")
                    return false;
                } else if (content.length <= 0) {
                    alert("内容不能为空！")
                    return false;
                }
                return true;
            },
            add() {
                var self = this;
                console.log(this.isValid)
                if (this.isValid) {
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
                            post_id: this.post_id,
                            reply_id: this.reply_id
                        })
                    }).then(function(response) {
                        return response.json()
                    }).then(function(json) {

                        if (json.success) {
                            self.nick_name = "";
                            self.email = "";
                            self.content = "";
                        }
                        alert(json.error_msg);
                    }).catch(function(ex) {
                        console.log('parsing failed', ex)
                    })
                }
            }
        }
    }
</script>