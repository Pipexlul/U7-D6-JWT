import validateUserBody from "../body/emailpass.js";
import validateRoleLanguage from "../body/rolelanguage.js";

const createUser = [validateUserBody, validateRoleLanguage];

export default {
  createUser,
};
