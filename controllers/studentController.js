const Student = require("../models/student");

module.exports.userPage = function (req, res) {
  return res.end("User page");
};

module.exports.home = function (req, res) {
  return res.end("Home page");
};

module.exports.addStudent = function (req, res) {
  console.log(req.body);
  const { student, email } = req.body;

  Student.create(
    {
      name: student,
      email: email,
    },
    function (err, newStudent) {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log(newStudent);
        return res.redirect("/");
      }
    }
  );
};

module.exports.deleteStudent = function (req, res) {
  console.log(req.params, "req");
  const { email } = req.params;

  Student.findByIdAndDelete(email, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    return res.redirect("/");
  });
};
