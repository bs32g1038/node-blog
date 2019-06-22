import React from 'react';

class LazyLoad extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            tag: props.tag || 'img',
            attrs: {},
            fn: null
        };
    }

    public getTop(e: any) {
        let T = e.offsetTop;
        while (e.offsetParent) {
            e = e.offsetParent;
            T += e.offsetTop;
        }
        return T;
    }

    public load() {
        const H = window.innerHeight;
        const S = document.documentElement.scrollTop || document.body.scrollTop;
        if (H + S > this.getTop(this.refs.dom)) {
            this.setState({
                attrs: this.props
            });
        }
    }

    public componentDidMount() {
        this.load();
        const fn = () => this.load();
        this.setState({
            fn
        });
        window.addEventListener('scroll', fn, false);
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.state.fn);
    }

    public render() {
        const Tag = this.state.tag;
        return (
            <Tag {...this.state.attrs} ref="dom" />
        );
    }

}

export default LazyLoad;