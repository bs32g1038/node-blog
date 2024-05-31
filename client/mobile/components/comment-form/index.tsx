import React, { useEffect, useState } from 'react';
import isLength from 'validator/lib/isLength';
import { nanoid } from 'nanoid';
import Emoji from './emoji';
import { USER_COMMENT_INFO_KEY } from './constant';
import axios from '@blog/client/web/utils/axios';
import { TextArea, Button, Popover, Toast, Popup } from 'antd-mobile';
import style from './style.module.scss';
import Avatar from 'boring-avatars';
import { SmileOutlined } from '@ant-design/icons';

interface Props {
    url: string;
    parentId?: string;
    replyId?: string;
    articleId?: string;
    placeholder?: string;
}

export const CommentForm = (props: Props) => {
    const [userInfo, setUserInfo] = useState<{ nickName: string; email: string }>({
        nickName: '',
        email: '',
    });
    const [visible1, setVisible1] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [content, setContent] = useState('');
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
    }, []);

    const submit = () => {
        const data = {
            nickName: userInfo.nickName,
            email: userInfo.email,
            article: props.articleId,
            content,
        };
        if (props.parentId) {
            Object.assign(data, {
                parentId: props.parentId,
            });
        }
        if (props.replyId) {
            Object.assign(data, {
                reply: props.replyId,
            });
        }
        if (!isLength(data.content, { min: 1 })) {
            return Toast.show({
                content: '最少输入6个字符',
            });
        } else if (!isLength(data.content, { max: 490 })) {
            return Toast.show({
                content: '最多只能输入490个字符',
            });
        }
        setButtonLoading(true);
        axios
            .post(props.url, data)
            .then(() => {
                location.reload();
            })
            .catch(() => {
                return Toast.show({
                    content: '服务器开小差去了，请尝试刷新页面，再进行提交。',
                });
            });
    };
    return (
        <div>
            {!props.replyId && (
                <div>
                    <span className={style.userInfoText}>
                        当前评论模式：游客模式，系统将自动生成相关数据信息。
                        <Button
                            fill="none"
                            size="small"
                            onClick={() =>
                                Toast.show({
                                    content:
                                        '发布评论时，请遵守您所在国家和中华人民共和国的法律法规，禁止发布政治相关内容；评论内容应该和所在页面的内容相关，禁止一切无意义和严重跑题的内容；请尊重他人，友好评论，请像和他人面对面谈话时一样保持对他人的尊重；禁止发布商业广告。',
                                })
                            }
                        >
                            《内容规范》
                        </Button>
                    </span>
                    <span className={style.userInfoText}>你的账号名为：</span>
                    <span className={style.userInfoText} style={{ color: '#f86422' }}>
                        {userInfo.nickName}
                    </span>
                </div>
            )}
            <div
                className={style.userInfo}
                onFocus={() => {
                    setIsFocus(true);
                }}
            >
                {!props.replyId && <Avatar size={40} name={userInfo.nickName} square variant="beam" />}
                <div className={style.commentForm}>
                    <TextArea
                        className={style.input}
                        value={content}
                        placeholder={props.placeholder || '留点空白给你说~'}
                        autoSize={{ minRows: 1, maxRows: 3 }}
                        onChange={(val) => {
                            setContent(val);
                        }}
                    />
                    {isFocus && (
                        <>
                            <div className={style.line}></div>
                            <div className={style.commentFormFooter}>
                                <Button
                                    fill="none"
                                    style={{ padding: 0, height: 'auto' }}
                                    onClick={() => {
                                        setVisible1(true);
                                    }}
                                >
                                    <SmileOutlined style={{ fontSize: 24, color: 'rgb(132, 145, 165)' }} />
                                </Button>
                                <Button
                                    size="small"
                                    color="primary"
                                    className={style.submitBtn}
                                    loading={buttonLoading}
                                    onClick={() => submit()}
                                >
                                    发 布
                                </Button>
                            </div>
                        </>
                    )}
                </div>
                <Popup
                    visible={visible1}
                    onMaskClick={() => {
                        setVisible1(false);
                    }}
                    onClose={() => {
                        setVisible1(false);
                    }}
                    bodyStyle={{ height: '30vh' }}
                >
                    <Emoji
                        onInput={(text) => {
                            onEmojiInput(text);
                        }}
                    ></Emoji>
                </Popup>
            </div>
        </div>
    );
};
