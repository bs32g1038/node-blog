import { css, Global } from '@emotion/core';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import { Text } from '@chakra-ui/core';

const calendarHeatmapCss = () => {
    return '.react-calendar-heatmap text{font-size:10px;fill:#aaa;}.react-calendar-heatmap .react-calendar-heatmap-small-text{font-size:5px;}.react-calendar-heatmap rect:hover{stroke:#555;stroke-width:1px;}.react-calendar-heatmap .color-empty{fill:#eeeeee;}.react-calendar-heatmap .color-filled{fill:#8cc665;}.react-calendar-heatmap .color-github-0{fill:#eeeeee;}.react-calendar-heatmap .color-github-1{fill:#d6e685;}.react-calendar-heatmap .color-github-2{fill:#8cc665;}.react-calendar-heatmap .color-github-3{fill:#44a340;}.react-calendar-heatmap .color-github-4{fill:#1e6823;}.react-calendar-heatmap .color-gitlab-0{fill:#ededed;}.react-calendar-heatmap .color-gitlab-1{fill:#acd5f2;}.react-calendar-heatmap .color-gitlab-2{fill:#7fa8d1;}.react-calendar-heatmap .color-gitlab-3{fill:#49729b;}.react-calendar-heatmap .color-gitlab-4{fill:#254e77;}';
};

const today = new Date();

interface Value {
    year: string;
    month: string;
    date: string;
    count: number;
}

interface ContributionProps {
    values: Value[];
    totalContributionLastYear: number;
}

const Contribution = (props: ContributionProps) => {
    const { values, totalContributionLastYear } = props;
    return (
        <>
            <Text mb={3}>Github {totalContributionLastYear} contributions in the last year</Text>
            <Global
                styles={css`
                    ${calendarHeatmapCss()}
                `}
            />
            <CalendarHeatmap
                startDate={
                    (values[0] && values[0].year + '-' + values[0].month) || new Date().getFullYear() - 1 + '-1-1'
                }
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

export default (props: ContributionProps) => {
    return (
        props.values && (
            <Contribution
                values={props.values}
                totalContributionLastYear={props.totalContributionLastYear}
            ></Contribution>
        )
    );
};
