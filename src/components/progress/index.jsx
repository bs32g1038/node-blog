import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import './index.scss'
class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 0,
            show: false,
            canSuccess: true,
            duration: 3000,
            height: '2px',
            color: '#2299dd',
            failedColor: '#ff0000',
            _timer: null
        }
    }
    start() {
        this.setState({
            show: true,
            canSuccess: true
        })
        if (this.state._timer) {
            clearInterval(this.state._timer)
            this.setState({
                percent: 0
            })
        }
        let _cut = 10000 / Math.floor(this.state.duration)
        this.state._timer = setInterval(() => {
                this.increase(_cut * Math.random())
                if (this.state.percent > 95) {
                    this.finish()
                }
            }, 100)
    }
    set(num) {
        this.setState({
            canSuccess: true,
            show: true,
            percent: Math.floor(num)
        })
    }
    get() {
        return Math.floor(this.state.percent)
    }
    increase(num) {
        this.setState({
            percent: this.state.percent + Math.floor(num)
        })
    }
    decrease(num) {
        this.setState({
            percent: this.state.percent - Math.floor(num)
        })
    }
    finish() {
        this.setState({
            percent: 100
        })
        this.hide()
    }
    pause() {
        clearInterval(this.state._timer)
    }
    hide() {
        clearInterval(this.state._timer)
        this.setState({
            _timer: null
        })
        setTimeout(() => {
            this.setState({
                show: false
            })
            setTimeout(() => {
                this.setState({
                    percent: 0
                })
            }, 200)
        }, 500)
    }
    fail() {
        this.setState({
            canSuccess: false
        })
    }
    render() {
        return (
            <div className="progress" style={{
                width: this.state.percent + '%',
                height: this.state.height,
                backgroundColor: this.state.canSuccess ? this.state.color : this.state.failedColor,
                opacity: this.state.show ? 1 : 0
            }}></div>
        )
    }
}

Progress.newInstance = function newNotificationInstance(properties) {
    let props = properties || {};
    let div = document.createElement('div');
    document.body.appendChild(div);
    const progress = ReactDOM.render(<Progress />, div);
    return {
        start: () => progress.start(),
        finish: () => progress.finish()
    };
};

export default Progress.newInstance({});