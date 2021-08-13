export default {
  required: (field) => [
    v => !!v || `${field} tidak boleh kosong`
  ],
  email: [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid',
  ],
  name: [
    v => !!v || 'Name is required',
  ],
  password: [
    v => v.length >= 8 || 'Password min 8 character length',
    v => !!v || 'Password is required',
  ],
  number: (field) => [
    v => !!v || `${field} is required`,
    v => Number.isInteger(Number(v)) || `${field} must be number`
      ]
}
