import { SequelizeScopeError, ValidationError } from "sequelize";
import { ErrorHandle } from "../global/enums";
import CustomError from "./error";
import { ErrorOptions } from "sequelize/types/errors/base-error";

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
    console.error("ist Custom Error: ", error);
    throw error;
  } else if (error instanceof ValidationError) {
    console.error("Sequelize Validation Error: ", error);
    if (error.name === "SequelizeForeignKeyConstraintError") {
      console.log("Foreign Key Error: ", error);
      throw new CustomError(ErrorHandle.DatabaseError, "id does not exist");
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      console.log("Unique Constraint Error: ", error);
      throw new CustomError(
        ErrorHandle.DatabaseError,
        "the key is unique and already exists"
      );
    }
    console.error("Sequelize Validation Error: ", error);
    throw new CustomError(ErrorHandle.DatabaseError, error.message);
  } else {
    console.error("Unknown Error: ", error);
    throw new CustomError(ErrorHandle.ServerError, "unknown");
  }
  throw new CustomError(ErrorHandle.ServerError, "unknown");
}

export function errorValidation(error: Error | unknown): CustomError {
  if (error instanceof CustomError) {
    return error;
  } else {
    console.log("ist Custom Error: ", error);
    return new CustomError(ErrorHandle.ServerError, "unknown");
  }
}
