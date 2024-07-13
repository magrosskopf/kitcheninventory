// global.d.ts
import mongoose from "mongoose";

declare global {
  var mongoose: {
    models: any;
    model<T>(
      arg0: string,
      UserSchema: mongoose.Schema<
        any,
        mongoose.Model<any, any, any, any, any, any>,
        {},
        {},
        {},
        {},
        mongoose.DefaultSchemaOptions,
        { [x: string]: unknown },
        mongoose.Document<
          unknown,
          {},
          mongoose.FlatRecord<{ [x: string]: unknown }>
        > &
          mongoose.FlatRecord<{ [x: string]: unknown }> &
          Required<{ _id: unknown }>
      >,
    ): mongoose.Model<
      UserDocument,
      {},
      {},
      {},
      mongoose.Document<unknown, {}, UserDocument> &
        UserDocument & { _id: mongoose.Types.ObjectId },
      any
    >;
    conn: mongoose.Connection | typeof import('mongoose');
    promise: Promise<mongoose.Connection> | typeof import('mongoose');
  };
}
