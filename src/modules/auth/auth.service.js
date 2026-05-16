const bcrypt = require('bcrypt');
const User = require('./auth.model');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require('../../utils/jwt');

const registerUser = async (email, password, confirmPassword) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists');
  }

  if (password !== confirmPassword) {
    throw new Error('Password do not match');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// Refresh Token Service
const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Refresh token required');
  }

  // Verify refresh token
  const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  //Find user
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.refreshToken !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  // Generate new access token
  const newAccessToken = generateAccessToken(user._id);

  return {
    accessToken: newAccessToken,
  };
};

// Logout Service
const logoutUser = async (userId) => {
  const user = await User.findById(userId);

  // Find user
  if (!user) {
    throw new Error('User not found');
  }

  // Remove refresh token
  user.refreshToken = null;

  await user.save();

  return {
    message: 'Logged out successfully',
  };
};

module.exports = { registerUser, loginUser, refreshAccessToken, logoutUser };
