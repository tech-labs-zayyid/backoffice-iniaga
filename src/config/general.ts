

export default {
    generalInput: {
        required: true,
        message: 'harus diisi'
    },
    emailInput: {
        type: "email",
        message: "format email salah",
    },
    numberInput: {
        pattern: new RegExp(/^[0-9]*$/),
        message: "tidak boleh memasukan selain angka",
    },
    urlInput: {
        whitespace: true,
        message: "format url tidak valid",
        type: "url",
    },
    pagination: {
        limit: 10,
        page: 1
    }
}