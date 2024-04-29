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

    // Mengirimkan response
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar todo",
      data: data[0],
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [POST] Memasukkan daftar todo
router.post("/", async (req, res) => {
  try {
    const { title, isi } = req.body;

    // kalau title-nya kosong atau gaada kolom title di request body
    if (title == "" || title == null) {
      const error = new Error("Judul gabole kosong");
      error.statusCode = 401;
      throw error;
    }

    // kalau isinya kosong atau gaada kolom isi di request body
    if (isi == "" || isi == null) {
      const error = new Error("Isi gabole kosong");
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO todo (title, isi) VALUES (?, ?)";
    await connection.promise().query(command, [title, isi]);

    // Mengirimkan response
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan todo",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

module.exports = router;
