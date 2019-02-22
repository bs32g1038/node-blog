import React from 'react';
import { Pie } from 'react-chartjs-2';

const initData = {
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: [
            'rgba(7,144,232, 0.7)',
            'rgba(49,174,255, 0.7)',
            'rgba(73,177,245, 0.7)',
            'rgba(20,196,255, 0.7)',
            'rgba(26,216,249, 0.7)',
            'rgba(0,238,255, 0.7)',
            'rgba(0,238,255, 0.7)',
            'rgba(116,254,244, 0.7)',
            'rgba(140,228,222, 0.7)',
            'rgba(180,225,193, 0.7)'
        ],
        hoverBackgroundColor: [
            'rgba(7,144,232, 0.7)',
            'rgba(49,174,255, 0.7)',
            'rgba(73,177,245, 0.7)',
            'rgba(20,196,255, 0.7)',
            'rgba(26,216,249, 0.7)',
            'rgba(0,238,255, 0.7)',
            'rgba(0,238,255, 0.7)',
            'rgba(116,254,244, 0.7)',
            'rgba(140,228,222, 0.7)',
            'rgba(180,225,193, 0.7)'
        ]

    }]
};
const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        position: 'left'
    }
};
export default class PieChart extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: {}
        };
    }

    public componentDidMount() {
        const userRepos = this.props.userRepos;
        if (userRepos) {
            const edges = userRepos.edges;
            edges.sort((x: any, y: any) => {
                return y.node.stargazers.totalCount - x.node.stargazers.totalCount;
            });

            const starsTop12 = edges.slice(0, 12);
            const data = starsTop12.map((item: any) => {
                return item.node.stargazers.totalCount <= 0 ? 1 : item.node.stargazers.totalCount;
            });
            const labels = starsTop12.map((item: any) => {
                return item.node.name;
            });
            const o: any = { ...initData };
            console.log(data);
            o.datasets[0].data = data;
            o.labels = labels;
            this.setState({
                data: o
            });
        }
    }
    public render() {
        return (
            <Pie data={this.state.data} options={options} />
        );
    }
}