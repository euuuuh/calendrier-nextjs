import GenerateErrorMessage from "../generate-error-message";
import { API_URLS } from "../../config/config";
import { TypeUserInfo } from "../../types/TypeUserInfo";

/**
 * Charger les informations sur l'utilisateur
 * @param jwt Jwt
 * @returns [errMessage, userData]
 */
export default async function useUserInfo(jwt: string): Promise<[string, TypeUserInfo]> {
  let errorMessage = "";
  let userData: TypeUserInfo = {
    user_id: "",
    username: "",
    created_on: new Date(),
    last_login: new Date(),
    week_start_day: "MONDAY",
  };

  try {
    // Vérifier jwt token
    if (!jwt) {
      const errMessage = GenerateErrorMessage("You need to be logged in to access this page");
      return [errMessage, userData];
    }

    // Récupérer les informations de l'utilisateur
    const userReq = await fetch(API_URLS.users.getUser, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwt}`,
      },
    });

    const userRes = await userReq.json();

    // Verifier reponse de l'api
    if (userRes?.statusCode !== 200) {
      const errMessage = GenerateErrorMessage("An error occured while fetching user data", `${userRes?.message}`);
      return [errMessage, userData];
    }

    // Retourner les informations de l'utilisateur
    userData = {
      user_id: userRes.data.user_id,
      username: userRes.data.username,
      created_on: userRes.data.created_on,
      last_login: userRes.data.last_login,
      week_start_day: userRes.data.week_start_day,
    };

    // Verifier que tous les champs sont définis
    if (
      !userData.user_id ||
      !userData.username ||
      !userData.created_on ||
      !userData.last_login ||
      !userData.week_start_day
    ) {
      const missingFields: string[] = [];
      FindMissingFields(userData, missingFields);

      const errMessage = GenerateErrorMessage(
        "An error occured while fetching user data",
        `Missing fields : ${missingFields.join(", ")}`
      );
      return [errMessage, userData];
    }

    return [errorMessage, userData];
  } catch (err) {
    errorMessage = GenerateErrorMessage("An error happend, try again later", `${err}`);
    return [errorMessage, userData];
  }
}

/**
 * Trouve les champs manquants dans l'objet userData
 * @param userData userData
 * @param missingFields Liste pour mettre les champs manquants
 */
function FindMissingFields(userData: TypeUserInfo, missingFields: any[]) {
  if (!userData.user_id) {
    missingFields.push("user_id");
  }
  if (!userData.username) {
    missingFields.push("username");
  }
  if (!userData.created_on) {
    missingFields.push("created_on");
  }
  if (!userData.last_login) {
    missingFields.push("last_login");
  }
  if (!userData.week_start_day) {
    missingFields.push("week_start_day");
  }
}
