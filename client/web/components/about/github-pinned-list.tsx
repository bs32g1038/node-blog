import React from 'react';
import siteInfo from '../../config/site-info';
import { ContentLoader } from '../content-loader';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import UiLink from '../ui-link';
import Icon from '../icon';

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
    return (
        <Flex
            bg="theme.blackground"
            flexDirection="column"
            justifyContent="space-between"
            key={item.name}
            width="calc(50% - 8px)"
            p={4}
            mb={2}
        >
            <Box>
                <Flex alignItems="center" mb={2}>
                    <Icon name="repo" fill="theme.primaryText"></Icon>
                    <UiLink ml={2} href={siteInfo.github + '/' + item.name} isExternal={true} flex="1 0 auto">
                        <Heading color="theme.primaryText" fontWeight="normal" as="h3" fontSize="1rem">
                            {item.name}
                        </Heading>
                    </UiLink>
                    <Box>
                        <Icon name="grabber" fill="theme.primaryText"></Icon>
                    </Box>
                </Flex>
                <Text mb={4}>{item.description}</Text>
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
                <UiLink href={siteInfo.github + '/' + item.name + '/stargazers'} mr={3}>
                    <Flex alignItems="center">
                        <Icon name="star" fill="theme.secondaryText" mr={1} />
                        {item.stargazersCount}
                    </Flex>
                </UiLink>
                <UiLink href={siteInfo.github + '/' + item.name + '/network/members'}>
                    <Flex alignItems="center">
                        <Icon name="fork" fill="theme.secondaryText" mr={1} />
                        {item.forkCount}
                    </Flex>
                </UiLink>
            </Flex>
        </Flex>
    );
};

const Loading = () => (
    <ContentLoader width={960} height={150} style={{ height: '150px' }}>
        <rect x="0" y="10" rx="2" ry="2" width="700" height="20"></rect>
        <rect x="0" y="40" rx="2" ry="2" width="860" height="20"></rect>
        <rect x="0" y="70" rx="2" ry="2" width="160" height="20"></rect>
        <rect x="180" y="70" rx="2" ry="2" width="360" height="20"></rect>
        <rect x="560" y="70" rx="2" ry="2" width="200" height="20"></rect>
        <rect x="0" y="100" rx="2" ry="2" width="760" height="20"></rect>
        <rect x="0" y="130" rx="2" ry="2" width="960" height="20"></rect>
    </ContentLoader>
);

export default (props: UserReposProps) => {
    const { userRepos } = props;
    let arr = userRepos;
    if (Array.isArray(props.userRepos) && props.userRepos.length <= 0) {
        arr = new Array(1).fill(null);
    }
    return (
        <>
            <Text mb={3}>Github开源项目</Text>
            <Flex flexWrap="wrap" justifyContent="space-between">
                {arr.map((item: UserRepoItem, index: number) =>
                    item ? (
                        <PinnedListItem item={item} key={item.name}></PinnedListItem>
                    ) : (
                        <Loading key={`PinnedListItem-${index}`}></Loading>
                    )
                )}
            </Flex>
        </>
    );
};
