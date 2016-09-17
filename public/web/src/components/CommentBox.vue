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

    export default{

        data () {
            return {
                nick_name: "",
                email: "",
                content: "",
            }
        },
        props: ['url', 'post_id', 'reply_id'],
        computed: {
            validation: function () {
                return {
                    name: !!this.nick_name.trim(),
                    email: emailRE.test(this.email),
                    content: !!this.content.trim()
                }
            },
            isValid: function () {
                var validation = this.validation
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
            }
        },
        methods: {
            add(){

                var self = this;

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
                    }).then(function (response) {
                        return response.json()
                    }).then(function (json) {

                        if (json.success) {
                            self.nick_name = "";
                            self.email = "";
                            self.content = "";
                        }

                        alert(json.msg);

                    }).catch(function (ex) {
                        console.log('parsing failed', ex)
                    })
                }
            }
        }
    }

</script>