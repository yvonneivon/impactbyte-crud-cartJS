# JavaScript Interaction and Local Storage
Saturday, 05-03-2020

## Index
* A. Global Variable
* B. Functions
    1. Mengakses storage dan mengambil data 
    2. Menyimpan data ke storage  
    3. Menampilkan isi cart ke layar 
    4. Menampilkan home dan fungsi utama
    5. Menambah isi cart 
    6. Mengedit isi cart 
    7. Menghapus isi cart
    8. Memfilter isi cart 
* C. Main Programs

## Urutan Main Program
1. Menampilkan home 
 * Cek isi storage: Ada isinya atau tidak? 
 * (Kosong: buat array kosong) | (Ada isi: buat array "list" dengan isi yang sudah ada)
 * Apakah mau melihat isi cart?
 * (Ya: Perlihatkan isi cart -> Masuk addCart) | (Tidak: Langsung masuk addCart)

2. Masuk addCart => Apakah user ingin menambah data ke cart?
 * (Ya: Masuk ke sistem penambahan data) | (Tidak: Langsung masuk editCart)
 * Ya: masuk ke sistem penambahan data => menerima input nama dan kuantitas
 * Simpan input nama dan kuantitas ke object: myProduct => push ke array "list"
 * Simpan update array "list" ke storage => Perlihatkan isi cart

3. Masuk editCart => Apakah user ingin mengedit data yang ada di cart?
 * (Ya: Masuk ke sistem edit data) | (Tidak: Langsung masuk deleteCart)
 * Ya: masuk ke sistem edit data => menerima input index yang akan diubah, nama     dan kuantitas baru => Simpan input nama dan kuantitas baru di object: myProduct
 * Hapus data sesuai index yang dipilih user => Sisipkan data baru pada index tersebut
 * Simpan update array "list" ke storage => Perlihatkan isi cart

4. Masuk deleteCart => Apakah user ingin menghapus data yang ada di cart?
 * (Ya: Masuk ke sistem hapus data) | (Tidak: Langsung masuk filterCart)
 * Ya: masuk ke sistem hapus data  => menerima input index yang akan dihapus
 * Hapus data sesuai index yang dipilih user
 * Simpan update array "list" ke storage => Perlihatkan isi cart

5. Masuk filterCart => Apakah user ingin menacari quantity item yang sudah di input?
 * (Ya: masuk ke sistem filter) | (Tidak: langsung masuk thanks note, program berakhir)
 * Ya: masuk ke sistem filter data => menerima input quantity yang akan di cari/search
 * Tampilan berupa nama item beserta quantity-nya