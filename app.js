// Mengimport package
const express = require("express");
const cors = require("cors");
const app = express();
const todoRouter = require("./router/todo");

// Supaya API dapat diakses di domain yang berbeda
app.use(cors());

// Buat ngubah request body yang berupa json ke dalam object
app.use(express.json());

app.use("/todo", todoRouter);

// Menjalankan server di port 3001
app.listen("3001", () => {
  console.log("Server terkoneksi pada port 3001");
});
