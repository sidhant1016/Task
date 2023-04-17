var db = require("../models");


const Student = db.Student;

// create
var createStudent = async (req,res)=>{
  const sid = Student.build({name:"aarushi", surname:"jain", gender:"female"})
  console.log(sid instanceof Student);
  console.log(sid.name);
  await sid.save()
  console.log("sid saved to database ");
  console.log(sid.toJSON( ));
  res.status(200).json(sid.toJSON( ))

}


var getStudents =  async(req,res)=>{
  const data = await Student.findAll({})
  res.status(200).json({
    data:data  })

}
var postStudent = async(req,res)=>{
  var postData = req.body;
  const data = await Student.create(postData)
  res.status(200).json({ data:data})
}
var deleteStudent = async(req,res)=>{
  const data = await Student.destroy({
    where:{
      id:req.params.id
    }
  })
    res.status(200).json({ data:data})
}
var updateStudent = async(req,res) =>{
  const data = await Student.update(req.body,{
    where:{
      id:req.params.id
    }
  })
  res.status(200).json({ data:data})

}

module.exports = {
  createStudent,
  getStudents,
  postStudent,
  deleteStudent,
  updateStudent
};


