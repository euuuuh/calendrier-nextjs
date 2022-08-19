import ApiError from "../../../types/ApiError";
import { AUTH_VALIDATION } from "../../../config/config";

/**
 * Valide les champs lors de la création d'un compte et de la connection
 * @param username Le username
 * @param password Le password
 * @returns ApiError si erreur, false
 */
export function ValidateUserInfo(username: string, password: string): ApiError | false {
  if (!username || !password) {
    return new ApiError("Missing fields 'username' and/or 'password'", 400);
  }

  username = username.trim();
  password = password.trim();

  if (username.length < AUTH_VALIDATION.username_min_length || username.length > AUTH_VALIDATION.username_max_length) {
    return new ApiError(
      `Username must be between ${AUTH_VALIDATION.username_min_length} and ${AUTH_VALIDATION.username_max_length} characters`,
      400
    );
  }

  if (password.length < AUTH_VALIDATION.password_min_length || password.length > AUTH_VALIDATION.password_max_length) {
    return new ApiError(
      `Password must be between ${AUTH_VALIDATION.username_min_length} and ${AUTH_VALIDATION.username_max_length} characters`,
      400
    );
  }

  return false;
}
