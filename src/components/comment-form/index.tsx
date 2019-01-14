import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { isEmail, isEmpty, isURL } from 'validator';
import axios from '../../utils/axios';
import { media, rem } from '../../utils/helper';
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
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 10px;
`;

const FormGroup = styled.div`
    display: flex;
    flex: 1 0 auto;
    margin-right: 5px;
    margin-bottom: 10px;
    border-radius: 2px;
    flex-wrap: wrap;
`;

const FormInput = styled.input`
    color: #333;
    flex: 1 0 auto;
    margin-left: -1px;
    font-size: 13px;
    padding: 3px 0;
    height: 36px;
    min-width: 200px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px dashed #dedede;
    padding-left: 5px;
    width: 33.33%;
    transition: all .4s ease;
    ${(props: any) => props.isError ? { animation: `${bounce} 1s ease infinite` } : ''};
    &:focus {
        outline: none;
        border-bottom-color: #eb5055;
    };
    &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
         -webkit-text-fill-color: #3E3E3E !important;
    };
    ${media.phone`
        width: 100%;
    `}
`;

const ContentWrap = styled.div((_) => ({
    marginBottom: '6px'
}));

const Textarea = styled.textarea`
    width: 100%;
    min-width: 200px;
    min-height: 90px;
    border: none;
    box-sizing: border-box;
    border-bottom: 1px dashed #dedede;
    ${(props: any) => props.isError ? { animation: `${bounce} 1s ease infinite` } : ''};
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
    border-bottom: 1px dashed #dedede;
    overflow: auto;
    img {
        max-width: 20px;
        vertical-align: text-bottom;
    }
`;

const Footer = styled.div`
    transition: all .4s ease-in;
`;

const ButtonSubmitWrap = styled.div`
    line-height: 46px;
    color: #999;
    font-size: 12px;
    margin-left: 6px;
    ${media.phone`
        span {
            display: block;
        }
    `}
`;

const ButtonSubmit = styled.button`
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    padding: 8px 12px;
    text-align: center;
    border: 1px solid #6190e8;
    border-radius: 5px;
    background-color: #6190e8;
    margin-top: 10px;
    float: right;
`;

const PreviewButton = styled.button`
    color: #fff;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    padding: 8px 12px;
    text-align: center;
    border: 1px solid #19be6b;
    background-color: #19be6b;
    border-radius: 5px;
    margin-top: 10px;
    float: right;
    margin-right: 10px;
    &:focus {
        outline: none;
    }
`;

const ErrorTipDiv = styled.p((_) => ({
    color: '#721c24',
    textAlign: 'center',
    margin: '0 0 10px 0',
    backgroundColor: '#f8d7da',
    padding: '8px 0',
    borderRadius: '4px',
    border: '1px solid #f5c6cb'
}));

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
    >img {
        display: block;
        margin: 0;
        max-width: 30px;
    }
`;

interface Props {
    url: string;
    replyId?: string;
    articleId?: string;
}

class CommentForm extends Component<Props, any> {
    public state = {
        isValidationErrors_nickName: false,
        isValidationErrors_email: false,
        isValidationErrors_website: false,
        isValidationErrors_content: false,
        buttonLoading: false,
        errorText: '',
        previewHtml: '',
        isShowPreview: false
    };
    public insertEmotion(event: any) {
        if (event.target.nodeName.toLowerCase() === 'img') {
            const $li = event.target.parentNode;
            const text = $li.getAttribute('data-input').trim();
            const $content: any = document.getElementById('content');
            $content.value = $content.value + text;
            this.renderMakrdown();
        }
    }
    public renderMakrdown() {
        const $content: any = document.getElementById('content');
        this.setState({
            previewHtml: marked($content.value)
        });
    }
    public showPreview() {
        this.setState({
            isShowPreview: !this.state.isShowPreview
        });
    }
    public componentDidMount() {
        const $content: any = document.getElementById('content');
        $content.oninput = () => {
            this.renderMakrdown();
        };
    }
    public render() {
        return (
            <CommentFormWrap ref="form">
                <FormGroup>
                    <FormInput isError={this.state.isValidationErrors_nickName} id="nickName" name="nickName" placeholder="昵称" type="text" />
                    <FormInput isError={this.state.isValidationErrors_email} id="email" name="email" placeholder="邮箱" type="text" />
                    <FormInput isError={this.state.isValidationErrors_website} id="website" name="website" placeholder="网址 http(s)://" type="text" />
                </FormGroup>
                <ContentWrap>
                    <Textarea isError={this.state.isValidationErrors_content} id="content" name="content" rows={3} placeholder="留点空白给你说~"></Textarea>
                    {
                        this.state.isShowPreview &&
                        <PreviewPane dangerouslySetInnerHTML={{ __html: this.state.previewHtml }}></PreviewPane>
                    }
                </ContentWrap>
                {this.state.errorText && <ErrorTipDiv>{this.state.errorText}</ErrorTipDiv>}
                <Footer>
                    <EmotionWrap>
                        <EmoticonList onClick={(e) => this.insertEmotion(e)}>
                            <EmoticonLi title="呵呵" data-input="@(呵呵)">
                                <img className="biaoqing newpaopao" title="呵呵" src="/public/images/emotion/呵呵.png" />
                            </EmoticonLi>
                            <EmoticonLi title="哈哈" data-input="@(哈哈)">
                                <img className="biaoqing newpaopao" title="哈哈" src="/public/images/emotion/哈哈.png" />
                            </EmoticonLi>
                            <EmoticonLi title="吐舌" data-input="@(吐舌)">
                                <img className="biaoqing newpaopao" title="吐舌" src="/public/images/emotion/吐舌.png" />
                            </EmoticonLi>
                            <EmoticonLi title="太开心" data-input="@(太开心)">
                                <img className="biaoqing newpaopao" title="太开心" src="/public/images/emotion/太开心.png" />
                            </EmoticonLi>
                            <EmoticonLi title="笑眼" data-input="@(笑眼)">
                                <img className="biaoqing newpaopao" title="笑眼" src="/public/images/emotion/笑眼.png" />
                            </EmoticonLi>
                            <EmoticonLi title="花心" data-input="@(花心)">
                                <img className="biaoqing newpaopao" title="花心" src="/public/images/emotion/花心.png" />
                            </EmoticonLi>
                            <EmoticonLi title="小乖" data-input="@(小乖)">
                                <img className="biaoqing newpaopao" title="小乖" src="/public/images/emotion/小乖.png" />
                            </EmoticonLi>
                            <EmoticonLi title="乖" data-input="@(乖)">
                                <img className="biaoqing newpaopao" title="乖" src="/public/images/emotion/乖.png" />
                            </EmoticonLi>
                            <EmoticonLi title="捂嘴笑" data-input="@(捂嘴笑)">
                                <img className="biaoqing newpaopao" title="捂嘴笑" src="/public/images/emotion/捂嘴笑.png" />
                            </EmoticonLi>
                            <EmoticonLi title="滑稽" data-input="@(滑稽)">
                                <img className="biaoqing newpaopao" title="滑稽" src="/public/images/emotion/滑稽.png" />
                            </EmoticonLi>
                            <EmoticonLi title="你懂的" data-input="@(你懂的)">
                                <img className="biaoqing newpaopao" title="你懂的" src="/public/images/emotion/你懂的.png" />
                            </EmoticonLi>
                            <EmoticonLi title="不高兴" data-input="@(不高兴)">
                                <img className="biaoqing newpaopao" title="不高兴" src="/public/images/emotion/不高兴.png" />
                            </EmoticonLi>
                            <EmoticonLi title="怒" data-input="@(怒)">
                                <img className="biaoqing newpaopao" title="怒" src="/public/images/emotion/怒.png" />
                            </EmoticonLi>
                            <EmoticonLi title="汗" data-input="@(汗)">
                                <img className="biaoqing newpaopao" title="汗" src="/public/images/emotion/汗.png" />
                            </EmoticonLi>
                            <EmoticonLi title="黑线" data-input="@(黑线)">
                                <img className="biaoqing newpaopao" title="黑线" src="/public/images/emotion/黑线.png" />
                            </EmoticonLi>
                            <EmoticonLi title="泪" data-input="@(泪)">
                                <img className="biaoqing newpaopao" title="泪" src="/public/images/emotion/泪.png" />
                            </EmoticonLi>
                            <EmoticonLi title="真棒" data-input="@(真棒)">
                                <img className="biaoqing newpaopao" title="真棒" src="/public/images/emotion/真棒.png" />
                            </EmoticonLi>
                            <EmoticonLi title="喷" data-input="@(喷)">
                                <img className="biaoqing newpaopao" title="喷" src="/public/images/emotion/喷.png" />
                            </EmoticonLi>
                            <EmoticonLi title="惊哭" data-input="@(惊哭)">
                                <img className="biaoqing newpaopao" title="惊哭" src="/public/images/emotion/惊哭.png" />
                            </EmoticonLi>
                            <EmoticonLi title="阴险" data-input="@(阴险)">
                                <img className="biaoqing newpaopao" title="阴险" src="/public/images/emotion/阴险.png" />
                            </EmoticonLi>
                            <EmoticonLi title="鄙视" data-input="@(鄙视)">
                                <img className="biaoqing newpaopao" title="鄙视" src="/public/images/emotion/鄙视.png" />
                            </EmoticonLi>
                            <EmoticonLi title="酷" data-input="@(酷)">
                                <img className="biaoqing newpaopao" title="酷" src="/public/images/emotion/酷.png" />
                            </EmoticonLi>
                            <EmoticonLi title="啊" data-input="@(啊)">
                                <img className="biaoqing newpaopao" title="啊" src="/public/images/emotion/啊.png" />
                            </EmoticonLi>
                            <EmoticonLi title="狂汗" data-input="@(狂汗)">
                                <img className="biaoqing newpaopao" title="狂汗" src="/public/images/emotion/狂汗.png" />
                            </EmoticonLi>
                            <EmoticonLi title="what" data-input="@(what)">
                                <img className="biaoqing newpaopao" title="what" src="/public/images/emotion/what.png" />
                            </EmoticonLi>
                            <EmoticonLi title="疑问" data-input="@(疑问)">
                                <img className="biaoqing newpaopao" title="疑问" src="/public/images/emotion/疑问.png" />
                            </EmoticonLi>
                            <EmoticonLi title="酸爽" data-input="@(酸爽)">
                                <img className="biaoqing newpaopao" title="酸爽" src="/public/images/emotion/酸爽.png" />
                            </EmoticonLi>
                            <EmoticonLi title="呀咩爹" data-input="@(呀咩爹)">
                                <img className="biaoqing newpaopao" title="呀咩爹" src="/public/images/emotion/呀咩爹.png" />
                            </EmoticonLi>
                            <EmoticonLi title="委屈" data-input="@(委屈)">
                                <img className="biaoqing newpaopao" title="委屈" src="/public/images/emotion/委屈.png" />
                            </EmoticonLi>
                            <EmoticonLi title="惊讶" data-input="@(惊讶)">
                                <img className="biaoqing newpaopao" title="惊讶" src="/public/images/emotion/惊讶.png" />
                            </EmoticonLi>
                            <EmoticonLi title="睡觉" data-input="@(睡觉)">
                                <img className="biaoqing newpaopao" title="睡觉" src="/public/images/emotion/睡觉.png" />
                            </EmoticonLi>
                            <EmoticonLi title="笑尿" data-input="@(笑尿)">
                                <img className="biaoqing newpaopao" title="笑尿" src="/public/images/emotion/笑尿.png" />
                            </EmoticonLi>
                            <EmoticonLi title="挖鼻" data-input="@(挖鼻)">
                                <img className="biaoqing newpaopao" title="挖鼻" src="/public/images/emotion/挖鼻.png" />
                            </EmoticonLi>
                            <EmoticonLi title="吐" data-input="@(吐)">
                                <img className="biaoqing newpaopao" title="吐" src="/public/images/emotion/吐.png" />
                            </EmoticonLi>
                            <EmoticonLi title="犀利" data-input="@(犀利)">
                                <img className="biaoqing newpaopao" title="犀利" src="/public/images/emotion/犀利.png" />
                            </EmoticonLi>
                            <EmoticonLi title="小红脸" data-input="@(小红脸)">
                                <img className="biaoqing newpaopao" title="小红脸" src="/public/images/emotion/小红脸.png" />
                            </EmoticonLi>
                            <EmoticonLi title="懒得理" data-input="@(懒得理)">
                                <img className="biaoqing newpaopao" title="懒得理" src="/public/images/emotion/懒得理.png" />
                            </EmoticonLi>
                            <EmoticonLi title="勉强" data-input="@(勉强)">
                                <img className="biaoqing newpaopao" title="勉强" src="/public/images/emotion/勉强.png" />
                            </EmoticonLi>
                            <EmoticonLi title="玫瑰" data-input="@(玫瑰)">
                                <img className="biaoqing newpaopao" title="玫瑰" src="/public/images/emotion/玫瑰.png" />
                            </EmoticonLi>
                            <EmoticonLi title="茶杯" data-input="@(茶杯)">
                                <img className="biaoqing newpaopao" title="茶杯" src="/public/images/emotion/茶杯.png" />
                            </EmoticonLi>
                            <EmoticonLi title="大拇指" data-input="@(大拇指)">
                                <img className="biaoqing newpaopao" title="大拇指" src="/public/images/emotion/大拇指.png" />
                            </EmoticonLi>
                            <EmoticonLi title="胜利" data-input="@(胜利)">
                                <img className="biaoqing newpaopao" title="胜利" src="/public/images/emotion/胜利.png" />
                            </EmoticonLi>
                            <EmoticonLi title="haha" data-input="@(haha)">
                                <img className="biaoqing newpaopao" title="haha" src="/public/images/emotion/haha.png" />
                            </EmoticonLi>
                        </EmoticonList>
                    </EmotionWrap>
                    <ButtonSubmitWrap>
                        <span>🚀support markdown  (*￣▽￣*)ブ</span>
                        <ButtonSubmit disabled={this.state.buttonLoading} type="button" className="CommentForm-submit" onClick={() => this.submit()}>
                            {this.state.buttonLoading && <i className="fa fa-spinner fa-pulse fa-fw"></i>} 提 交
                        </ButtonSubmit>
                        <PreviewButton type="button" onClick={() => this.showPreview()}>
                            {this.state.isShowPreview ? '关闭预览' : '预览'}
                        </PreviewButton>
                    </ButtonSubmitWrap>
                </Footer>
            </CommentFormWrap>
        );
    }
    public submit() {
        const form: any = ReactDOM.findDOMNode(this.refs.form);
        const elements: [{ name: string, value: string }] = form.elements;
        const data: any = {
            article: this.props.articleId
        };
        for (const ele of Array.from(elements)) {
            if (ele.name) { data[ele.name] = ele.value; }
        }
        const lay = () => setTimeout(() => {
            this.setState({
                isValidationErrors_nickName: false,
                isValidationErrors_email: false,
                isValidationErrors_website: false,
                isValidationErrors_content: false
            });
        }, 800);
        if (isEmpty(data.nickName)) {
            return this.setState({
                isValidationErrors_nickName: true
            }, lay);
        } else if (!isEmail(data.email)) {
            return this.setState({
                isValidationErrors_email: true
            }, lay);
        } else if (!isEmpty(data.website) && !isURL(data.website)) {
            return this.setState({
                isValidationErrors_website: true
            }, lay);
        } else if (isEmpty(data.content)) {
            return this.setState({
                isValidationErrors_content: true
            }, lay);
        }
        if (this.props.replyId) {
            Object.assign(data, {
                reply: this.props.replyId
            });
        }
        this.setState({
            buttonLoading: true
        });
        axios.post(this.props.url, data).then(() => {
            location.reload();
        }).catch((err) => {
            const res = err.response;
            console.log(res.status);

            if (res.status === 422) {
                this.setState({
                    errorText: '内容长度必须在1-250个字符之间！',
                    buttonLoading: false
                });
            } else if (res.status === 429) {
                this.setState({
                    errorText: '对不起！您的ip存在异常行为，系统已暂时禁止提交！',
                    buttonLoading: false
                });
            } else {
                this.setState({
                    errorText: 'sorry！系统异常，正在修复中。。。',
                    buttonLoading: false
                });
            }
        });
    }
}

export default CommentForm;