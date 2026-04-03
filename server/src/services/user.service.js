const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const User = require("../models/user.model");

exports.getAllUsers = async ({ page, limit, role, isActive }) => {
  const offset = (page - 1) * limit;

  const where = {};
  if (role) where.role = role;
  if (isActive !== undefined) where.isActive = isActive;

  const { rows, count } = await User.findAndCountAll({
    where,
    attributes: { exclude: ["password"] },
    limit,
    offset,
  });

  return {
    total: count,
    page,
    totalPages: Math.ceil(count / limit),
    users: rows,
  };
};

exports.getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) throw new Error("User not found");
  return user;
};

exports.createUser = async ({ name, email, password, role }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new Error("Email already exists");

  if (role === "admin") {
    throw new Error("Cannot create admin user");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  const userData = user.toJSON();
  delete userData.password;

  return userData;
};

exports.updateUser = async (id, data, currentAdminId) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  if (user.id === currentAdminId && data.role && data.role !== "admin") {
    throw new Error("Admin cannot downgrade themselves");
  }

  if (data.email) delete data.email;

  await user.update(data);

  const userData = user.toJSON();
  delete userData.password;

  return userData;
};

exports.updateUserStatus = async (id, isActive, currentAdminId) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  if (user.id === currentAdminId && isActive === false) {
    throw new Error("Admin cannot deactivate themselves");
  }

  user.isActive = isActive;
  await user.save();

  return { message: "Status updated" };
};

exports.resetPassword = async (id, newPassword) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  return { message: "Password reset successful" };
};