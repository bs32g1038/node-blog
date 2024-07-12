import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { DynamicConfigService } from './dynamic.config.service';
import { getClientIp } from '@blog/server/utils/helper';
import { Request } from 'express';
import { md5 } from '@blog/server/utils/crypto.util';

export interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail | undefined;
    constructor(private configService: DynamicConfigService) {}

    isEnableSmtp() {
        return this.configService.config.isEnableSmtp;
    }

    createTransporter() {
        if (!this.isEnableSmtp()) {
            return;
        }
        this.transporter = nodemailer.createTransport({
            host: this.configService.config.smtpHost,
            secure: this.configService.config.smtpSecure,
            port: this.configService.config.smtpPort,
            auth: {
                user: this.configService.config.smtpAuthUser,
                pass: this.configService.config.smtpAuthpass,
            },
        });
    }

    // 验证有效性
    verifyClient() {
        if (!this.isEnableSmtp()) {
            return;
        }
        this.createTransporter();
        return new Promise((resolve) => {
            this.transporter?.verify((error, success) => {
                if (error) {
                    return resolve(error);
                }
                resolve(success);
            });
        });
    }

    // 发邮件
    sendMail(mailOptions: EmailOptions) {
        if (!this.isEnableSmtp()) {
            return;
        }
        this.createTransporter();
        const options = Object.assign(mailOptions, {
            from: `"${this.configService.config.siteTitle}" <${this.configService.config.smtpAuthUser}>`,
            to: mailOptions.to,
        });
        return new Promise((resolve, reject) => {
            this.transporter?.sendMail(options, (error, info) => {
                if (error) {
                    return reject(error);
                }
                resolve(info);
            });
        });
    }

    /**
     * 获取缓存key
     */
    getEmailCodeCacheKey(request: Request) {
        const ip = getClientIp(request);
        const userAgent = request.headers['user-agent'];
        const key = 'user-service:captcha:' + md5(ip + userAgent);
        return key;
    }
}
