import { createListenerMiddleware } from "@reduxjs/toolkit"
import { authApi } from "@/app/services/auth.api"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (action, listernerApi) => {
    listernerApi.cancelActiveListeners()
    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("id", action.payload.id)
    }
  },
})
