interface Guestbook {
    nick_name?: string,
    email?: string,
    content?: string,
    reply_content?: string,
    create_at?: Date,
    pass?: boolean,
    deleted?: boolean
}

export default Guestbook;