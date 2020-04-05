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
        alert("Your cart content: \n no item")
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
    let isSame = false
    let x = 0   //Index same
    let isAddCart = confirm("Do you want to add item ?")
    //Apabila user memilih ok, masuk ke bagian ini
    if (isAddCart === true) {
        //Meminta input dari user
        let newItem = prompt("Write your item here").toLowerCase()
        let newQuantity = parseInt(prompt("Write the quantity here"))

        //Cek item yang sama
        for (let i = 0; i < list.length; i++) {
            if (newItem === list[i].item) {
                isSame = true
                x = i
            }
        }

        //Apabila tidak ada item yang sama
        if (isSame === false) {
            //Menyimpan input user ke object : myProduct
            myProduct.item = newItem;
            myProduct.quantity = newQuantity;

            //Mengakses storage dan menyimpan data ke storage
            list.push(myProduct)
            saveData(list)

            //Menampilkan Cart
            showCart(list)
            tangkyou()

            //Apabila ada item yang sama
        } else if (isSame === true) {
            //Konfirmasi ke user untuk lanjut atau tidak
            let isConfirm = confirm(`Warning!\n The item you entered "${list[x].item}" has already in your cart\n Do you want to add the quantity instead?
            \n The quantity of ${list[x].item} = ${list[x].quantity} will become ${list[x].quantity + newQuantity}`)
            //Apabila user ingin lanjut, data akan diupdate
            if (isConfirm === true) {
                list[x].quantity += newQuantity
                saveData(list)
                showCart(list)
                tangkyou()

                //Apabila user tidak ingin lanjut, data tetap sama
            } else if (isConfirm === false) {
                showCart(list)
                tangkyou()
            }
        }
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
        //Apabila nomor item yang dimasukkan sesuai
        if (indexItem <= list.length) {
            let editCart = prompt('Insert edit item name');
            let editQty = parseInt(prompt('Insert your item number'));

            //Menyimpan input user ke object : myProduct
            myProduct.item = editCart;
            myProduct.quantity = editQty;

            //Proses edit: menghapus item pada indexItem-1, menambah item baru pada indexItem-1
            list.splice(indexItem - 1, 1, myProduct);

            //Menyimpan data baru ke storage
            saveData(list);

            //Menampilkan cart
            showCart(list);
            tangkyou()

            //Apabila nomor item yang dimasukkan tidak sesuai
        } else if (indexItem > list.length) {
            alert("The number of item didn't exist")
            tangkyou()
        }

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

        //Apabila nomor item yang dimasukkan sesuai
        if (cartNumber <= list.length) {
            // Menghapus data pada index yang dipilih user
            list.splice(cartNumber - 1, 1);

            // Menyimpan data ke storage
            saveData(list);

            // Menampilkan isi cart
            showCart(list);
            tangkyou()

            //Apabila nomor yang dimasukkan tidak sesuai
        } else if(cartNumber > list.length){
            alert("The number of item didn't exist")
            tangkyou()
        }

        // Apabila user memilih cancel, masuk ke filterCart
    } else if (isDeleteCart === false) {
        filterCart(list)
    }
}

//8 - Memfilter isi cart
let filterCart = list => {
    let isFilterCart = confirm('Do you want to search an item by quantity?')
    let result = []

    if (isFilterCart) {
        let inputQuantity = prompt('Please put the number of quantity that you want to search')

        for (let i = 0; i < list.length; i++) {
            let dataQuantity = list[i].quantity

            if (dataQuantity == inputQuantity) {
                result.push(list[i])
            }
        }

        showCart(result);
        tangkyou()
    } else if (isFilterCart === false) {
        tangkyou()
    }

}
let tangkyou = () => {
    alert(`Thank you for visiting us`)
}

/*C - Main Program*/
mainCart(callStorage())