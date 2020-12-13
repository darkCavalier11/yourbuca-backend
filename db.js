import mongoose from "mongoose";
const url =
  "mongodb+srv://yourbuca:G4bXYBC2B6x6hQD@cluster0.0o8zi.mongodb.net/youbuca?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 3,
  },
  email: {
    required: true,
    type: String,
    max: 120,
    min: 0,
  },
  DOB: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
    unique: true,
    validate(value) {
      if (String(value).length !== 10) {
        throw new Error("Invalid contact number");
      } else {
        return true;
      }
    },
  },
  password: {
    required: true,
    type: String,
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
