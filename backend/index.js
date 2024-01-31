const express = require("express");
const app = express();
const cors = require("cors");
const {exec} = require("child_process");
const fileUpload = require("express-fileupload");
const path = require('path');

app.use(cors({
    origin: "*",
}))

app.use(fileUpload());

const utilsFolderPath = path.join(__dirname, 'utils');

app.post("/upload", (req, res) => {
    if(!req.files){
        return res.status(400).send("No files uploaded");
    }

    const file = req.files.file;
    const filePath = path.join(__dirname, 'uploads', file.name);

    file.mv(filePath, (err) => {
        if(err){
            return res.status(500).send(err);
        }

        const modelScriptPath = path.join(utilsFolderPath, 'model.py');

        exec(`python "${modelScriptPath}" "${filePath}"`, (err, stdout, stderr) => {
            if (err) {
                return res.status(500).send(err.message);
              }

              res.send(stdout);
        })
    })
})

const PORT = 8001;

app.listen(PORT, () => {
    console.log("Server is running on Port", PORT);
})