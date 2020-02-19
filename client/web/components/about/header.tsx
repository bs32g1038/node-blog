import React from 'react';
import { Flex, Box, List, ListItem, Image, Heading, Text } from '@chakra-ui/core';

interface UserInfo {
    name: string;
    location: string;
}

const Header = (props: { userInfo: UserInfo }) => {
    const { userInfo } = props;
    return (
        <Flex py={2} alignItems="center">
            <Box flex="1 0 auto">
                <Heading as="h2">{userInfo.name}</Heading>
                <Text>web前端工程师</Text>
            </Box>
            <List flex="1 0 auto">
                <ListItem mb={2}>
                    <Text as="strong" mr={2}>
                        Age:
                    </Text>
                    **
                </ListItem>
                <ListItem mb={2}>
                    <Text as="strong" mr={2}>
                        Phone:
                    </Text>
                    185(*^_^*)7248
                </ListItem>
                <ListItem>
                    <Text as="strong" mr={2}>
                        Profession:
                    </Text>
                    计算机科学与技术
                </ListItem>
            </List>
            <List flex="1 0 auto">
                <ListItem mb={2}>
                    <Text as="strong" mr={2}>
                        Profession:
                    </Text>
                    {userInfo.location}
                </ListItem>
                <ListItem mb={2}>
                    <Text as="strong" mr={2}>
                        Email:
                    </Text>
                    bs32g1038@163.com
                </ListItem>
                <ListItem>
                    <Text as="strong" mr={2}>
                        Education:
                    </Text>
                    大学本科
                </ListItem>
            </List>
            <Box>
                <Image
                    border="1px solid #ccc"
                    borderRadius="md"
                    p={1}
                    src={require('../../assets/images/avatar.jpg')}
                    alt="头像"
                    size="90px"
                />
            </Box>
        </Flex>
    );
};

export default (props: { userInfo: UserInfo }) => {
    return <Header userInfo={props.userInfo}></Header>;
};
