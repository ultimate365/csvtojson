// Node packages for file system
const fs = require("fs");
const path = require("path");
const express = require("express");

// var filePath = path.join(__dirname, "../school.csv");
// Read CSV
const convertCsvtoJson = async (filePath, filename) => {
  let uploadedFilePath = path.join(__dirname, `../uploads/${filePath}`);
  let result = await fs.readFile(
    uploadedFilePath,
    { encoding: "utf-8" },
    function (err, data) {
      if (err) {
        console.log(err);
        return;
      }
      let f = data.split("\n");

      headers = f.shift().split(",");
      let json = [];
      f.forEach(function (d) {
        // Loop through each row
        tmp = {};
        row = d.split(",");
        for (let i = 0; i < headers.length; i++) {
          tmp[headers[i]] = row[i];
        }
        // Add object to list
        json.push(tmp);
      });

      return JSON.stringify(json);
    }
  );
  return result;
};

module.exports = convertCsvtoJson;
