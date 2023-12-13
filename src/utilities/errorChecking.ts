import { ErrorHandle } from "../global/enums";
import CustomError from "./error";

/**
 * This function checks if the provided error is an instance of CustomError.
 * If it is, it throws the error as is. If it's not, it logs the error stack and message,
 * then throws a new CustomError with a ServerError type and "unknown" as the message.
 *
 * @param {Error} error - The error to be checked.
 * @returns {CustomError} - The thrown error.
 * @throws {CustomError} - If the error is not an instance of CustomError, it throws a new CustomError.
 */

export function errorChecking(error: Error | unknown): CustomError {
  if (error instanceof CustomError) {
    throw error;
  } else {
    console.error(error);
    console.error("Error throwed as Unkown:", error);
    throw new CustomError(ErrorHandle.ServerError, "unknown");
  }
}
