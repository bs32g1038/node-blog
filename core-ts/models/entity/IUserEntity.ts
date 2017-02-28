interface User {
    nick_name?: string,
    account?: string,
    password?: string,      //密码
    email?: string,         //
    location?: string,      //位置
    qq?: string,            //QQ
    img_url?: string,       //头像
    motto?: string,         //格言
    github?: string,         //格言    
    create_at?: Date,
    update_at?: Date,
}

export default User;