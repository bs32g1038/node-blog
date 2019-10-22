import React from 'react';
import styled from '@emotion/styled';

const GridContentDiv = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 2px;
`;

export default props => <GridContentDiv>{props.children}</GridContentDiv>;
