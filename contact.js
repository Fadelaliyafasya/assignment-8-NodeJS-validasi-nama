//contact.js
const fs = require("fs");
const validator = require("validator");

// Membuat folder jika belum ada
const lokasiDirr = "./data";
if (!fs.existsSync(lokasiDirr)) {
  fs.mkdirSync(lokasiDirr);
}

//membuat file contacts.json jika belum ada
const filePath = `./data/contacts.json`;
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "[]", "utf-8");
}

//Membaca file JSON
const file = fs.readFileSync(filePath, "utf8");
const contacts = JSON.parse(file);

//menyimpan data ke JSON
const saveContact = (nama, mobile, email) => {
  // Membuat objek "contact" dengan data yang sudah dikumpulkan sebelumnya.
  const contact = { nama, mobile, email };

  const duplicateName = contacts.find((contact) => contact.nama === nama);
  if (duplicateName) {
    console.log(
      "Maaf, nama yang Anda pilih sudah terpakai. Tolong coba dengan nama lain!!"
    );
    return false;
  }

  //validasi email user
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email yang dimasukan Invalid!!");
      return false;
    }
  }

  // validasi nomor handphone user
  if (mobile) {
    if (!validator.isMobilePhone(mobile, "id-ID")) {
      console.log("Nomor yang dimasukan Invalid!!");
      return false;
    }
  }

  //menambah kontak baru
  contacts.push(contact);

  //menyimpan data yang sudah diperbarui
  fs.writeFileSync(filePath, JSON.stringify(contacts));
  console.log("Terima kasih, data sudah tersimpan!!");
};

module.exports = { saveContact };
