import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import Skeleton from '../skeleton';

export default () => {
    return (
        <Flex px={4} mt={4} mb={4} width="100%" alignItems="center">
            <Box mr={[0, 4]} flex="1 0 auto" maxWidth="100%">
                <Skeleton width="75%" height="25px" mb={3}></Skeleton>
                <Flex mb={3} alignItems="center">
                    <Skeleton width="150px" height="15px"></Skeleton>
                    <Skeleton width="5px" height="5px" borderRadius="50%" mx={2}></Skeleton>
                    <Skeleton width="28px" height="15px"></Skeleton>
                    <Skeleton width="5px" height="5px" borderRadius="50%" mx={2}></Skeleton>
                    <Skeleton width="60px" height="15px"></Skeleton>
                    <Skeleton width="5px" height="5px" borderRadius="50%" mx={2}></Skeleton>
                    <Skeleton width="60px" height="15px"></Skeleton>
                </Flex>
                <Skeleton width="100%" height="50px" mb={3}></Skeleton>
                <Flex alignItems="center">
                    <Skeleton width="16px" height="16px" mr={3}></Skeleton>
                    <Skeleton width="40px" height="15px" mr={3}></Skeleton>
                    <Skeleton width="40px" height="15px" mr={3}></Skeleton>
                    <Skeleton width="40px" height="15px" mr={3}></Skeleton>
                </Flex>
            </Box>
            <Box display={['none', 'block']}>
                <Skeleton width="150px" height="100px" mb={5}></Skeleton>
                <Skeleton width="150px" height="10px"></Skeleton>
            </Box>
        </Flex>
    );
};
