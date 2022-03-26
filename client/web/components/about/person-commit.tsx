import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import style from './person-commit.style.module.scss';

interface Value {
    date: string;
    count: number;
}

interface ContributionProps {
    values: Value[];
    totalCountInYear: number;
}

const PersonCommit = (props: ContributionProps) => {
    const { values, totalCountInYear } = props;
    return (
        <div className={style.contribution}>
            <div>
                <h3 className={style.title}>在这一年博主共写作 {totalCountInYear} 篇文章</h3>
                <CalendarHeatmap
                    startDate={new Date().getFullYear() + '-1-1'}
                    endDate={new Date().getFullYear() + 1 + '-1-1'}
                    values={values}
                    classForValue={(value: Value) => {
                        if (!value) {
                            return 'color-empty';
                        }
                        return `color-github-${value.count}`;
                    }}
                    tooltipDataAttrs={(value: Value) => {
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
            </div>
        </div>
    );
};

export default PersonCommit;
