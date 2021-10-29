import React, { useEffect, useState } from 'react';
import isLength from 'validator/lib/isLength';
import { nanoid } from 'nanoid';
import Emoji from './emoji';
import { USER_COMMENT_INFO_KEY } from './constant';
import axios from '@blog/client/web/utils/axios';
import { gernateAvatarImage } from '@blog/client/common/helper.util';
import { Alert, Tooltip, Input, Button } from 'antd';
import style from './style.module.scss';

interface Props {
    url: string;
    replyId?: string;
    articleId?: string;
}

export const CommentForm = (props: Props) => {
    const [userInfo, setUserInfo] = useState<{ nickName: string; email: string }>({
        nickName: '',
        email: '',
    });
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const onEmojiInput = (text: string) => {
        setContent((val) => {
            return val + text;
        });
    };
    useEffect(() => {
        const info = localStorage.getItem(USER_COMMENT_INFO_KEY);
        if (info) {
            const data: any = JSON.parse(info);
            setUserInfo(data);
        } else {
            const nickName = nanoid(6);
            const data = {
                nickName,
                email: 'visitor@lizc.email',
            };
            localStorage.setItem(USER_COMMENT_INFO_KEY, JSON.stringify(data));
            setUserInfo(data);
        }
    }, [1]);

    const submit = (): any => {
        const data: any = {
            nickName: userInfo.nickName,
            email: userInfo.email,
            article: props.articleId,
            content,
        };
        if (props.replyId) {
            Object.assign(data, {
                reply: props.replyId,
            });
        }
        if (!isLength(data.content, { min: 1 })) {
            return setErrorMessage('最少输入6个字符！');
        } else if (!isLength(data.content, { max: 490 })) {
            return setErrorMessage('最多只能输入490个字符！');
        }
        setButtonLoading(true);
        axios
            .post(props.url, data)
            .then(() => {
                location.reload();
            })
            .catch(() => {
                setErrorMessage('服务器开小差去了，请尝试刷新页面，再进行提交！');
            });
    };
    return (
        <div>
            <Alert
                message={
                    <div>
                        当前评论模式：游客模式，系统将自动生成相关数据信息。
                        <Tooltip
                            placement="topLeft"
                            title="发布评论时，请遵守您所在国家和中华人民共和国的法律法规，禁止发布政治相关内容；评论内容应该和所在页面的内容相关，禁止一切无意义和严重跑题的内容；请尊重他人，友好评论，请像和他人面对面谈话时一样保持对他人的尊重；禁止发布商业广告。"
                        >
                            <a>详情。</a>
                        </Tooltip>
                    </div>
                }
                type="warning"
                showIcon
            />
            <div className={style.userInfo}>
                <span className={style.userInfoText}>游客账户：</span>
                <img
                    className={style.userInfoAvatar}
                    title={userInfo.nickName}
                    src={gernateAvatarImage(userInfo.nickName) || ''}
                />
                <span className={style.userInfoText}>{userInfo.nickName}</span>
            </div>
            <div>
                {errorMessage && <Alert message={errorMessage} type="warning" showIcon />}
                <Input.TextArea
                    value={content}
                    placeholder="留点空白给你说~"
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    onChange={(event) => {
                        setContent(event.target.value);
                    }}
                />
                <Emoji
                    onInput={(text) => {
                        onEmojiInput(text);
                    }}
                ></Emoji>
                <div className={style.commentFormFooter}>
                    <Button loading={buttonLoading} size="small" type="primary" onClick={() => submit()}>
                        提 交
                    </Button>
                </div>
            </div>
        </div>
    );
};
