<template>
    <div id="modal-overlay" v-if="show">
        <div class="modal-data">
            <div class="modal-header">
                <div class="title">{{ modal.title }}</div>
            </div>
            <div class="modal-content">
                <p><span class="tip">提示：</span>{{ modal.text }}</p>
            </div>
            <div class="modal-footer">
                <button class="modal-close" @click.prevent="submit">确定</button>                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['modalOptions'],
        computed: {
            modal() {
                let modal = this.modalOptions;
                modal = {
                    title: modal.title || '提示',
                    text: modal.text,
                };
                return modal;
            },
        },
        data() {
            return {
                show: false, // 是否显示模态框
                resolve: '',
                reject: '',
                promise: '', // 保存promise对象
            };
        },
        methods: {
            submit() {
                this.resolve('submit');
            },
            close(type) {
                this.show = false;
                this.reject(type);
            },
            confirm() {
                this.show = true;
                this.promise = new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
                return this.promise; //返回promise对象,给父级组件调用
            },
        }
    }
</script>