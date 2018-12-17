import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { isEmail, isEmpty, isURL } from 'validator';
import axios from '../../utils/axios';

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
const CommentFormWrap = styled.form((_) => ({
    display: 'flex',
    flexDirection: 'column'
}));

const Notice = styled.p((_) => ({
    color: '#9e9e9e',
    margin: '8px 0',
    textAlign: 'center'
}));

const FormInline = styled.div((_) => ({
    display: 'flex',
    marginBottom: '10px',
}));

const FormGroup = styled.div((_) => ({
    display: 'flex',
    flex: '1 0 auto',
    marginRight: '5px',
    backgroundColor: '#f5f5f5'
}));

const FormLabel = styled.label((_) => ({
    alignItems: 'center',
    color: '#9e9e9e',
    display: 'flex',
    justifyContent: 'center',
    padding: '3px 0 3px 12px',
    whiteSpace: 'nowrap',
    '>.red': {
        color: '#f90000'
    }
}));

const FormInput = styled.input((props: { isError?: boolean }) => ({
    border: 'none',
    color: '#515151',
    flex: '1 0 auto',
    marginLeft: '-1px',
    padding: '3px 4px',
    backgroundColor: '#f5f5f5',
    height: '36px',
    boxSizing: 'border-box',
    ...props.isError ? { animation: `${bounce} 1s ease infinite` } : {},
    '&:focus': {
        outline: 'none'
    },
    '&:-webkit-autofill': {
        boxShadow: '0 0 0 60px #f5f5f5 inset',
        WebkitTextFillColor: '#878787',
    },
    '&:-webkit-autofill:hover': {
        boxShadow: '0 0 0 60px #f5f5f5 inset',
        WebkitTextFillColor: '#878787',
    },
    '&:-webkit-autofill:focus': {
        boxShadow: '0 0 0 60px #f5f5f5 inset',
        WebkitTextFillColor: '#878787',
    }
}));

const ContentWrap = styled.div((_) => ({
    marginBottom: '10px'
}));

const Textarea = styled.textarea((props: { isError?: boolean }) => ({
    border: 'none',
    width: '100%',
    padding: '12px',
    backgroundColor: '#f5f5f5',
    minHeight: '90px',
    '&:focus': {
        outline: 'none'
    },
    boxSizing: 'border-box',
    ...props.isError ? { animation: `${bounce} 1s ease infinite` } : {},
}));

const Footer = styled.div((_) => ({
    display: 'flex',
    justifycontent: 'flex-end',
    transition: 'all .4s ease-in'
}));

const Button = styled.button((_) => ({
    backgroundColor: 'rgba(2, 117, 216, 0.5)',
    border: 'none',
    borderRadius: '3px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 400,
    padding: '10px 12px',
    textAlign: 'center',
    width: '100%'
}));

const ErrorTipDiv = styled.p((_) => ({
    color: '#721c24',
    textAlign: 'center',
    margin: '0 0 10px 0',
    backgroundColor: '#f8d7da',
    padding: '8px 0',
    borderRadius: '4px',
    border: '1px solid #f5c6cb'
}));

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
        errorText: ''
    };
    public render() {
        return (
            <CommentFormWrap ref="form">
                <Notice>电子邮件地址不会被公开。必填项已用*标注</Notice>
                <FormInline>
                    <FormGroup>
                        <FormLabel>昵称<span className="red">*</span>：</FormLabel>
                        <FormInput isError={this.state.isValidationErrors_nickName} id="nickName" name="nickName" placeholder="请输入你的昵称" type="text" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>邮箱<span className="red">*</span>：</FormLabel>
                        <FormInput isError={this.state.isValidationErrors_email} id="email" name="email" placeholder="请输入你的email" type="text" />
                    </FormGroup>
                </FormInline>
                <FormInline>
                    <FormGroup>
                        <FormLabel>网址：</FormLabel>
                        <FormInput isError={this.state.isValidationErrors_website} id="website" name="website" placeholder="如：https://www.lizc.me" type="text" />
                    </FormGroup>
                </FormInline>
                <ContentWrap>
                    <Textarea isError={this.state.isValidationErrors_content} id="content" name="content" rows={3} placeholder="留点空白给你说~"></Textarea>
                </ContentWrap>
                {this.state.errorText && <ErrorTipDiv>{this.state.errorText}</ErrorTipDiv>}
                <Footer>
                    <Button disabled={this.state.buttonLoading} type="button" className="CommentForm-submit" onClick={() => this.submit()}>
                        {this.state.buttonLoading && <i className="fa fa-spinner fa-pulse fa-fw"></i>} 提 交
                    </Button>
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
            if (res.status === 429) {
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