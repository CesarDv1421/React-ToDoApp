import bcrypt from "bcrypt";

const encrypt = {};

encrypt.encryptPassword = async (res, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    res.status(500).json({error : err.message})
  }
};

encrypt.matchPassword = async (res, password, encryptedPassword) => {
  try {
    return await bcrypt.compare(password, encryptedPassword);
  } catch (err) {
    res.status(500).json({error : err.message})
  }
};

export default encrypt;
