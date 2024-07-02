export const getTemplate = ({ siteTitle, verifyCode }) => `
<table
    style="width: 100%; transform: scale(0.436667, 0.436667); transform-origin: left top"
    cellpadding="0"
    cellspacing="0"
    border="0"
    min-scale="0.43666666666666665"
>
    <tbody>
        <tr>
            <td align="center">
                <table
                    style="border-radius: 5px; margin: 40px 0; border: 1px solid #eaeaea"
                    cellpadding="40"
                    cellspacing="0"
                    border="0"
                    width="600"
                >
                    <tbody>
                        <tr>
                            <td align="center">
                                <div
                                    style="
                                        font-family:
                                            -apple-system,
                                            BlinkMacSystemFont,
                                            Segoe UI,
                                            Roboto,
                                            Oxygen,
                                            Ubuntu,
                                            Cantarell,
                                            Fira Sans,
                                            Droid Sans,
                                            Helvetica Neue,
                                            sans-serif;
                                        text-align: left;
                                        width: 465px;
                                    "
                                >
                                    <table style="width: 100%" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr>
                                                <td align="center">
                                                    <h1
                                                        style="
                                                            color: black;
                                                            font-size: 24px;
                                                            font-family:
                                                                -apple-system,
                                                                BlinkMacSystemFont,
                                                                Segoe UI,
                                                                Roboto,
                                                                Oxygen,
                                                                Ubuntu,
                                                                Cantarell,
                                                                Fira Sans,
                                                                Droid Sans,
                                                                Helvetica Neue,
                                                                sans-serif;
                                                            font-weight: normal;
                                                            margin: 30px 0;
                                                            padding: 0;
                                                        "
                                                    >
                                                        验证您的电子邮件以注册 <b>${siteTitle}</b>
                                                    </h1>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p
                                        style="
                                            color: black;
                                            font-size: 14px;
                                            font-family:
                                                -apple-system,
                                                BlinkMacSystemFont,
                                                Segoe UI,
                                                Roboto,
                                                Oxygen,
                                                Ubuntu,
                                                Cantarell,
                                                Fira Sans,
                                                Droid Sans,
                                                Helvetica Neue,
                                                sans-serif;
                                            line-height: 24px;
                                        "
                                    >
                                        尊敬的用户您好！我们收到了您的注册尝试，您的邮箱验证码如下：
                                    </p>
                                    <br />
                                    <table style="width: 100%" cellpadding="0" cellspacing="0" border="0">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style="
                                                        font-size: 16px;
                                                        font-family:
                                                            -apple-system,
                                                            BlinkMacSystemFont,
                                                            Segoe UI,
                                                            Roboto,
                                                            Oxygen,
                                                            Ubuntu,
                                                            Cantarell,
                                                            Fira Sans,
                                                            Droid Sans,
                                                            Helvetica Neue,
                                                            sans-serif;
                                                        font-weight: bold;
                                                    "
                                                    height="40"
                                                    bgcolor="#F6F6F6"
                                                    valign="middle"
                                                    align="center"
                                                >
                                                    ${verifyCode}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br />
                                    <p
                                        style="
                                            color: black;
                                            font-size: 14px;
                                            font-family:
                                                -apple-system,
                                                BlinkMacSystemFont,
                                                Segoe UI,
                                                Roboto,
                                                Oxygen,
                                                Ubuntu,
                                                Cantarell,
                                                Fira Sans,
                                                Droid Sans,
                                                Helvetica Neue,
                                                sans-serif;
                                            line-height: 24px;
                                        "
                                    >
                                        请在 5 分钟内进行验证。如果该验证码不为您本人申请，请无视。
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

`;
