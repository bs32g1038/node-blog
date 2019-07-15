import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { isEmail, isEmpty, isURL } from 'validator';
import axios from '../../utils/axios';
import { media, xss } from '../../utils/helper';
import marked from '../../utils/marked';

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

const FormGroup = styled.div`
    display: flex;
    flex: 1 0 auto;
    margin-bottom: 10px;
    border-radius: 2px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FormInput: any = styled.input`
    color: #333;
    flex: 1 0 auto;
    font-size: 13px;
    padding: 3px 3px 0 5px;
    height: 36px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px dashed #dedede;
    width: 33.33%;
    max-width: 184px;
    transition: all 0.4s ease;
    background-color: hsl(0, 0%, 96%);
    border: 1px solid #e5e5e5;
    ${(props: any) => (props.isError ? { animation: `${bounce} 1s ease infinite` } : '')};
    &:focus {
        outline: none;
        border-bottom-color: #eb5055;
    }
    &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #ffffff inset !important;
        -webkit-text-fill-color: #3e3e3e !important;
    }
    ${media.phone`
        width: 100%;
        max-width: inherit;
        margin-bottom: 5px;
    `}
`;

const ContentWrap = styled.div`
    border: 1px solid #e5e5e5;
    background-color: hsl(0, 0%, 96%);
`;

const Textarea: any = styled.textarea`
    width: 100%;
    min-width: 200px;
    min-height: 90px;
    border: none;
    box-sizing: border-box;
    background-color: hsl(0, 0%, 96%);
    padding: 10px;
    display: block;
    resize: none;
    ${(props: any) => (props.isError ? { animation: `${bounce} 1s ease infinite` } : '')};
    &:focus {
        outline: none;
    }
`;

const PreviewPane = styled.div`
    width: 100%;
    min-width: 200px;
    min-height: 90px;
    max-height: 90px;
    border: none;
    box-sizing: border-box;
    border-top: 1px dashed #dedede;
    border-bottom: 1px dashed #dedede;
    overflow: auto;
    img {
        max-width: 20px;
        vertical-align: text-bottom;
    }
`;

const Footer = styled.div`
    transition: all 0.4s ease-in;
    background-color: #d5d5d5;
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
    const [isShowEmotion, setIsShowEmotion] = useState(false);
    const [nickNameError, setNickNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [buttonLoading, setButtonLoading] = useState(false);
    const $content = useRef({ value: '', oninput: (_: any) => _ });
    const $form = useRef(null);
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const renderMakrdown = (str: string) => {
        setPreviewHtml(marked(str));
    };
    const showPreview = () => {
        setIsShowPreview(!isShowPreview);
        console.log(previewHtml);
        renderMakrdown(previewHtml);
    };
    const insertEmotion = (event: any) => {
        if (event.target.nodeName.toLowerCase() === 'img') {
            const $li = event.target.parentNode;
            const text = $li.getAttribute('data-input').trim();
            $content.current.value = $content.current.value + text;
            renderMakrdown($content.current.value);
        }
    };
    useEffect(() => {
        const info = localStorage.getItem(USER_COMMENT_INFO);
        if (info) {
            const $nickName: any = document.getElementById('nickName');
            const $email: any = document.getElementById('email');
            const $website: any = document.getElementById('website');
            const data: any = JSON.parse(info);
            $nickName.value = data.nickName;
            $email.value = data.email;
            $website.value = data.website;
        }
        $content.current.oninput = () => {
            renderMakrdown($content.current.value);
        };
    }, [1]);

    const submit = (): any => {
        const form: any = $form.current;
        const elements: [{ name: string; value: string }] = form.elements;
        const data: any = {
            article: props.articleId,
        };
        for (const ele of Array.from(elements)) {
            if (ele.name) {
                data[ele.name] = ele.value;
            }
        }
        const lay = () =>
            setTimeout(() => {
                setNickNameError(false);
                setEmailError(false);
                setWebsiteError(false);
                setContentError(false);
            }, 800);
        if (isEmpty(data.nickName)) {
            setNickNameError(true);
            lay();
            return false;
        } else if (!isEmail(data.email)) {
            setEmailError(true);
            lay();
            return false;
        } else if (!isEmpty(data.website) && !isURL(data.website)) {
            setWebsiteError(true);
            lay();
            return false;
        } else if (isEmpty(data.content)) {
            setContentError(true);
            lay();
            return false;
        }

        localStorage.setItem(
            USER_COMMENT_INFO,
            JSON.stringify({
                nickName: data.nickName,
                email: data.email,
                website: data.website,
            })
        );

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
                    setErrorText('内容长度必须在1-250个字符之间！');
                    setButtonLoading(false);
                } else if (res.status === 429) {
                    setErrorText('对不起！您的ip存在异常行为，系统已暂时禁止提交！');
                    setButtonLoading(false);
                } else {
                    setErrorText('sorry！系统异常，正在修复中。。。');
                    setButtonLoading(false);
                }
            });
    };
    return (
        <CommentFormWrap ref={$form}>
            <FormGroup>
                <FormInput isError={nickNameError} id="nickName" name="nickName" placeholder="昵称" type="text" />
                <FormInput isError={emailError} id="email" name="email" placeholder="邮箱" type="text" />
                <FormInput
                    isError={websiteError}
                    id="website"
                    name="website"
                    placeholder="网址 http(s)://"
                    type="text"
                />
            </FormGroup>
            <ContentWrap>
                <Textarea
                    isError={contentError}
                    ref={$content}
                    name="content"
                    rows={3}
                    placeholder="留点空白给你说~"
                ></Textarea>
                {isShowPreview && <PreviewPane dangerouslySetInnerHTML={{ __html: xss(previewHtml) }}></PreviewPane>}
                {errorText && <ErrorTipDiv>{errorText}</ErrorTipDiv>}
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
            </ContentWrap>
        </CommentFormWrap>
    );
};
