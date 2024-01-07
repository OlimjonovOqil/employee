import { ErrorWithMessage } from "@/types"
import { Record } from "@prisma/client/runtime/library"

export const IsErrorWithMessage = (
  error: unknown,
): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as Record<string, unknown>).data === "object"
  )
}
