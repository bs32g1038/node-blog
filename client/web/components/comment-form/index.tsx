import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isURL from 'validator/lib/isURL';
import axios from '../../utils/axios';
import { media } from '../../utils/helper';
import marked from '../../../libs/marked';
import { Avatar, Text, Textarea, Flex, Heading, Alert, AlertIcon, Button } from '@chakra-ui/core';
import md5 from 'crypto-js/md5';
import GHAT from '../../../libs/generate-avatar';
const ghat = new GHAT();
import { useToast, Box } from '@chakra-ui/core';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
    border-bottom: 1px solid #f90000
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const CommentFormWrap = styled.form`
    display: flex;
    flex-direction: column;
`;

const ContentWrap = styled.div`
    /* display: flex; */
`;

const PreviewPane = styled.div`
    width: 100%;
    min-width: 200px;
    min-height: 90px;
    border: none;
    box-sizing: border-box;
    border-bottom: 1px dashed #dedede;
    overflow: auto;
    padding: 10px;
    img {
        max-width: 30px;
        vertical-align: text-bottom;
        display: inline-block;
    }
`;

const Footer = styled.div`
    transition: all 0.4s ease-in;
    /* background-color: #d5d5d5; */
    flex: 1 0 auto;
    margin-top: 6px;
`;

const ButtonSubmitWrap = styled.div`
    line-height: 32px;
    height: 32px;
    color: #999;
    font-size: 12px;
    margin-left: 6px;
    ${media.phone`
        span {
            display: block;
        }
    `}
`;

const ButtonGroup = styled.div`
    float: right;
`;

const ButtonSubmit = styled.button`
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    padding: 0 12px;
    text-align: center;
    border: none;
    background-color: #6190e8;
    line-height: 32px;
    height: 32px;
`;

const PreviewButton = styled.button`
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    padding: 0 12px;
    line-height: 32px;
    height: 32px;
    text-align: center;
    border: none;
    background-color: #19be6b;
    margin-right: 10px;
    &:focus {
        outline: none;
    }
`;

const ErrorTipDiv = styled.p`
    color: #721c24;
    text-align: center;
    margin: 0 0 10px 0;
    background-color: #f8d7da;
    padding: 8px 0;
    border-radius: 4px;
    border: 1px solid #f5c6cb;
`;

const EmotionWrap = styled.div`
    position: relative;
`;

const EmoticonList = styled.ul`
    user-select: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px dashed #dedede;
    font-size: 0;
`;

const EmoticonLi = styled.li`
    list-style-type: none;
    padding: 5px 8px;
    border-radius: 5px;
    display: inline-block;
    font-size: 12px;
    line-height: 14px;
    cursor: pointer;
    > img {
        display: block;
        margin: 0;
        max-width: 30px;
    }
`;

const USER_COMMENT_INFO = 'user-comment-info';

interface Props {
    url: string;
    replyId?: string;
    articleId?: string;
}

export const CommentForm = (props: Props) => {
    const toast = useToast();
    const [isShowEmotion, setIsShowEmotion] = useState(false);
    const [content, setContent] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const $form = useRef(null);
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const renderMakrdown = () => {
        setPreviewHtml(marked(content));
    };
    const showPreview = () => {
        setIsShowPreview(!isShowPreview);
    };
    const insertEmotion = (event: any) => {
        if (event.target.nodeName.toLowerCase() === 'img') {
            const $li = event.target.parentNode;
            const text = $li.getAttribute('data-input').trim();
            setContent(val => val + text);
            renderMakrdown();
        }
    };
    useEffect(() => {
        const info = localStorage.getItem(USER_COMMENT_INFO);
        if (info) {
            // const $nickName: any = document.getElementById('nickName');
            // const $email: any = document.getElementById('email');
            // const $website: any = document.getElementById('website');
            // const data: any = JSON.parse(info);
            // $nickName.value = data.nickName;
            // $email.value = data.email;
            // $website.value = data.website;
        }
    }, [1]);

    const submit = (): any => {
        const data: any = {
            article: props.articleId,
            content,
        };
        if (props.replyId) {
            Object.assign(data, {
                reply: props.replyId,
            });
        }
        setButtonLoading(true);
        axios
            .post(props.url, data)
            .then(() => {
                location.reload();
            })
            .catch(err => {
                const res = err.response;
                if (res.status === 422) {
                } else if (res.status === 429) {
                    setButtonLoading(false);
                } else {
                    setButtonLoading(false);
                }
                toast({
                    position: 'top',
                    title: '提交评论失败！',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                    render: () => (
                        // <Alert
                        //     fontWeight="medium"
                        //     status="error"
                        //     fontSize={12}
                        //     color="white"
                        //     mt={4}
                        //     px={4}
                        //     py={2}
                        //     borderRadius="md"
                        //     variant="solid"
                        // >
                        //     <AlertIcon size="12px" />
                        //     提交失败！
                        // </Alert>
                        <Box
                            backgroundColor="rgba(255, 255, 255, 0.9);"
                            fontWeight="medium"
                            border="1px solid #dcdcdc"
                            borderTop="2px solid #f86422"
                            fontSize={14}
                            box-shadow="0 4px 12px rgba(0, 0, 0, 0.15);"
                            color="#454545;"
                            mt={4}
                            px={5}
                            py={2}
                            borderRadius="md"
                        >
                            提交失败！
                        </Box>
                    ),
                });
            });
    };
    return (
        <CommentFormWrap ref={$form}>
            <Alert
                status="info"
                color="theme.primaryText"
                variant="subtle"
                fontSize={13}
                mb={3}
                backgroundColor="theme.blackground"
            >
                <AlertIcon size="12px" />
                当前评论模式：游客模式，系统将自动生成相关数据信息
            </Alert>
            <Flex pb={3} alignItems="center" color="theme.primaryText">
                <Text fontSize={13} mr={1}>
                    游客账户：
                </Text>
                <Avatar
                    borderRadius="md"
                    size="xs"
                    name="Dan Abrahmov"
                    backgroundColor="theme.blackground"
                    src={ghat.getImage(md5('lc_youke_003412').toString()) || ''}
                />
                <Text fontSize={13} ml={2}>
                    lc_youke_003412
                </Text>
            </Flex>
            <Box color="theme.primaryText">
                <Textarea
                    bg="theme.blackground"
                    color="theme.primaryText"
                    focusBorderColor="none"
                    fontSize={14}
                    name="content"
                    borderRadius={0}
                    placeholder="留点空白给你说~"
                    resize="none"
                    value={content}
                    onChange={event => {
                        setContent(event.target.value);
                        setPreviewHtml(marked(event.target.value));
                    }}
                ></Textarea>
                {isShowPreview && <PreviewPane dangerouslySetInnerHTML={{ __html: previewHtml }}></PreviewPane>}
                <Footer>
                    {isShowEmotion && (
                        <EmotionWrap>
                            <EmoticonList onClick={e => insertEmotion(e)}>
                                <EmoticonLi title="呵呵" data-input="@(呵呵)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="呵呵"
                                        src="/static/images/emotion/呵呵.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="哈哈" data-input="@(哈哈)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="哈哈"
                                        src="/static/images/emotion/哈哈.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="吐舌" data-input="@(吐舌)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="吐舌"
                                        src="/static/images/emotion/吐舌.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="太开心" data-input="@(太开心)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="太开心"
                                        src="/static/images/emotion/太开心.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="笑眼" data-input="@(笑眼)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="笑眼"
                                        src="/static/images/emotion/笑眼.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="花心" data-input="@(花心)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="花心"
                                        src="/static/images/emotion/花心.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="小乖" data-input="@(小乖)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="小乖"
                                        src="/static/images/emotion/小乖.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="乖" data-input="@(乖)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="乖"
                                        src="/static/images/emotion/乖.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="捂嘴笑" data-input="@(捂嘴笑)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="捂嘴笑"
                                        src="/static/images/emotion/捂嘴笑.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="滑稽" data-input="@(滑稽)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="滑稽"
                                        src="/static/images/emotion/滑稽.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="你懂的" data-input="@(你懂的)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="你懂的"
                                        src="/static/images/emotion/你懂的.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="不高兴" data-input="@(不高兴)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="不高兴"
                                        src="/static/images/emotion/不高兴.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="怒" data-input="@(怒)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="怒"
                                        src="/static/images/emotion/怒.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="汗" data-input="@(汗)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="汗"
                                        src="/static/images/emotion/汗.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="黑线" data-input="@(黑线)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="黑线"
                                        src="/static/images/emotion/黑线.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="泪" data-input="@(泪)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="泪"
                                        src="/static/images/emotion/泪.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="真棒" data-input="@(真棒)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="真棒"
                                        src="/static/images/emotion/真棒.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="喷" data-input="@(喷)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="喷"
                                        src="/static/images/emotion/喷.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="惊哭" data-input="@(惊哭)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="惊哭"
                                        src="/static/images/emotion/惊哭.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="阴险" data-input="@(阴险)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="阴险"
                                        src="/static/images/emotion/阴险.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="鄙视" data-input="@(鄙视)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="鄙视"
                                        src="/static/images/emotion/鄙视.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="酷" data-input="@(酷)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="酷"
                                        src="/static/images/emotion/酷.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="啊" data-input="@(啊)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="啊"
                                        src="/static/images/emotion/啊.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="狂汗" data-input="@(狂汗)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="狂汗"
                                        src="/static/images/emotion/狂汗.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="what" data-input="@(what)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="what"
                                        src="/static/images/emotion/what.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="疑问" data-input="@(疑问)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="疑问"
                                        src="/static/images/emotion/疑问.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="酸爽" data-input="@(酸爽)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="酸爽"
                                        src="/static/images/emotion/酸爽.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="呀咩爹" data-input="@(呀咩爹)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="呀咩爹"
                                        src="/static/images/emotion/呀咩爹.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="委屈" data-input="@(委屈)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="委屈"
                                        src="/static/images/emotion/委屈.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="惊讶" data-input="@(惊讶)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="惊讶"
                                        src="/static/images/emotion/惊讶.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="睡觉" data-input="@(睡觉)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="睡觉"
                                        src="/static/images/emotion/睡觉.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="笑尿" data-input="@(笑尿)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="笑尿"
                                        src="/static/images/emotion/笑尿.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="挖鼻" data-input="@(挖鼻)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="挖鼻"
                                        src="/static/images/emotion/挖鼻.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="吐" data-input="@(吐)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="吐"
                                        src="/static/images/emotion/吐.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="犀利" data-input="@(犀利)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="犀利"
                                        src="/static/images/emotion/犀利.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="小红脸" data-input="@(小红脸)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="小红脸"
                                        src="/static/images/emotion/小红脸.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="懒得理" data-input="@(懒得理)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="懒得理"
                                        src="/static/images/emotion/懒得理.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="勉强" data-input="@(勉强)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="勉强"
                                        src="/static/images/emotion/勉强.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="玫瑰" data-input="@(玫瑰)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="玫瑰"
                                        src="/static/images/emotion/玫瑰.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="茶杯" data-input="@(茶杯)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="茶杯"
                                        src="/static/images/emotion/茶杯.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="大拇指" data-input="@(大拇指)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="大拇指"
                                        src="/static/images/emotion/大拇指.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="胜利" data-input="@(胜利)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="胜利"
                                        src="/static/images/emotion/胜利.png"
                                    />
                                </EmoticonLi>
                                <EmoticonLi title="haha" data-input="@(haha)">
                                    <img
                                        className="biaoqing newpaopao"
                                        title="haha"
                                        src="/static/images/emotion/haha.png"
                                    />
                                </EmoticonLi>
                            </EmoticonList>
                        </EmotionWrap>
                    )}
                    {/* <Button variant="outline" size="sm" fontSize={14} variantColor="green" mt={1} ml={2}>
                        <svg className="Zi Zi--Emotion" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M7.523 13.5h8.954c-.228 2.47-2.145 4-4.477 4-2.332 0-4.25-1.53-4.477-4zM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-1.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3-8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
                        </svg>
                    </Button>
                    <Button size="sm" fontSize={14} variantColor="green" mt={1} ml={2}>
                        {isShowPreview ? '关闭预览' : '预览'}
                    </Button>
                    <Button size="sm" fontSize={14} variantColor="green" mt={1} ml={2}>
                        提 交
                    </Button> */}
                    <ButtonSubmitWrap>
                        <span>🚀support markdown (*￣▽￣*)ブ</span>
                        <ButtonGroup>
                            <PreviewButton type="button" onClick={() => setIsShowEmotion(!isShowEmotion)}>
                                {isShowEmotion ? '关闭表情' : '打开表情'}
                            </PreviewButton>
                            <PreviewButton type="button" onClick={() => showPreview()}>
                                {isShowPreview ? '关闭预览' : '预览'}
                            </PreviewButton>
                            <ButtonSubmit
                                disabled={buttonLoading}
                                type="button"
                                className="CommentForm-submit"
                                onClick={() => submit()}
                            >
                                {buttonLoading && <i className="fa fa-spinner fa-pulse fa-fw"></i>} 提 交
                            </ButtonSubmit>
                        </ButtonGroup>
                    </ButtonSubmitWrap>
                </Footer>
            </Box>
        </CommentFormWrap>
    );
};
