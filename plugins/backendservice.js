import { ApiService } from '../backend/apiservice'
export default ({ app: { $axios } }, inject) => {
  const apiservice = new ApiService($axios)
  inject('apiservice', apiservice)
}
