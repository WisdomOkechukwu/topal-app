<template>
  <div class="grid grid-cols-12 gap-2 mt-8">
    <div
      class="md:col-span-9 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between flex-col"
    >
      <div
        style="
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
        "
      >
        <div class="flex mr-2">
          <img src="/icons/MyAccount.svg" class="h-6" />
          <h3 class="font-medium text-lg ml-3">Edit Profile</h3>
        </div>
        <div class="flex items-center justify-end mb-[20px] mr-[20px]">
          <button
            class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
            @click="uploadFile()"
          >
            Save Image
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <!-- <cropper
						class="cropper"
						:src="img"
						:stencil-props="{
						aspectRatio: 10/12
						}"
						@change="change"
					></cropper> -->
        <!-- <h4 class="font-normal text-lg">What do you want to save for.</h4> -->
        <img
          v-if="$auth.user.profile_picture_link != null"
          id="logo"
          class="rounded-full mx-auto h-8 w-8"
          style="width: 200px; height: 200px"
          :src="$auth.user.profile_picture_link"
        />
        <img
          v-else
          id="logo"
          style="width: 200px; height: 200px"
          class="rounded-full mx-auto h-8 w-8"
          src="/img/proimg.png"
        />
        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Image</label>
          <input
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="file"
            accept="image/*"
            @change="selectFile($event)"
          />
        </div>
      </div>
    </div>

    <div
      class="md:col-span-9 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between flex-col"
    >
      <div
        style="
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
        "
      >
        <div class="flex mr-2">
          <img src="/icons/MyAccount.svg" class="h-6" />
          <h3 class="font-medium text-lg ml-3">Profile</h3>
        </div>
        <div class="flex items-center justify-end mb-[20px] mr-[20px]">
          <button
            class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
            @click="editProfile()"
          >
            Save Profile
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <!-- <h4 class="font-normal text-lg">What do you want to save for.</h4> -->

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Firstname</label>
          <input
            v-model="customerdata.firstname"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Lastname</label>
          <input
            v-model="customerdata.lastname"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="lastname"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Email</label>
          <input
            v-model="customerdata.email"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="email"
            name="email"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Gender</label>
          <select
            id="gender"
            v-model="customerdata.gender"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            name="gender"
          >
            <option :value="null">Choose</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Phone Number</label>
          <input
            v-model="customerdata.telephone"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="phone"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">BVN</label>
          <input
            v-model="customerdata.bvn"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="bvn"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">City</label>
          <input
            v-model="customerdata.city"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="city"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Company Location</label>
          <input
            v-model="customerdata.company_location"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="company_location"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Company Name</label>
          <input
            v-model="customerdata.company_name"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="company_name"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Employment Status</label>
          <select
            id="gender"
            v-model="customerdata.employment_status"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            name="gender"
          >
            <option value="employed">employed</option>
            <option value="unemployed">unemployed</option>
            <option value="self-employed">self-employed</option>
            <option value="student">student</option>
          </select>
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Marital Status</label>
          <select
            id="gender"
            v-model="customerdata.marital_status"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            name="gender"
          >
            <option :value="null">Choose</option>
            <option value="single">single</option>
            <option value="married">married</option>
            <option value="seperated">seperated</option>
            <option value="divorced">divorced</option>
            <option value="widowed">widowed</option>
          </select>
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Residential Address</label>
          <input
            v-model="customerdata.residential_address"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            type="text"
            name="residential_address"
          />
        </div>
      </div>
    </div>

    <div
      class="md:col-span-9 col-span-12 text-custom-primary bg-white rounded-xl sm:shadow-lg p-8 sm:flex items-start justify-between flex-col"
    >
      <div
        style="
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          width: 100%;
        "
      >
        <div class="flex mr-2">
          <img src="/icons/MyAccount.svg" class="h-6" />
          <h3 class="font-medium text-lg ml-3">Edit Password</h3>
        </div>
        <div class="flex items-center justify-end mb-[20px] mr-[20px]">
          <button
            class="border border-custom-primary text-xs px-4 py-2 rounded-3xl hover:text-white hover:bg-custom-primary"
            @click="editPassword()"
          >
            Save Password
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <!-- <h4 class="font-normal text-lg">What do you want to save for.</h4> -->

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">Old Password</label>
          <input
            v-model="old_password"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            :type="show_password == false ? 'password' : 'text'"
          />
          <img
            v-if="!show_password"
            src="/icons/eye.svg"
            style="
              position: relative;
              top: -43px;
              left: 88%;
              height: 30px;
              width: 30px;
              color: #68387d;
            "
            @click="show_password = !show_password"
          />

          <img
            v-if="show_password"
            src="/icons/eyeslash.svg"
            style="
              position: relative;
              top: -43px;
              left: 88%;
              height: 30px;
              width: 30px;
              color: #68387d;
            "
            @click="show_password = !show_password"
          />
        </div>

        <div class="col-span-2 mt-[10px] sm:col-span-1 w-full">
          <label class="font-thin text-sm">New Password</label>
          <input
            v-model="new_password"
            class="w-full px-4 py-3 bg-[#f2f2f2] rounded-3xl text-2xl font-semibold border-none"
            :type="show_new_password == false ? 'password' : 'text'"
          />

          <img
            v-if="!show_new_password"
            src="/icons/eye.svg"
            style="
              position: relative;
              top: -43px;
              left: 88%;
              height: 30px;
              width: 30px;
              color: #68387d;
            "
            @click="show_new_password = !show_new_password"
          />

          <img
            v-if="show_new_password"
            src="/icons/eyeslash.svg"
            style="
              position: relative;
              top: -43px;
              left: 88%;
              height: 30px;
              width: 30px;
              color: #68387d;
            "
            @click="show_new_password = !show_new_password"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
export default {
  name: 'IndexPage',
  components: {
    Cropper,
  },
  layout: 'auth',
  middleware: 'auth',
  data() {
    return {
      img: 'https://images.pexels.com/photos/226746/pexels-photo-226746.jpeg',
      profile_picture: null,
      new_password: null,
      show_password: false,
      show_new_password: false,
      old_password: null,
      customerdata: {
        firstname: null,
        lastname: null,
        email: null,
      },
      disabled: '0',
    }
  },
  head() {
    return {
      title: 'Profile | Tapol',
    }
  },
  created() {
    this.customerdata.firstname = this.$auth.user.firstname
    this.customerdata.lastname = this.$auth.user.lastname
    this.customerdata.email = this.$auth.user.email
    this.customerdata.gender = this.$auth.user.gender
    this.customerdata.telephone = this.$auth.user.telephone
    this.customerdata.bvn = this.$auth.user.bvn
    this.customerdata.city = this.$auth.user.city
    this.customerdata.company_location = this.$auth.user.company_location
    this.customerdata.company_name = this.$auth.user.company_name
    this.customerdata.employment_status = this.$auth.user.employment_status
    this.customerdata.marital_status = this.$auth.user.marital_status
    this.customerdata.residential_address = this.$auth.user.residential_address
    console.log(this.customerdata)
  },
  methods: {
    selectFile($event) {
      console.log($event.target.files[0])
      this.profile_picture = $event.target.files[0]
    },
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    },
    async editPassword() {
      if (this.new_password == null || this.new_password == '') {
        this.$toast.alert({
          text: 'New Password',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }

      if (this.old_password == null || this.old_password == '') {
        this.$toast.alert({
          text: 'Old Password',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      const formData = {
        id: this.$auth.user.id,
        old_password: this.old_password,
        new_password: this.new_password,
      }
      await this.$apiservice
        .savePassword(formData)
        .then((res) => {
          console.log(res.data.results)
          swal('Success', res.data.message, 'success').then((value) => {
            console.log(value)
            if (value == true) {
              this.$auth.refresh()
              return
            }
            this.$auth.refresh()
            
          })
        })
        .catch((error) => {
          console.log(error)
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }
          this.$toast.alert({
            text: message || 'An error occured while trying.',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },
    async uploadFile() {
      if (this.profile_picture == null) {
        this.$toast.alert({
          text: 'Select Image',
          type: 'error',
          time: 3,
          position: 'top',
        })
        return
      }
      const formData = new FormData()
      formData.append(
        'profile_picture',
        this.profile_picture,
        this.profile_picture.name
      )
      console.log(formData)
      // this.$http.put(myURL, formData)
      await this.$apiservice
        .updateImg(formData)
        .then((res) => {
          console.log(res.data.results)
          swal('Success', res.data.message, 'success').then((value) => {
            console.log(value)
            if (value == true) {
              this.$auth.refresh()
              return
            }
            this.$auth.refresh()
            
          })
        })
        .catch((error) => {
          console.log(error)
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }
          this.$toast.alert({
            text: message || 'An error occured while trying.',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },
    saveProfile() {
      console.log(this.customerdata)
    },
    async editProfile() {
      await this.$apiservice
        .updateProfile(this.customerdata)
        .then((res) => {
          console.log(res.data.results)
          swal('Success', res.data.message, 'success').then((value) => {
            console.log(value)
            if (value == true) {
              this.$auth.refresh()
              return
            }
            this.$auth.refresh()
            
          })
        })
        .catch((error) => {
          console.log(error)
          let message
          if ([419, 401, 400].includes(error?.response?.status)) {
            message = error?.response.data?.message
          }
          if ([422].includes(error?.response?.status)) {
            message = Object.values(error?.response.data?.errors)[0][0]
          }
          this.$toast.alert({
            text: message || 'An error occured while trying.',
            type: 'error',
            time: 3,
            position: 'top',
          })
        })
    },
  },
}
</script>

<style>
.pp {
  position: relative;
  top: -43px;
  left: 88%;
  height: 30px;
  width: 30px;
  color: #68387d;
}
</style>
