import React, { useEffect, useState } from 'react';
import isLength from 'validator/lib/isLength';
import Emoji from './emoji';
import axios from '@blog/client/web/utils/axios';
import { Tooltip, Input, Button, Popover, message, Space, Avatar } from 'antd';
import style from './style.module.scss';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { GithubIcon } from '../../icons';
import Cookies from 'js-cookie';
import LoginModal from '../login-modal';
import { useStore } from '../login-modal/zustand';
import { useStore as userArticleStore } from '../article/zustand';

interface Props {
    url: string;
    parentId?: string;
    replyId?: string;
    articleId?: string;
    placeholder?: string;
}

export const CommentForm = (props: Props) => {
    const [userInfo, setUserInfo] = useState<{ username: string; avatar: string } | null>();
    const [isFocus, setIsFocus] = useState(false);
    const [content, setContent] = useState('');
    const { showLoginModal } = useStore();
    const articleStore = userArticleStore();
    const [buttonLoading, setButtonLoading] = useState(false);
    const onEmojiInput = (text: string) => {
        setContent((val) => {
            return val + text;
        });
    };
    useEffect(() => {
        const user = Cookies.get('user');
        if (user) {
            setUserInfo(JSON.parse(user));
        }
    }, []);

    const submit = () => {
        const data = {
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
            return message.warning('最少输入6个字符！');
        } else if (!isLength(data.content, { max: 490 })) {
            return message.warning('最多只能输入490个字符！');
        }
        setButtonLoading(true);
        axios
            .post(props.url, data)
            .then(() => {
                articleStore.updateCommentListTag();
                setContent('');
                setButtonLoading(false);
            })
            .catch(() => {
                message.error('服务器开小差去了，请尝试刷新页面，再进行提交！');
            });
    };
    return (
        <div>
            {userInfo ? (
                <div>
                    <div>
                        {!props.replyId && (
                            <div>
                                <span className={style.userInfoText}>
                                    <Tooltip
                                        placement="topLeft"
                                        title="发布评论时，请遵守您所在国家和中华人民共和国的法律法规，禁止发布政治相关内容；评论内容应该和所在页面的内容相关，禁止一切无意义和严重跑题的内容；请尊重他人，友好评论，请像和他人面对面谈话时一样保持对他人的尊重；禁止发布商业广告。"
                                    >
                                        《内容规范》
                                    </Tooltip>
                                </span>
                                <span className={style.userInfoText}>你的账号名为：</span>
                                <span className={style.userInfoText} style={{ color: '#f86422' }}>
                                    {userInfo?.username ?? '-'}
                                </span>
                            </div>
                        )}
                    </div>
                    <div
                        className={style.userInfo}
                        onFocus={() => {
                            setIsFocus(true);
                        }}
                    >
                        {!props.replyId && <Avatar size={40} src={userInfo?.avatar} />}
                        <div className={style.commentForm}>
                            <Input.TextArea
                                className={style.input}
                                value={content}
                                placeholder={props.placeholder || '留点空白给你说~'}
                                autoSize={{ minRows: 1, maxRows: 3 }}
                                onChange={(event) => {
                                    setContent(event.target.value);
                                }}
                            />
                            {isFocus && (
                                <>
                                    <div className={style.line}></div>
                                    <div className={style.commentFormFooter}>
                                        <Popover
                                            placement="bottomRight"
                                            content={
                                                <div>
                                                    <Emoji
                                                        onInput={(text) => {
                                                            onEmojiInput(text);
                                                        }}
                                                    ></Emoji>
                                                </div>
                                            }
                                            trigger="click"
                                        >
                                            <Button type="text" style={{ padding: 0, height: 'auto' }}>
                                                <SmileOutlined style={{ fontSize: 24, color: 'rgb(132, 145, 165)' }} />
                                            </Button>
                                        </Popover>
                                        <Button
                                            className={style.submitBtn}
                                            loading={buttonLoading}
                                            type="primary"
                                            onClick={() => submit()}
                                        >
                                            发 布
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.loginComment}>
                    <div className={style.loginCommentLeft}>
                        <Avatar className={style.loginAvatar} size={40} icon={<UserOutlined />}></Avatar>
                    </div>
                    <div className={style.loginCommentRight}>
                        <Space>
                            发表评论请
                            <Button
                                type="primary"
                                className={style.btn}
                                ghost
                                onClick={() => {
                                    window.open('/api/user/authorize/github?href=' + window.location.href, '_blank');
                                }}
                            >
                                <div className={style.btnContent}>
                                    <GithubIcon
                                        name="github"
                                        width="16px"
                                        height="16px"
                                        className={style.githubIcon}
                                    ></GithubIcon>
                                    <span>Github 登录</span>
                                </div>
                            </Button>
                            <Button
                                type="primary"
                                className={style.btn}
                                ghost
                                onClick={() => {
                                    showLoginModal(true);
                                }}
                            >
                                <div className={style.btnContent}>
                                    <UserOutlined />
                                    <span>账号登录</span>
                                </div>
                            </Button>
                        </Space>
                    </div>
                </div>
            )}
            <LoginModal></LoginModal>
        </div>
    );
};
