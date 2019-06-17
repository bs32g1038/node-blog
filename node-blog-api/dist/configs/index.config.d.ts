declare const _default: {
    server: {
        debug: boolean;
        hostname: string;
        port: string;
    };
    db: {
        uri: string;
        options: {
            user: string;
            pass: string;
        };
    };
    token_secret_key: string;
    user: {
        nickName: string;
        email: string;
        location: string;
    };
    rss: {
        title: string;
        link: string;
        language: string;
        description: string;
        max_rss_items: number;
    };
    max_comment_per_day: number;
    max_guestbook_per_day: number;
    github_secret_key: string;
};
export default _default;
