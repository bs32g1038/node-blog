import styled from '@emotion/styled';
import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import { Box, Text } from '@chakra-ui/react';

const calendarHeatmapCss = () => {
    return '.react-calendar-heatmap text{font-size:10px;fill:#aaa;}.react-calendar-heatmap .react-calendar-heatmap-small-text{font-size:5px;}.react-calendar-heatmap rect:hover{stroke:#555;stroke-width:1px;}.react-calendar-heatmap .color-empty{fill:#eeeeee;}.react-calendar-heatmap .color-filled{fill:#8cc665;}.react-calendar-heatmap .color-github-0{fill:#eeeeee;}.react-calendar-heatmap .color-github-1{fill:#d6e685;}.react-calendar-heatmap .color-github-2{fill:#8cc665;}.react-calendar-heatmap .color-github-3{fill:#44a340;}.react-calendar-heatmap .color-github-4{fill:#1e6823;}.react-calendar-heatmap .color-gitlab-0{fill:#ededed;}.react-calendar-heatmap .color-gitlab-1{fill:#acd5f2;}.react-calendar-heatmap .color-gitlab-2{fill:#7fa8d1;}.react-calendar-heatmap .color-gitlab-3{fill:#49729b;}.react-calendar-heatmap .color-gitlab-4{fill:#254e77;}';
};

const Wrap = styled(Box)`
    ${calendarHeatmapCss}
`;

interface Value {
    date: string;
    count: number;
}

interface ContributionProps {
    values: Value[];
    totalCountInYear: number;
}

const PersonCommit =  (props: ContributionProps) => {
    const { values, totalCountInYear } = props;
    return (
        <Box min-height="180.88px" overflow="hidden">
            <Wrap animation="slideInUp .2s">
                <Text mb={3}>在这一年博主共写作 {totalCountInYear} 篇文章</Text>
                <CalendarHeatmap
                    startDate={new Date().getFullYear() + '-1-1'}
                    endDate={new Date().getFullYear() + 1 + '-1-1'}
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
                {props.values[0] && <ReactTooltip></ReactTooltip>}
            </Wrap>
        </Box>
    );
};

export default PersonCommit