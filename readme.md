## How to setup

1. Clone/Download repository ini, kemudian buka lewat kode editor.
2. Jalankan **Apache** dan **MySQL** melalui xampp
3. Buatlah sebuah database bernama "prak_tcc_ifa", kemudian import database bernama `prak_tcc_ifa.sql` yang berada pada projek ini ke dalam **MySQL**
4. Masuk ke terminal atau cmd. Pastikan terminal atau cmd berada pada root direktori projek.
5. Install dependency dengan cara mengetik `npm i` di terminal atau cmd, tunggu sampai selesai.
6. Jalankan service dengan cara mengetik `npm run start`

## Dokumentasi

### Todo

GET `/todos`

Response:

Status Code: 200

```
{
  "status": "Success",
  "message": "Berhasil mengambil daftar todo',
  "data": [
    {
      "id": 1,
      "title": "Ini judul",
      "isi": "Ini adalah isinya"
    },
    ...
  ]
}
```

---

GET `/todos/:id`

Response:

Status Code: 200

```
{
  "status": "Success",
  "message": "Berhasil mengambil daftar todo berdasarkan id',
  "data": {
    "id": 1,
    "title": "Ini judul",
    "isi": "Ini adalah isinya"
  },
}
```

---

POST `/todos`

Content-type: application/json

Request Body:

```
{
  "title": "mengerjakan tugas",
  "isi": "mengerjakan tugasnya bagus"
}
```

Response:

Status Code: 201

```
{
  "status": "Success",
  "message": "Berhasil menambahkan todo",
}
```

---

PUT `/todos/:id`

Content-type: application/json

Request Body:

```
{
  "title": "mengerjakan tugas",
  "isi": "mengerjakan tugasnya novrido"
}
```

Response:

Status Code: 201

```
{
  "status": "Success",
  "message": "Berhasil mengubah todo",
}
```

---

DELETE `/todos/:id`

Response:

Status Code: 200

```
{
  "status": "Success",
  "message": "Berhasil menghapus data di dalam todo",
}
```
