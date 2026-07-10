import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            trim: true,
            unique: true,
        },
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    },
});

export default mongoose.model("User", userSchema);
