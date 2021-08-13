import axios from "./axios";
import Ziggy from "@/plugins/ziggy";

const Plugins = {
  install: function (Vue) {
    Vue.use(axios)
    Vue.use(Ziggy)
  }
}
export default Plugins
