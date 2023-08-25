export default function ({ $auth, redirect }) {
  if (!process.server) {
    if ($auth.$state.loggedIn) {
      return redirect('/')
    }
  }
}
