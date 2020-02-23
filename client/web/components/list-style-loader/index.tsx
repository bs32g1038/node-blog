import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import Skeleton from '../skeleton';

export default () => {
    return (
        <Box mt={4} mb={4} width="100%">
            <Flex mb={3}>
                <Skeleton width="33.33%" height="20px" mr={4}></Skeleton>
                <Skeleton width="33.33%" height="20px" mr={4}></Skeleton>
                <Skeleton isWidthAnimation={true} width="33,33%" height="20px"></Skeleton>
            </Flex>
            <Flex mb={3}>
                <Skeleton width="25%" height="20px" mr={4}></Skeleton>
                <Skeleton isWidthAnimation={true} width="25%" height="20px" mr={4}></Skeleton>
                <Skeleton width="25%" height="20px" mr={4}></Skeleton>
                <Skeleton width="25%" height="20px"></Skeleton>
            </Flex>
            <Flex mb={3}>
                <Skeleton width="33.33%" height="20px" mr={4}></Skeleton>
                <Skeleton isWidthAnimation={true} width="33.33%" height="20px" mr={4}></Skeleton>
                <Skeleton width="33.33%" height="20px"></Skeleton>
            </Flex>
        </Box>
    );
};
