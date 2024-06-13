/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'antd-mobile';
import style from './style.module.scss';

interface Props {
    onInput: (val: string) => void;
}

const Emoji = (props: Props) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        let $el: any = null;
        if (event.target instanceof HTMLElement) {
            if (event.target.nodeName.toLowerCase() === 'button') {
                $el = event.target;
            } else if (event.target.nodeName.toLowerCase() === 'img') {
                $el = event.target.parentNode?.parentNode;
            }
            if ($el) {
                const text = $el.getAttribute?.('data-input').trim();
                if (props.onInput) {
                    props.onInput(text);
                }
            }
        }
    };
    return (
        <div className={style.emoji} onClick={onClick}>
            <Button data-input="@(呵呵)">
                <img className="biaoqing newpaopao" title="呵呵" src="/static/images/emotion/呵呵.png" />
            </Button>
            <Button data-input="@(哈哈)">
                <img className="biaoqing newpaopao" title="哈哈" src="/static/images/emotion/哈哈.png" />
            </Button>
            <Button data-input="@(吐舌)">
                <img className="biaoqing newpaopao" title="吐舌" src="/static/images/emotion/吐舌.png" />
            </Button>
            <Button data-input="@(太开心)">
                <img className="biaoqing newpaopao" title="太开心" src="/static/images/emotion/太开心.png" />
            </Button>
            <Button data-input="@(笑眼)">
                <img className="biaoqing newpaopao" title="笑眼" src="/static/images/emotion/笑眼.png" />
            </Button>
            <Button data-input="@(花心)">
                <img className="biaoqing newpaopao" title="花心" src="/static/images/emotion/花心.png" />
            </Button>
            <Button data-input="@(小乖)">
                <img className="biaoqing newpaopao" title="小乖" src="/static/images/emotion/小乖.png" />
            </Button>
            <Button data-input="@(乖)">
                <img className="biaoqing newpaopao" title="乖" src="/static/images/emotion/乖.png" />
            </Button>
            <Button data-input="@(捂嘴笑)">
                <img className="biaoqing newpaopao" title="捂嘴笑" src="/static/images/emotion/捂嘴笑.png" />
            </Button>
            <Button data-input="@(滑稽)">
                <img className="biaoqing newpaopao" title="滑稽" src="/static/images/emotion/滑稽.png" />
            </Button>
            <Button data-input="@(你懂的)">
                <img className="biaoqing newpaopao" title="你懂的" src="/static/images/emotion/你懂的.png" />
            </Button>
            <Button data-input="@(不高兴)">
                <img className="biaoqing newpaopao" title="不高兴" src="/static/images/emotion/不高兴.png" />
            </Button>
            <Button data-input="@(怒)">
                <img className="biaoqing newpaopao" title="怒" src="/static/images/emotion/怒.png" />
            </Button>
            <Button data-input="@(汗)">
                <img className="biaoqing newpaopao" title="汗" src="/static/images/emotion/汗.png" />
            </Button>
            <Button data-input="@(黑线)">
                <img className="biaoqing newpaopao" title="黑线" src="/static/images/emotion/黑线.png" />
            </Button>
            <Button data-input="@(泪)">
                <img className="biaoqing newpaopao" title="泪" src="/static/images/emotion/泪.png" />
            </Button>
            <Button data-input="@(真棒)">
                <img className="biaoqing newpaopao" title="真棒" src="/static/images/emotion/真棒.png" />
            </Button>
            <Button data-input="@(喷)">
                <img className="biaoqing newpaopao" title="喷" src="/static/images/emotion/喷.png" />
            </Button>
            <Button data-input="@(惊哭)">
                <img className="biaoqing newpaopao" title="惊哭" src="/static/images/emotion/惊哭.png" />
            </Button>
            <Button data-input="@(阴险)">
                <img className="biaoqing newpaopao" title="阴险" src="/static/images/emotion/阴险.png" />
            </Button>
            <Button data-input="@(鄙视)">
                <img className="biaoqing newpaopao" title="鄙视" src="/static/images/emotion/鄙视.png" />
            </Button>
            <Button data-input="@(酷)">
                <img className="biaoqing newpaopao" title="酷" src="/static/images/emotion/酷.png" />
            </Button>
            <Button data-input="@(啊)">
                <img className="biaoqing newpaopao" title="啊" src="/static/images/emotion/啊.png" />
            </Button>
            <Button data-input="@(狂汗)">
                <img className="biaoqing newpaopao" title="狂汗" src="/static/images/emotion/狂汗.png" />
            </Button>
            <Button data-input="@(what)">
                <img className="biaoqing newpaopao" title="what" src="/static/images/emotion/what.png" />
            </Button>
            <Button data-input="@(疑问)">
                <img className="biaoqing newpaopao" title="疑问" src="/static/images/emotion/疑问.png" />
            </Button>
            <Button data-input="@(酸爽)">
                <img className="biaoqing newpaopao" title="酸爽" src="/static/images/emotion/酸爽.png" />
            </Button>
            <Button data-input="@(呀咩爹)">
                <img className="biaoqing newpaopao" title="呀咩爹" src="/static/images/emotion/呀咩爹.png" />
            </Button>
            <Button data-input="@(委屈)">
                <img className="biaoqing newpaopao" title="委屈" src="/static/images/emotion/委屈.png" />
            </Button>
            <Button data-input="@(惊讶)">
                <img className="biaoqing newpaopao" title="惊讶" src="/static/images/emotion/惊讶.png" />
            </Button>
            <Button data-input="@(睡觉)">
                <img className="biaoqing newpaopao" title="睡觉" src="/static/images/emotion/睡觉.png" />
            </Button>
            <Button data-input="@(笑尿)">
                <img className="biaoqing newpaopao" title="笑尿" src="/static/images/emotion/笑尿.png" />
            </Button>
            <Button data-input="@(挖鼻)">
                <img className="biaoqing newpaopao" title="挖鼻" src="/static/images/emotion/挖鼻.png" />
            </Button>
            <Button data-input="@(吐)">
                <img className="biaoqing newpaopao" title="吐" src="/static/images/emotion/吐.png" />
            </Button>
            <Button data-input="@(犀利)">
                <img className="biaoqing newpaopao" title="犀利" src="/static/images/emotion/犀利.png" />
            </Button>
            <Button data-input="@(小红脸)">
                <img className="biaoqing newpaopao" title="小红脸" src="/static/images/emotion/小红脸.png" />
            </Button>
            <Button data-input="@(懒得理)">
                <img className="biaoqing newpaopao" title="懒得理" src="/static/images/emotion/懒得理.png" />
            </Button>
            <Button data-input="@(勉强)">
                <img className="biaoqing newpaopao" title="勉强" src="/static/images/emotion/勉强.png" />
            </Button>
            <Button data-input="@(玫瑰)">
                <img className="biaoqing newpaopao" title="玫瑰" src="/static/images/emotion/玫瑰.png" />
            </Button>
            <Button data-input="@(茶杯)">
                <img className="biaoqing newpaopao" title="茶杯" src="/static/images/emotion/茶杯.png" />
            </Button>
            <Button data-input="@(大拇指)">
                <img className="biaoqing newpaopao" title="大拇指" src="/static/images/emotion/大拇指.png" />
            </Button>
            <Button data-input="@(胜利)">
                <img className="biaoqing newpaopao" title="胜利" src="/static/images/emotion/胜利.png" />
            </Button>
            <Button data-input="@(haha)">
                <img className="biaoqing newpaopao" title="haha" src="/static/images/emotion/haha.png" />
            </Button>
        </div>
    );
};

export default Emoji;
