import React, { Component } from 'react';

const uid = () => {
    return Math.random().toString(36).substring(2);
};

interface Props {
    width?: number;
    height?: number;
    speed?: number;
    preserveAspectRatio?: string;
    primaryColor?: string;
    secondaryColor?: string;
    uniqueKey?: string;
    animate?: boolean;
    style?: any;
}

export default class ContentLoader extends Component<Props, any> {

    public static defaultProps: Props = {
        width: 400,
        height: 120,
        speed: 0,
        preserveAspectRatio: 'xMidYMid meet',
        primaryColor: '#f9f9f9',
        secondaryColor: '#ecebeb',
        animate: true,
        uniqueKey: '',
        style: null
    };

    public render() {
        const props: any = this.props;
        const children = this.props.children;
        const idClip = props.uniqueKey ? props.uniqueKey + '-idClip' : uid();
        const idGradient = props.uniqueKey ? props.uniqueKey + '-idGradient' : uid();
        return (
            <svg
                viewBox={`0 0 ${props.width} ${props.height}`}
                version="1.1"
                preserveAspectRatio={props.preserveAspectRatio}
                style={props.style}
            >
                <rect
                    style={{ fill: `url(#${idGradient})` }}
                    clipPath={`url(#${idClip})`}
                    x="0"
                    y="0"
                    width={props.width}
                    height={props.height}
                >
                </rect>;
                <defs>
                    <clipPath id={idClip}>
                        {children || (
                            <rect
                                x="0"
                                y="0"
                                rx="5"
                                ry="5"
                                width={props.width}
                                height={props.height}
                            >
                            </rect>
                        )}
                    </clipPath>
                    <linearGradient id={idGradient}>
                        <stop
                            offset="0%"
                            stopColor={props.primaryColor}
                        >
                            {props.animate ?
                                <animate
                                    attributeName="offset"
                                    values="-2; 1"
                                    dur={props.speed + 's'}
                                    repeatCount="indefinite"
                                >
                                </animate> : null
                            }
                        </stop>
                        <stop
                            offset="50%"
                            stopColor={props.secondaryColor}
                        >
                            {props.animate ?
                                <animate
                                    attributeName="offset"
                                    values="-1.5; 1.5"
                                    dur={props.speed + 's'}
                                    repeatCount="indefinite"
                                >
                                </animate> : null
                            }
                        </stop>
                        <stop
                            offset="100%"
                            stopColor={props.primaryColor}
                        >
                            {props.animate ?
                                <animate
                                    attributeName="offset"
                                    values="-1; 2"
                                    dur={props.speed + 's'}
                                    repeatCount="indefinite"
                                >
                                </animate> : null
                            }
                        </stop>
                    </linearGradient>
                </defs>
            </svg >
        );
    }

}

// example
{/* <ContentLoader>
<rect x="0" y="0" width="100" height="100"></rect>
<rect x="200" y="0" width="100" height="100"></rect>
</ContentLoader> */}