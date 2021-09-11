import axios from "./axios";

const Plugins = {
  install: function (Vue) {
    Vue.use(axios)
  }
}
export default Plugins
