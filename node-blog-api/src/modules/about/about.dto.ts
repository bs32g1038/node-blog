export interface UserInfo {
    avatarUrl: string;
    bio: string;
    location: string;
    name: string;
    url: string;
}

export interface UserRepos {
    description: string;
    forkCount: number;
    language: string;
    name: string;
    stargazersCount: number;
}

export interface Contribution {
    count: number;
    day: string;
    month: string;
    year: string;
}

export interface UserCommits {
    contribution: Contribution[];
    total: number;
}

export class GetUserDataDto {
    userInfo?: UserInfo;
    userRepos?: UserRepos;
    userCommits?: UserCommits;
}
