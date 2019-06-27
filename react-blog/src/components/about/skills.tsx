import styled from '@emotion/styled';
import React from 'react';

const SkillList = styled.div`
    display: flex;
     ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
        flex: 1 0 auto;
        width: 50%;
        margin-right: 20px;
        &:last-child {
            margin-right: -20px;
        }
    }
    li {
        padding: 15px 0;
    }
`;

const Skillbar = styled.div`
    position: relative;
    display: block;
    background: #eee;
    height: 30px;
    border-radius: 35px;
    transition: 0.4s linear;
    transition-property: width,background-color;
    .skillbar-title {
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        font-size: 14px;
        color: #ffffff;
        border-radius: 35px;
        &.html5 {
            background: linear-gradient(to right, #ff0066 0%, #9b6d92 100%);
            width: 80%;
        }
        &.css3 {
            background: linear-gradient(to right, #08adc2 0%, #ff00cc 100%);
            width: 85%
        }
        &.mongodb {
            background: linear-gradient(to right, #7fdf83 0%, #95c097 100%);
            width: 70%
        }
        &.javascript {
            background: linear-gradient(to right, #b2694e 0%, #c4aba2 100%);
            width: 85%
        }
        &.nodejs {
            background: linear-gradient(to right, #7a0fbe 0%, #7632a1 100%);
            width: 75%
        }
        &.git{
            background: linear-gradient(to right, #dbc92c 0%, #918734 100%); 
            width: 70%;
        }
    }
    .skillbar-title span {
        display: block;
        background: rgba(0, 0, 0, 0.15);
        padding: 0 20px;
        height: 30px;
        line-height: 30px;
        border-radius: 35px;
    }
    .skill-bar-percent {
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        color: #ffffff;
        color: rgba(0, 0, 0, 0.5);
    }
`;

const C = () => {
    return (
        <>
            <p>Skills</p>
            <SkillList>
                <ul>
                    <li className="border-line-h">
                        <Skillbar>
                            <div className="skillbar-title html5">
                                <span>HTML5</span>
                            </div>
                            <div className="skill-bar-percent">80%</div>
                        </Skillbar>
                    </li>
                    <li className="border-line-h">
                        <Skillbar>
                            <div className="skillbar-title css3">
                                <span>CSS3</span>
                            </div>
                            <div className="skill-bar-percent">85%</div>
                        </Skillbar>
                    </li>
                    <li className="border-line-h">
                        <Skillbar>
                            <div className="skillbar-title mongodb">
                                <span>MONGODB</span>
                            </div>
                            <div className="skill-bar-percent">70%</div>
                        </Skillbar>
                    </li>
                </ul>
                <ul>
                    <li className="border-line-h">
                        <Skillbar>
                            <div className="skillbar-title javascript" >
                                <span>JAVASCRIPT</span>
                            </div>
                            <div className="skill-bar-percent">85%</div>
                        </Skillbar>
                    </li>
                    <li className="border-line-h">
                        <Skillbar>
                            <div className="skillbar-title nodejs">
                                <span>NODEJS</span>
                            </div>
                            <div className="skill-bar-percent">75%</div>
                        </Skillbar>
                    </li>
                    <li className="border-line-h">
                        <Skillbar>
                            <div className="skillbar-title git" >
                                <span>GIT</span>
                            </div>
                            <div className="skill-bar-percent">70%</div>
                        </Skillbar>
                    </li>
                </ul>
            </SkillList>
        </>
    );
};

export default () => {
    return <C></C>;
};