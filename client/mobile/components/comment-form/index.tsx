import React, { useEffect, useState } from 'react';
import isLength from 'validator/lib/isLength';
import Emoji from './emoji';
import axios from '@blog/client/web/utils/axios';
import { Button, Space, Avatar, Toast, TextArea } from 'antd-mobile';
import style from './style.module.scss';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { GithubIcon } from '@blog/client/web/icons';
import Cookies from 'js-cookie';
import LoginModal from '../login-modal';
import { useStore } from '../login-modal/zustand';
import { useStore as userArticleStore } from '../article/zustand';
import { Popup } from 'antd-mobile';

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
    const [visible1, setVisible1] = useState(false);
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
                articleStore.updateCommentListTag();
                setContent('');
                setButtonLoading(false);
            })
            .catch(() => {
                return Toast.show({
                    content: '服务器开小差去了，请尝试刷新页面，再进行提交。',
                });
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
                        {!props.replyId && <Avatar style={{ '--size': '40px' }} src={userInfo?.avatar} />}
                        <div className={style.commentForm}>
                            <TextArea
                                className={style.input}
                                value={content}
                                placeholder={props.placeholder || '留点空白给你说~'}
                                autoSize={{ minRows: 1, maxRows: 3 }}
                                onChange={(event: any) => {
                                    setContent(event.target.value);
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
                                            color="primary"
                                            size="small"
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
                    </div>
                </div>
            ) : (
                <div className={style.loginComment}>
                    <div className={style.loginCommentLeft}>
                        <Avatar className={style.loginAvatar} style={{ '--size': '40px' }} src=""></Avatar>
                    </div>
                    <div className={style.loginCommentRight}>
                        <Space>
                            发表评论请
                            <Button
                                size="small"
                                color="primary"
                                className={style.btn}
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
                                size="small"
                                color="primary"
                                className={style.btn}
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
            <LoginModal></LoginModal>
        </div>
    );
};
