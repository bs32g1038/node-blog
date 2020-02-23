import React from 'react';
import { Icon, IconProps } from '@chakra-ui/core';

interface Props extends IconProps {
    name: any;
}

export default (props: Props) => {
    const _Icon: any = Icon;
    return <_Icon {...props}></_Icon>;
};
