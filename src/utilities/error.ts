import { ErrorHandle } from "../global/enums";

/**
 * Die Klasse CustomError erweitert die Error Klasse.
 * Sie wird verwendet, um Fehler zu werfen mit dem jeweiligen Statuscode.
 * @param {ErrorHandle} errorHandle - Art des Fehlers.
 * @param {string} customMessage - Eigene Fehlermeldung.
 * @returns {number} - Gibt den Statuscode zurück.
 */

class CustomError extends Error {
  public statusCode: number;

  constructor(errorHandle: ErrorHandle, customMessage?: string) {
    super();
    this.name = "CustomError";
    this.statusCode = this.handle(errorHandle, customMessage);
  }

  private handle(errorHandle: ErrorHandle, customMessage?: string): number {
    switch (errorHandle) {
      case ErrorHandle.DatabaseError:
        this.message = `Database error occurred ${customMessage}`;
        return 500;
      case ErrorHandle.ServerError:
        this.message = `Server error occurred ${customMessage}`;
        return 500;
      case ErrorHandle.BadRequest:
        this.message = `Bad request ${customMessage}`;
        return 400;
      case ErrorHandle.NotFound:
        this.message = `Not Found ${customMessage}`;
        return 404;
      case ErrorHandle.Unauthorized:
        this.message = `Unauthorized ${customMessage}`;
        return 401;
      default:
        this.message = "Inernal server error";
        return 500;
    }
  }
}

export default CustomError;
