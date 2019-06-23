export class UserInfo {
    avatarUrl: string;
    bio: string;
    location: string;
    name: string;
    url: string;
}

export class UserRepos {
    description: string;
    forkCount: number;
    language: string;
    name: string;
    stargazersCount: number;
}

export class Contribution {
    count: number;
    day: string;
    month: string;
    year: string;
}

export class UserCommits {
    contribution: Contribution[];
    total: number;
}

export class GetUserDataDto {
    userInfo?: UserInfo;
    userRepos?: UserRepos;
    userCommits?: UserCommits;
}
