// import dayjs from 'dayjs';
// import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { InjectModel } from '@nestjs/mongoose';
// // import { Draft, DraftDocument } from '@blog/server/models/draft.model';

// @Injectable()
// export class DeleteDraftTasksService {
//     constructor(@InjectModel(Draft.name) private readonly draftModel: Model<DraftDocument>) {}

//     @Cron(CronExpression.EVERY_WEEK)
//     async deleteDrafts() {
//         return this.draftModel
//             .find({
//                 updatedAt: {
//                     $lte: dayjs().set('hour', 0).set('minute', 0).set('second', 0).subtract(7, 'days').date(),
//                 },
//             })
//             .then(async (drafts) => {
//                 return this.draftModel.deleteMany({
//                     _id: {
//                         $in: drafts.map((item) => {
//                             return item._id;
//                         }),
//                     },
//                 });
//             });
//     }
// }
