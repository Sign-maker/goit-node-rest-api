import { Schema, model, version } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});

contactSchema.post("findOneAndUpdate", handleSaveError);

export const Contact = model("contact", contactSchema);
