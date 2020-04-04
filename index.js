/****************************************************************************************************/
/* Javascript Web Interaction and Local Storage                                                     */
/* Friday, 04-03-2020                                                                               */
/* index :                                                                                          */
/*      A - Global Variable                                                                         */
/*      B - Functions                                                                               */
/*          1 - Mengakses storage dan mengambil data                                                */
/*          2 - Menyimpan data ke storage                                                           */
/*          3 - Menampilkan isi cart ke layar                                                       */
/*          4 - Menampilkan home dan fungsi utama                                                   */
/*          5 - Menambah isi cart                                                                   */
/*          6 - Mengedit isi cart                                                                   */
/*          7 - Menghapus isi cart                                                                  */
/*          8 - Memfilter isi cart                                                                  */
/*      C - Main Programs                                                                           */
/*                                                                                                  */
/* Urutan main programs :                                                                           */
/*      1 - Menampilkan home => Cek isi storage: Ada isinya atau tidak?                             */
/*          => (Kosong: buat array kosong) | (Ada isi: buat array "list" dengan isi yang sudah ada) */
/*          => Apakah mau melihat isi cart?                                                         */
/*          => (Ya: Perlihatkan isi cart -> Masuk addCart) | (Tidak: Langsung masuk addCart)        */
/*      2 - Masuk addCart => Apakah user ingin menambah data ke cart?                               */
/*          => (Ya: Masuk ke sistem penambahan data) | (Tidak: Langsung masuk editCart)             */
/*          => Ya: masuk ke sistem penambahan data => menerima input nama dan kuantitas             */
/*          => Simpan input nama dan kuantitas ke object: myProduct => push ke array "list"         */
/*          => Simpan update array "list" ke storage => Perlihatkan isi cart                        */
/*      3 - Masuk editCart => Apakah user ingin mengedit data yang ada di cart?                     */
/*          => (Ya: Masuk ke sistem edit data) | (Tidak: Langsung masuk deleteCart)                 */
/*          => Ya: masuk ke sistem edit data => menerima input index yang akan diubah, nama dan     */
/*             kuantitas baru => Simpan input nama dan kuantitas baru di object: myProduct          */
/*          => Hapus data sesuai index yang dipilih user => Sisipkan data baru pada index tersebut  */
/*          => Simpan update array "list" ke storage => Perlihatkan isi cart                        */
/*      4 - Masuk deleteCart => Apakah user ingin menghapus data yang ada di cart?                  */
/*          => (Ya: Masuk ke sistem hapus data) | (Tidak: Langsung masuk filterCart)                */
/*          => Ya: masuk ke sistem hapus data  => menerima input index yang akan dihapus            */
/*          => Hapus data sesuai index yang dipilih user                                            */
/*          => Simpan update array "list" ke storage => Perlihatkan isi cart                        */
/*      5 - Masuk filterCart                                                                        */
/****************************************************************************************************/


/*A - Global variable*/
//Membuat object : myProduct
let myProduct = new Object();

/*B - Functions*/
//1 - Mengakses Storage dan mengambil data
let callStorage = () => {
    //Mengakses local storage, apabila tidak ada data sebelumnya, mengembalikan array kosong
    if (localStorage.getItem(`cart`) === null) {
        return []

        //Apabila sudah ada data pada local storage, mengembalikan array berisi data tersebut
    } else {
        return JSON.parse(localStorage.getItem(`cart`))
    }
}

//2 - Menyimpan data ke storage
let saveData = list => {
    localStorage.setItem(`cart`, JSON.stringify(list))
}

//3 - Menampilkan isi cart ke layar
let showCart = cart => {
    let cartResult = "";
    // Apabila terdapat data pada cart
    if (cart.length != 0) {
        cartResult += "Your cart content:\n"
        for (let index = 0; index < cart.length; index++) {
            cartResult += `${index + 1}. Item : ${cart[index].item}, Quantity : ${cart[index].quantity} \n`;
        }
        alert(cartResult);

        // Apabila tidak ada data pada cart
    } else {
        alert("Your cart is empty")
    }
};

//4 - Menampilkan home dan fungsi utama
let mainCart = list => {
    alert("Welcome to Our Marketplace");
    let isShowCart = confirm("Do you want to see your cart ?");
    // Apabila user memilih ok, masuk ke bagian ini
    if (isShowCart === true) {
        showCart(list);
        addCart(list);

        // Apabila user memilih cancel, langsung masuk ke addCart
    } else if (isShowCart === false) {
        addCart(list);
    }
};

//5 - Menambahkan isi cart
let addCart = list => {
    let isAddCart = confirm("Do you want to add item ?")
    //Apabila user memilih ok, masuk ke bagian ini
    if (isAddCart === true) {
        //Meminta input dari user
        let newItem = prompt("Write your item here")
        let newQuantity = prompt("Write the quantity here")

        //Menyimpan input user ke object : myProduct
        myProduct.item = newItem;
        myProduct.quantity = newQuantity;

        //Mengakses storage dan menyimpan data ke storage
        list.push(myProduct)
        saveData(list)

        //Menampilkan Cart
        showCart(list)

        //Apabila user memilih cancel, masuk ke pilihan editCart
    } else if (isAddCart === false) {
        editCart(list)
    }
}

//6 - Mengedit isi cart
let editCart = list => {
    let isEditCart = confirm('Do you want to edit?');
    //Apabila user memilih ok, masuk ke bagian ini
    if (isEditCart === true) {
        //Meminta input dari user
        let indexItem = prompt('Select item number');
        let editCart = prompt('Insert edit item name');
        let editQty = prompt('Insert your item number');

        //Menyimpan input user ke object : myProduct
        myProduct.item = editCart;
        myProduct.quantity = editQty;

        //Proses edit: menghapus item pada indexItem-1, menambah item baru pada indexItem-1
        list.splice(indexItem - 1, 1, myProduct);

        //Menyimpan data baru ke storage
        saveData(list);

        //Menampilkan cart
        showCart(list);

        //Apabila user memilih cancel, masuk ke pilihan deleteCart
    } else if (isEditCart === false) {
        deleteCart(list);
    }
};

//7 - Menghapus isi cart
let deleteCart = list => {
    let isDeleteCart = confirm(`Do you want to delete cart?`)
    // Apabila user memilih ok, masuk ke bagian ini
    if (isDeleteCart === true) {
        // Menerima input index dari user
        let cartNumber = prompt(`Write cart number`);

        // Menghapus data pada index yang dipilih user
        list.splice(cartNumber - 1, 1);

        // Menyimpan data ke storage
        saveData(list);

        // Menampilkan isi cart
        showCart(list);

        // Apabila user memilih cancel, masuk ke filterCart
    } else if (isDeleteCart === false) {
        filterCart(list)
    }
}

//8 - Memfilter isi cart

let filterCart = list => {
    let isFilterChart = confirm('Do you want to search of an item by quantity?')
    let result =[]
    
    if (isFilterChart) {
        let inputQuantity = prompt('Please put the number of quantity that you want to search')
        
        for (let i = 0; i < list.length; i++) {
            let dataQuantity = list[i].quantity
            
            if (dataQuantity == inputQuantity) {
                result.push(list[i])
            }
        }
        
        
        if (result.length === 0) {
            result = 'The item is not found'
        }
        
        showCart(result);
    }

}

/*C - Main Program*/
mainCart(callStorage())

//TEST//