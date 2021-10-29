import React from 'react';
import { EmptyIcon } from '../../icons';
import { Text, Box } from '@chakra-ui/react';
import { rem } from 'polished';

const Empty = () => {
    return (
        <Box textAlign="center">
            <EmptyIcon fill="theme.border" width="150px" height="120px" name="empty"></EmptyIcon>
            <Text fontWeight="bold" color="theme.primaryText" fontSize={rem(16)}>
                ~暂无数据~
            </Text>
        </Box>
    );
};

export default Empty;
