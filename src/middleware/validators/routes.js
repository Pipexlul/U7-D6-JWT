import validateUserBody from "../body/emailpass.js";
import validateRoleLanguage from "../body/rolelanguage.js";

import validateToken from "../headers/token.js";

const createUser = [validateUserBody, validateRoleLanguage];
const getUserSelf = [validateToken];
const loginUser = [validateUserBody];

export default {
  createUser,
  getUserSelf,
  loginUser,
};
