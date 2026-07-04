import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "author is required"],
            trim: true,
        },
        url: {
            type: String,
            required: [true, "url is required"],
            trim: true,
            match: [/^https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[^\s]*)?$/i, "invalid URL"],
        },
        likes: Number,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

blogSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
    },
});

export default mongoose.model("Blog", blogSchema);
