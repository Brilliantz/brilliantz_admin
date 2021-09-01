export default {
    methods: {
        formatDate(t) {
            const d = new Date(t.seconds * 1000)
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            const dd = ('0' + d.getDate()).slice(-2)
            const MM = months[d.getMonth()]
            const yy = d.getFullYear()
            const hh = ('0' + d.getHours()).slice(-2)
            const mm = ('0' + d.getMinutes()).slice(-2)
            const ss = ('0' + d.getSeconds()).slice(-2)
            return `${dd} ${MM} ${yy} ${hh}:${mm}:${ss}`
        },
        formatCurrency(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
        },
    }
}