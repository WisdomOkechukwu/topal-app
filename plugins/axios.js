export default function ({ $axios, redirect, $auth, $notyf, $toast }) {
  $axios.onRequest((config) => {
    // console.log(config)
    const buttons = document.querySelectorAll('button:not(:disabled)')
    for (const button of buttons) {
      button.disabled = true
    }
  })
  $axios.onError((err) => {
    const buttons = document.querySelectorAll('button:disabled')
    // console.log(buttons);
    for (const button of buttons) {
      button.disabled = false
    }
    if (err.response.status === 500) {
      redirect('/sorry')
    }
    if (err.response.status == 400) {
      // console.log($notyf)
      // $notyf.error(err.response.data.message);
      // $toast.error(err.response.data.message, {
      //   position: 'top-right',
      //   duration: 2000
      // });
      // return
    }
    if (err.response.status == 401) {
      $auth.logout()
      redirect('/')
      // console.log(this.$auth)
    }
  })

  $axios.onResponseError((error) => {
    const buttons = document.querySelectorAll('button:disabled')
    // console.log(buttons);
    for (const button of buttons) {
      button.disabled = false
    }
    // $notyf.error(err.response.data.message);
    // console.log(error)
  })
  $axios.onResponse(() => {
    const buttons = document.querySelectorAll('button:disabled')
    // console.log(buttons);
    for (const button of buttons) {
      button.disabled = false
    }
  })
  // onResponseError(err)
}
