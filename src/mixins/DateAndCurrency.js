export default {
    methods: {
        formatDate(t) {
            const d = new Date(t.seconds * 1000)
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            const dd = d.getDate()
            const MM = months[d.getMonth()]
            const yy = d.getFullYear()
            const hh = d.getHours()
            const mm = d.getMinutes()
            const ss = d.getSeconds()
            return `${dd} ${MM} ${yy} ${hh}:${mm}:${ss}`
        },
        formatCurrency(x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
        },
    }
}