import mongoose from "mongoose";

const groundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  availableSports: [{ type: String, required: true }],
  pricePerHour: { type: Number, required: true }, // 0 if free
  availability: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
});

const Ground = mongoose.model("Ground", groundSchema);
export default Ground;
