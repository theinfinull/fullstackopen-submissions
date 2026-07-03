import mongoose from "mongoose";

const phonebookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
        },
        number: {
            type: String,
            required: [true, "number is required"],
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

phonebookSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    },
});

export default mongoose.model("PhoneBook", phonebookSchema);
