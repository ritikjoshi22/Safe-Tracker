const { prop, getModelForClass, modelOptions } = require('@typegoose/typegoose');

@modelOptions({ schemaOptions: { timestamps: true } })
class User {
  @prop({ required: true })
  name;

  @prop({ required: true, unique: true })
  email;

  @prop({ required: true })
  password;

  @prop({ required: true, default: false })
  isAdmin;
}

const UserModel = getModelForClass(User);

module.exports = { UserModel };
