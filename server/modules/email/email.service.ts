import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { AppConfigService } from '../app-config/app.config.service';

export interface EmailOptions {
    subject: string;
    text?: string;
    html?: string;
}

@Injectable()
export class EmailService {
    private transporter: Mail;
    constructor(private configService: AppConfigService) {
        this.createTransporter();
    }

    isEnableSmtp() {
        return this.configService.appConfig.isEnableSmtp;
    }

    createTransporter() {
        if (!this.isEnableSmtp()) {
            return;
        }
        this.transporter = nodemailer.createTransport({
            host: this.configService.appConfig.smtpHost,
            secure: this.configService.appConfig.smtpSecure,
            port: this.configService.appConfig.smtpPort,
            auth: {
                user: this.configService.appConfig.smtpAuthUser,
                pass: this.configService.appConfig.smtpAuthpass,
            },
        });
    }

    async updateEmailConfig(data) {
        const config = await this.configService.updateAppConfig(data);
        this.createTransporter();
        return {
            smtpHost: config.smtpHost,
            smtpAuthUser: config.smtpAuthUser,
        };
    }

    // 验证有效性
    verifyClient() {
        if (!this.isEnableSmtp()) {
            return;
        }
        return new Promise(resolve => {
            this.transporter.verify((error, success) => {
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
        const options = Object.assign(mailOptions, {
            from: `"${this.configService.appConfig.siteTitle}" <${this.configService.appConfig.smtpAuthUser}>`,
            to: this.configService.appConfig.smtpAuthUser,
        });
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(options, (error, info) => {
                if (error) {
                    return reject(error);
                }
                resolve(info);
            });
        });
    }
}
