<template>
    <li class="ds-post-main">
        <div class="ds-comment-body">
            <div class="top">
                <span><i class="fa fa-user title"></i>&nbsp;{{ item.nick_name }}</span>
                <span class="float-right">{{ parseTime(item.create_at,"y年m月d日 h:i") }}</span>
            </div>

            <p class="content">{{ item.content }}</p>
            
            <p><span class="text-blue">Reply：</span>{{ item.reply_content }}</p>
        </div>
    </li>
</template>


<script>
    export default {
        name: 'guestbooks-item',
        props: ['item']
    }
</script>