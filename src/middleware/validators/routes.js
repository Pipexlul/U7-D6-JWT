import validateUserBody from "../body/emailpass.js";
import validateRoleLanguage from "../body/rolelanguage.js";

const createUser = [validateUserBody, validateRoleLanguage];
const loginUser = [validateUserBody];

export default {
  createUser,
  loginUser,
};
