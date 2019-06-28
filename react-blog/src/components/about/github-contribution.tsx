import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import { ContentLoader } from '../content-loader';

const today = new Date();

interface Values {
    year: string;
    month: string;
    date: string;
    count: number;
}

interface ContributionProps {
    values: Values;
    totalContributionLastYear: number;
}

const Contribution = (props: ContributionProps) => {
    const { values, totalContributionLastYear } = props;
    return (
        <>
            <p>Github {totalContributionLastYear} contributions in the last year</p>
            <CalendarHeatmap
                startDate={(values[0] && values[0].year + '-' + values[0].month) || (new Date().getFullYear()) - 1 + '-1-1'}
                endDate={today}
                values={values}
                classForValue={(value: any) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-github-${value.count}`;
                }}
                tooltipDataAttrs={(value: any) => {
                    if (!value.date) {
                        return {};
                    }
                    return {
                        'data-tip': `${value.date} has count: ${value.count}`,
                    };
                }}
                showWeekdayLabels={true}
                horizontal={true}
                gutterSize={4}
            />
            <ReactTooltip></ReactTooltip>
        </>
    );
};

const loading = (
    <ContentLoader width={720} height={100} style={{height: '100px'}}>
        <rect x="0" y="10" rx="2" ry="2" width="160" height="100"></rect>
        <rect x="190" y="10" rx="2" ry="2" width="160" height="100"></rect>
        <rect x="370" y="10" rx="2" ry="2" width="160" height="100"></rect>
        <rect x="550" y="10" rx="2" ry="2" width="160" height="100"></rect>
    </ContentLoader>
);

export default (props: ContributionProps) => {
    return props.values
        ?
        <Contribution values={props.values} totalContributionLastYear={props.totalContributionLastYear}></Contribution>
        : loading;
};