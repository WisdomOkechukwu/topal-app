export class ApiService {
  constructor($axios) {
    this.$axios = $axios
  }

  // async getRecommendations () {
  //   return this.$axios.get('/api/recommendations')
  // }
  async listbusiness(param) {
    return await this.$axios.post(`admin/business/listbusinesses`, param)
  }

  async forgotpassword(param) {
    return await this.$axios.post(`customerauth/forgot-password`, param)
  }

  async loancalculator(param) {
    return await this.$axios.post(`loan/calculate`, param)
  }

  async loanapply(param) {
    return await this.$axios.post(`loan/apply`, param)
  }

  async loanPartPayment(param) {
    return await this.$axios.post(`loan/repayment/part`, param)
  }

  async fundinInitation(param) {
    return await this.$axios.post(`wallet/deposit/initiate`, param)
  }

  async fundReload(param) {
    return await this.$axios.get(
      `wallet/deposit/finalize?customer_id=${param.customer_id}&reference_id=${param.reference_id}`,
      param
    )
  }

  async initiateTransfer(param) {
    return await this.$axios.post(`wallet/withdrawal/initiate`, param)
  }

  async confirmTransfer(param) {
    return await this.$axios.post(`wallet/withdrawal/verify`, param)
  }

  async initateSavings(param) {
    return await this.$axios.post(`saving/initiate`, param)
  }

  async completeSavings(param) {
    return await this.$axios.post(`saving/start`, param)
  }

  async buyAirtime(param) {
    return await this.$axios.post(`baxi/airtime/send`, param)
  }

  async providerData(param) {
    return await this.$axios.post(`baxi/data-bundles`, param)
  }

  async sendData(param) {
    return await this.$axios.post(`baxi/data/send`, param)
  }

  async listProduct(param) {
    return await this.$axios.post(`baxi/cable/products`, param)
  }

  async listAddons(param) {
    return await this.$axios.post(`baxi/cable/addons`, param)
  }

  async sendTv(param) {
    return await this.$axios.post(`baxi/cable/buy`, param)
  }

  async buyPower(param) {
    return await this.$axios.post(`baxi/electricity/buy`, param)
  }

  async listLoan(param) {
    return await this.$axios.post(`loan/list`, param)
  }

  async listTransaction(param) {
    return await this.$axios.post(`customer/transactions/list`, param)
  }

  async listPaginate(param, url) {
    return await this.$axios.post(url, param)
  }

  async verifyBetway(param) {
    return await this.$axios.post(`baxi/bet/verify`, param)
  }

  async fundBetway(param) {
    return await this.$axios.post(`baxi/bet/fund`, param)
  }

  async listSaving(param) {
    return await this.$axios.post(`saving/list`, param)
  }

  async updateProfile(param) {
    return await this.$axios.post(`customerauth/profile/edit`, param)
  }

  async updateImg(param) {
    return await this.$axios.post(`customerauth/picture/change`, param)
  }

  async savePassword(param) {
    return await this.$axios.post(`customerauth/change-password`, param)
  }
}
