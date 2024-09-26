const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/student",(req,res)=>{
  res.json("Toni")
})

module.exports = router;
