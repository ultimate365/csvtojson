const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const csvtojson = require("../controllers/controller");

router.get("/", (req, res) => {
  return res.render("index");
});
router.post("/", (req, res) => {
  res.status(200).json({ message: "Hello POST request!" });
  console.log(req.body);
});
router.post("/submit-file", upload.single("csvfile"), async (req, res) => {
  try {
    await csvtojson(req.file.filename, req.file.originalname)
      .then(async (result) => {
        res.status(200).json(result);
        let uploadedFilePath = path.join(
          __dirname,
          `../uploads/${req.file.filename}`
        );
        await fs.unlink(uploadedFilePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
