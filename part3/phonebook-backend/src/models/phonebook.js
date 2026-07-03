import mongoose from "mongoose";

const phonebookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
            match: [/^[A-Za-z ]+$/, "name can only contain letters and spaces"],
        },
        number: {
            type: String,
            required: [true, "number is required"],
            unique: true,
            trim: true,
            match: [/^\+?[1-9]\d{6,14}$/, "invalid phone number"],
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
