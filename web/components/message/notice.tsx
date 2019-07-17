import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import React from 'react';
import ReactDOM from 'react-dom';

const bounceInDown = keyframes`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }

  75% {
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0, 5px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const InfoSvg = (
    <svg version="1.1" viewBox="0 0 496.158 496.158" className="icon">
        <path
            d="M496.158,248.085c0-137.022-111.069-248.082-248.075-248.082C111.07,0.003,0,111.063,0,248.085
        c0,137.001,111.07,248.07,248.083,248.07C385.089,496.155,496.158,385.086,496.158,248.085z"
        />
        <g>
            <path
                style={{ fill: '#fff' }}
                d="M315.249,359.555c-1.387-2.032-4.048-2.755-6.27-1.702c-24.582,11.637-52.482,23.94-57.958,25.015
            c-0.138-0.123-0.357-0.348-0.644-0.737c-0.742-1.005-1.103-2.318-1.103-4.015c0-13.905,10.495-56.205,31.192-125.719
            c17.451-58.406,19.469-70.499,19.469-74.514c0-6.198-2.373-11.435-6.865-15.146c-4.267-3.519-10.229-5.302-17.719-5.302
            c-12.459,0-26.899,4.73-44.146,14.461c-16.713,9.433-35.352,25.41-55.396,47.487c-1.569,1.729-1.733,4.314-0.395,6.228
            c1.34,1.915,3.825,2.644,5.986,1.764c7.037-2.872,42.402-17.359,47.557-20.597c4.221-2.646,7.875-3.989,10.861-3.989
            c0.107,0,0.199,0.004,0.276,0.01c0.036,0.198,0.07,0.5,0.07,0.933c0,3.047-0.627,6.654-1.856,10.703
            c-30.136,97.641-44.785,157.498-44.785,182.994c0,8.998,2.501,16.242,7.432,21.528c5.025,5.393,11.803,8.127,20.146,8.127
            c8.891,0,19.712-3.714,33.08-11.354c12.936-7.392,32.68-23.653,60.363-49.717C316.337,364.326,316.636,361.587,315.249,359.555z"
            />
            <path
                style={{ fill: '#fff' }}
                d="M314.282,76.672c-4.925-5.041-11.227-7.597-18.729-7.597c-9.34,0-17.475,3.691-24.176,10.971
            c-6.594,7.16-9.938,15.946-9.938,26.113c0,8.033,2.463,14.69,7.32,19.785c4.922,5.172,11.139,7.794,18.476,7.794
            c8.958,0,17.049-3.898,24.047-11.586c6.876-7.553,10.363-16.433,10.363-26.393C321.646,88.105,319.169,81.684,314.282,76.672z"
            />
        </g>
    </svg>
);

const MessageFix = styled.div`
    position: fixed;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    top: 16px;
    left: 0;
    z-index: 1010;
    width: 100%;
    pointer-events: none;
`;

const MessageWrap = styled.div`
    text-align: center;
`;

const Message = styled.div`
    padding: 10px 20px;
    margin: 8px auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #454545;
    display: inline-block;
    vertical-align: text-bottom;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #dcdcdc;
    border-top: 2px solid #f86422;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    animation: ${bounceInDown} 0.6s ease-in;
    .icon {
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;
        fill: currentColor;
        overflow: hidden;
    }

    > svg {
        font-size: 14px;
    }

    &.info > svg {
        color: #1890ff;
    }

    &.success > svg {
        color: #52c41a;
    }

    &.warning > svg {
        color: #faad14;
    }

    &.error > svg {
        color: #f74a53;
    }

    &.loading > svg {
        color: #1890ff;
        animation: rotating 1s linear infinite;
    }

    .content {
        margin-left: 10px;
    }
`;

class Notice extends React.Component<any, any> {
    transitionTime: number;

    constructor(props: any) {
        super(props);
        this.transitionTime = 300;
        this.state = { notices: [] };
        this.removeNotice = this.removeNotice.bind(this);
    }

    getNoticeKey() {
        const { notices } = this.state;
        return `notice-${new Date().getTime()}-${notices.length}`;
    }

    addNotice(notice: any) {
        const { notices } = this.state;
        notice.key = this.getNoticeKey();
        if (notices.every((item: any) => item.key !== notice.key)) {
            if (notice.length > 0 && notices[notice.length - 1].type === 'loading') {
                notices.push(notice);
                setTimeout(() => {
                    this.setState({ notices });
                }, this.transitionTime);
            } else {
                notices.push(notice);
                this.setState({ notices });
            }
            if (notice.duration > 0) {
                setTimeout(() => {
                    this.removeNotice(notice.key);
                }, notice.duration);
            }
        }
        return () => {
            this.removeNotice(notice.key);
        };
    }

    removeNotice(key: string) {
        const { notices } = this.state;
        this.setState({
            notices: notices.filter((notice: any) => {
                if (notice.key === key) {
                    if (notice.onClose) setTimeout(notice.onClose, this.transitionTime);
                    return false;
                }
                return true;
            }),
        });
    }

    render() {
        return (
            <MessageFix>
                <span>
                    {this.state.notices.map((notice: any) => (
                        <MessageWrap key={notice.key}>
                            <Message className={`Message-notice ${notice.type}`}>
                                {InfoSvg}
                                <span className="content">{notice.content}</span>
                            </Message>
                        </MessageWrap>
                    ))}
                </span>
            </MessageFix>
        );
    }
}

function createNotification() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ref: any = React.createRef();
    ReactDOM.render(<Notice ref={ref} />, div);
    return {
        addNotice(notice: any) {
            ref.current.addNotice(notice);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
    };
}

export default createNotification;
