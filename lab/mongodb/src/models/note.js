import mongoose from "../db/mongodb.js";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        is_important: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

export const Note = mongoose.model("Note", noteSchema);
