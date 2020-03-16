import React from 'react';
import { Flex, Box, List, ListItem, Image, Heading, Text, ListIcon } from '@chakra-ui/core';

interface UserInfo {
    name: string;
    location: string;
}

const Header = (props: { userInfo: UserInfo }) => {
    const { userInfo } = props;
    return (
        <Box py={2} maxW="500px" margin="0 auto">
            <List fontSize="14px">
                <ListItem mb={3}>
                    <Flex>
                        <Image
                            border="1px solid #ccc"
                            borderRadius="50%"
                            p="1px"
                            src={require('@blog/client/assets/images/avatar.jpg')}
                            alt="头像"
                            size="24px"
                            mr={2}
                        />
                        <Heading as="h2" fontSize={20}>
                            {userInfo.name}
                            <Text as="span" fontSize="13px" fontWeight="normal" ml={2} color="theme.primaryText">
                                web前端工程师
                            </Text>
                        </Heading>
                    </Flex>
                </ListItem>
                <ListItem mb={3}>
                    <ListIcon icon="email" fill="gray.500" />
                    bs32g1038#163.com
                </ListItem>
                <ListItem mb={3}>
                    <ListIcon icon="check-circle" color="gray.500" />
                    学海无涯苦作舟，梅花香自苦寒来。不断努力，寻找成功的阶梯。
                </ListItem>
                <ListItem>
                    <ListIcon icon="edit" color="gray.500" />
                    本博客是一个技术性博客，主要发布关于web前端以及后端开发的文章。博主专注于web前端开发。喜欢新事物，关注前端动态，对新的技术有追求；涉猎广泛，喜欢
                    coding。
                </ListItem>
            </List>
            {/* <List flex="1 0 auto">
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
            </List> */}
        </Box>
    );
};

export default (props: { userInfo: UserInfo }) => {
    return <Header userInfo={props.userInfo}></Header>;
};
