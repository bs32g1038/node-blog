import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import UiLink from '../ui-link';
import Icon from '../icon';
import { useSelector } from 'react-redux';
import { RootState } from '@blog/client/redux/store';

interface UserRepoItem {
    name: string;
    language: string;
    forkCount: number;
    description: string;
    stargazersCount: number;
}

interface UserReposProps {
    userRepos: UserRepoItem[];
}

const PinnedListItem = (props: { item: UserRepoItem }) => {
    const { item } = props;
    const config = useSelector((state: RootState) => state.app.config);
    return (
        <Flex
            bg="theme.blackground"
            flexDirection="column"
            justifyContent="space-between"
            key={item.name}
            width={['calc(100% - 8px)', 'calc(33.33% - 8px)']}
            p={4}
            mb={2}
            borderRadius="sm"
        >
            <Box>
                <Flex alignItems="center" mb={2}>
                    <Icon name="repo" fill="theme.primaryText"></Icon>
                    <UiLink ml={1} href={config.github + '/' + item.name} isExternal={true} flex="1 0 auto">
                        <Heading color="theme.primaryText" fontWeight="normal" as="h3" fontSize="1rem">
                            {item.name}
                        </Heading>
                    </UiLink>
                    <Icon name="grabber" fill="theme.primaryText"></Icon>
                </Flex>
                <Text mb={4} fontSize={13}>
                    {item.description}
                </Text>
            </Box>
            <Flex alignItems="center" fontSize={13}>
                <Text as="span" mr={3} color="theme.secondaryText">
                    <Box
                        as="span"
                        display="inline-block"
                        borderRadius="50%"
                        width="12px"
                        height="12px"
                        bg="gray.500"
                        mr={1}
                        position="relative"
                        top="1px"
                    ></Box>
                    <span>{item.language}</span>
                </Text>
                <UiLink href={config.github + '/' + item.name + '/stargazers'} mr={3}>
                    <Flex alignItems="center">
                        <Icon name="star" fill="theme.secondaryText" mr={1} />
                        {item.stargazersCount}
                    </Flex>
                </UiLink>
                <UiLink href={config.github + '/' + item.name + '/network/members'}>
                    <Flex alignItems="center">
                        <Icon name="fork" fill="theme.secondaryText" mr={1} />
                        {item.forkCount}
                    </Flex>
                </UiLink>
            </Flex>
        </Flex>
    );
};

export default (props: UserReposProps) => {
    const { userRepos } = props;
    let arr = userRepos;
    if (Array.isArray(props.userRepos) && props.userRepos.length <= 0) {
        arr = new Array(1).fill(null);
    }
    return (
        <>
            {/* <Text mb={3}>Github开源项目</Text> */}
            <Flex flexWrap="wrap" justifyContent="space-between">
                {arr.map((item: UserRepoItem) => (
                    <PinnedListItem item={item} key={item.name}></PinnedListItem>
                ))}
            </Flex>
        </>
    );
};
