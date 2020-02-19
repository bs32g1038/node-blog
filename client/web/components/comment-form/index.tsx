import React, { useEffect, useState, useCallback } from 'react';
import {
    Avatar,
    Text,
    Textarea,
    Flex,
    Alert,
    AlertIcon,
    Button,
    CloseButton,
    Collapse,
    Tooltip,
    IconButton,
} from '@chakra-ui/core';
import md5 from 'crypto-js/md5';
import aes from 'crypto-js/aes';
import isLength from 'validator/lib/isLength';
import encUtf8 from 'crypto-js/enc-utf8';
import { Box, ButtonGroup } from '@chakra-ui/core';
import { v4 as uuidv4 } from 'uuid';
import Emoji from './emoji';
import { debounce } from 'lodash';
import MarkdownBody from '../markdown-body';
import axios from '../../utils/axios';
import marked from '../../../libs/marked';
import GHAT from '../../../libs/generate-avatar';
import Icon from '../icon';

const ghat = new GHAT();

const USER_COMMENT_INFO = 'user_comment_info';

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
    const [isShowEmotion, setIsShowEmotion] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');
    const debounceContent = useCallback(
        debounce((value: string) => {
            setContent(value);
            if (!isShowPreview) {
                setPreviewHtml(marked(value));
            }
        }),
        [1]
    );

    const renderMakrdown = () => {
        setPreviewHtml(marked(content));
    };
    const showPreview = () => {
        if (!isShowPreview) {
            setPreviewHtml(marked(content));
        }
        setIsShowPreview(!isShowPreview);
    };
    const onEmojiInput = (text: string) => {
        setContent(val => val + text);
        renderMakrdown();
    };
    useEffect(() => {
        const info = localStorage.getItem(USER_COMMENT_INFO);
        if (info) {
            const realData = aes.decrypt(info, USER_COMMENT_INFO).toString(encUtf8);
            const data: any = JSON.parse(realData);
            setUserInfo(data);
        } else {
            const ids = uuidv4().split('-');
            const nickName = 'visitor_' + ids[0] + ids[1];
            const data = {
                nickName,
                email: 'visitor@lizc.email',
            };
            localStorage.setItem(USER_COMMENT_INFO, aes.encrypt(JSON.stringify(data), USER_COMMENT_INFO).toString());
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
        if (!isLength(data.content, { min: 6 })) {
            return setErrorMessage('最少输入6个字符！');
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
                    setButtonLoading(false);
                } else if (res.status === 429) {
                    setButtonLoading(false);
                } else {
                    setButtonLoading(false);
                }
                setErrorMessage('服务器开小差去了，请尝试刷新页面，再进行提交！');
            });
    };
    return (
        <Flex flexDirection="column">
            <Alert
                status="info"
                color="theme.primaryText"
                variant="subtle"
                fontSize={13}
                mb={3}
                backgroundColor="theme.blackground"
                position="relative"
                py={1}
            >
                <AlertIcon size="14px" />
                当前评论模式：游客模式，系统将自动生成相关数据信息
                <Tooltip
                    aria-label="tip"
                    placement="right-end"
                    label="发布评论时，请遵守您所在国家和中华人民共和国的法律法规，禁止发布政治相关内容；
评论内容应该和所在页面的内容相关，禁止一切无意义和严重跑题的内容；
请尊重他人，友好评论，请像和他人面对面谈话时一样保持对他人的尊重；
禁止发布商业广告；"
                >
                    <IconButton
                        width="20px"
                        color="theme.primaryText"
                        variant="solid"
                        variantColor=""
                        aria-label="tip"
                        icon="question-outline"
                        size="sm"
                        verticalAlign="text-bottom"
                        _focus={{
                            boxShadow: 'none',
                        }}
                    ></IconButton>
                </Tooltip>
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
                    src={ghat.getImage(md5(userInfo.nickName).toString()) || ''}
                />
                <Text fontSize={13} ml={2}>
                    {userInfo.nickName}
                </Text>
            </Flex>
            <Box color="theme.primaryText">
                {errorMessage && (
                    <Alert status="error" mb={1} color="theme.primaryText" variant="subtle" fontSize={13}>
                        <AlertIcon size="12px" />
                        {errorMessage}
                        <CloseButton
                            size="sm"
                            position="absolute"
                            right="8px"
                            top="11px"
                            onClick={() => {
                                setErrorMessage('');
                            }}
                        />
                    </Alert>
                )}
                <Textarea
                    bg="theme.blackground"
                    color="theme.primaryText"
                    focusBorderColor="none"
                    fontSize={14}
                    name="content"
                    borderRadius={0}
                    placeholder="留点空白给你说~"
                    resize="none"
                    isInvalid={!!errorMessage}
                    onChange={event => {
                        debounceContent(event.target.value);
                    }}
                ></Textarea>
                <Collapse mb={3} isOpen={isShowPreview}>
                    <Box
                        overflowY="auto"
                        minHeight="90px"
                        maxHeight="90px"
                        py={2}
                        borderStyle="dashed"
                        borderBottomWidth="1px"
                        borderBottomColor="#dedede"
                    >
                        <MarkdownBody content={previewHtml}></MarkdownBody>
                    </Box>
                </Collapse>
                <Box mt={2}>
                    <Collapse mb={3} isOpen={isShowEmotion}>
                        <Box borderBottom="1px dashed #dedede">
                            <Emoji
                                onInput={text => {
                                    onEmojiInput(text);
                                }}
                            ></Emoji>
                        </Box>
                    </Collapse>
                    <Flex justifyContent="space-between" fontSize={14} alignItems="center">
                        <span>🚀support markdown (*￣▽￣*)ブ</span>
                        <ButtonGroup spacing={4} color="theme.primaryText">
                            <Button
                                variantColor="gray"
                                variant="solid"
                                size="xs"
                                fontWeight="normal"
                                onClick={() => setIsShowEmotion(!isShowEmotion)}
                            >
                                {isShowEmotion ? '关闭表情' : '打开表情'}
                            </Button>
                            <Button
                                fontWeight="normal"
                                variantColor="gray"
                                variant="solid"
                                size="xs"
                                onClick={() => showPreview()}
                            >
                                {isShowPreview ? '关闭预览' : '预览'}
                            </Button>
                            <Button
                                fontWeight="normal"
                                isLoading={buttonLoading}
                                loadingText="正在提交..."
                                variantColor="blue"
                                variant="solid"
                                size="xs"
                                onClick={() => submit()}
                            >
                                提 交
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
};
