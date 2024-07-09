import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { getMongooseModule } from '../mongoose';

@Schema({
    timestamps: true,
    collection: 'config',
})
export class DynamicConfig {
    @Prop({ unique: true, select: false })
    key!: string;

    @Prop({ MaxLength: 200, default: '', trim: true })
    siteTitle!: string;

    @Prop({ MaxLength: 1024 * 100, default: '', trim: true })
    siteLogo!: string;

    @Prop({ MaxLength: 2000, default: '', trim: true })
    siteMetaKeyWords!: string;

    @Prop({ MaxLength: 2000, default: '', trim: true })
    siteMetaDescription!: string;

    @Prop({ MaxLength: 100, default: '', trim: true })
    siteIcp!: string;

    @Prop({ MaxLength: 100, default: '', trim: true })
    siteDomain!: string;

    /**
     * 邮箱通知服务配置
     */
    @Prop({ default: false, trim: true })
    isEnableSmtp!: boolean;

    @Prop({ MaxLength: 100, default: '', trim: true })
    smtpHost!: string;

    @Prop({})
    smtpPort!: number;

    @Prop({ default: false, trim: true })
    smtpSecure!: boolean;

    @Prop({ MaxLength: 100, default: '', trim: true })
    smtpAuthUser!: string;

    @Prop({ MaxLength: 100, default: '', trim: true })
    smtpAuthpass!: string;

    @Prop({ MaxLength: 100, default: '', trim: true })
    git!: string;

    @Prop({ MaxLength: 100, default: '', trim: true })
    githubClientId!: string;

    @Prop({ MaxLength: 100, default: '', trim: true })
    githubClientSecret!: string;

    @Prop({ MaxLength: 100, default: '', trim: true })
    email!: string;
}

export type DynamicConfigDocument = HydratedDocument<DynamicConfig>;

export type IDynamicConfigModel = Model<DynamicConfigDocument>;

export const DynamicConfigSchema = SchemaFactory.createForClass(DynamicConfig);

export const DynamicConfigModelModule = getMongooseModule(DynamicConfig.name, DynamicConfigSchema);
