import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/core';

export default ({ issue }) => {
    return (
        <Box overflow="hidden" fontSize={14}>
            <Flex>
                <Image
                    borderRadius="50%"
                    border="1px solid #ccc"
                    p="1px"
                    mr={2}
                    size={6}
                    mt={2}
                    src={require('@blog/client/assets/images/use.default.avatar.png')}
                ></Image>
                <Text p={2} borderRadius="md">
                    {issue.question}
                </Text>
            </Flex>
            <Flex>
                <Image
                    border="1px solid #ccc"
                    borderRadius="50%"
                    p="1px"
                    src={require('@blog/client/assets/images/avatar.jpg')}
                    alt="头像"
                    size={6}
                    mt={2}
                    mr={2}
                />
                <Text p={2}> {issue.answer}</Text>
            </Flex>
        </Box>
    );
};
