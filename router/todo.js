// Mengimport package
const express = require("express");
const router = express.Router();
const connection = require("../config/config");

// [GET] Mengambil daftar todo
router.get("/", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM todo";
    const data = await connection.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar todo",
      data: data[0],
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [POST] Memasukkan daftar todo
router.post("/", async (req, res) => {
  try {
    // mengambil title dan isi dari request body
    const { title, isi } = req.body;

    // kalau title/isi kosong atau gaada kolom title/isi di request body
    if (!title || !isi) {
      const msg = `${!title ? "Judul" : "Isi"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO todo (title, isi) VALUES (?, ?)";
    await connection.promise().query(command, [title, isi]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan todo",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

module.exports = router;
