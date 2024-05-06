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

// [PUT] Mengubah suatu todo berdasarkan id
router.put("/:id", async (req, res) => {
  try {
    // mengambil title dan isi dari request body
    const { id } = req.params;
    const { title, isi } = req.body;

    // kalau title/isi kosong atau gaada kolom title/isi di request body
    if (!title || !isi) {
      const msg = `${!title ? "Judul" : "Isi"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401; // 200 (sukses), 400 (error user), 500 (error server)
      throw error;
    }

    // Execute query ke database
    const command = "UPDATE todo SET title = ?, isi = ? WHERE id = ?";
    await connection.promise().query(command, [title, isi, id]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil mengubah todo",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [DELETE] Menghapus suatu todo berdasarkan id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Execute query ke database
    const command = "DELETE FROM todo WHERE id = ?";
    await connection.promise().query(command, [id]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menghapus data di dalam todo",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [GET] Mengambil todo berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // Execute query ke database
    const command = "SELECT * FROM todo WHERE id = ?";
    const [[data]] = await connection.promise().query(command, [id]);

    if (!data) {
      const error = new Error("Todo tidak ditemukan.");
      error.statusCode = 404;
      throw error;
    }

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar todo berdasarkan id " + id,
      data: data,
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
