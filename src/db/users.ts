import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required : true},
    email: { type: String, required : true},
    authentication: {
        password: { type: String, required: true, select: false},
        salt: { type: String, select: false},
        sessionToken: { type: String, select: false},
    },
});

// Membuat user model dengan menggunakan skema UserSchema
export const UserModel = mongoose.model('User', UserSchema);

// Mendapatkan semua user dari koleksi users dalam database MongoDB menggunakan UserModel
// Method find = mengembalikan data yang ada di DB dalam bentuk array
export const getUsers = () => UserModel.find();

// Mendapatkan user berdasarkan alamat email yang diberikan dari koleksi users dalam DB menggunakan model UserModel
// Method findOne = mengembalikan data pertama yang ditemukan  yang sesuai dengan kriteria yang di inginkan
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// Mencari dokumen user dimana nilai properti "authentication.sessionToken" sesuai dengan nilai token yang diberikan
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

// Mencari user berdasarkan parameter id yang di kirimkan
export const getUserById = (id: string) => UserModel.findById(id);

// Membuat user baru dengan mengirimkan parameter values yang fungsinya menerima objek dengan properti nilai (eg: username, email, etc)
// Method save() untuk menyimpan objek baru dalam koleksi users dalam DB
// Method toObject() untuk mengonversi objek Mongoose menjadi bentuk yang langsung dapat digunakan dan dimanipulasi dalam aplikasi
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

// Menghapus user dari koleksi users dalam DB menggunakan UserModel sesuai dengan id yang dikirimkan
export const deleteUSer = (id: string) => UserModel.findOneAndDelete({ _id: id});

// Memperbarui / mengupdate data user dari koleksi users dalam DB menggunakan UserModel sesuai dengan id yang dikirimkan
export const updateUser = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
