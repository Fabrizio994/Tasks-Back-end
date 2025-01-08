import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      default: null, //nessuna data di scadenza di default
    },
    priority: {
      // Priorità opzionale
      type: String,
      enum: ["low", "medium", "high"], // Valori possibili
      default: "medium", //priorità media di default
    },
    notes: {
      // Note opzionali
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const taskSchemaModel = mongoose.model("Task", taskSchema);
