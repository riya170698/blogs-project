const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //createdAt:
    //updatedAt
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

// student{
//     name:"riya",
//     age:"10"
// }
