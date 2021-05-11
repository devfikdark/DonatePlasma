import catchAsync from "../middlewares/CatchAsync";
import AppError from "../utils/Errors/AppError";
import User from "../models/User";
import Doner from "../models/Doner";
import Hospital from "../models/Hospital";
import Token from "../models/Token";
import sendData from "../utils/responses/sendData";
import { createJWT } from "../middlewares/jwtToken";
import sendMessage from "../utils/responses/sendMessage";

// SignUp
export const signUpUser = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const { user, doner, hospital } = req.body;

  if (!user.userName) return next(new AppError("Provide your userName.", 400));
  if (!user.name) return next(new AppError("Provide your name.", 400));
  if (!user.password) return next(new AppError("Provide your password.", 400));
  if (!user.phone) return next(new AppError("Provide your phone.", 400));
  if (!user.role) return next(new AppError("Provide your role.", 400));

  let userInfo = await User.findOne({
    userName: user.userName,
  });
  if (userInfo) return next(new AppError("Already use this userName.", 400));

  userInfo = await User.create({
    ...user,
    createAt: Date.now(),
  });
  if (!userInfo) return next(new AppError("Somthing went wrong to create user."));
  userInfo.password = await userInfo.hashPassword(user.password);
  await userInfo.save();

  // create doner
  const donerInfo = await Doner.create({
    ...doner,
    user: userInfo._id,
    createAt: Date.now(),
  })
  if (!donerInfo) return next(new AppError("Somthing went wrong to create doner."));

  // check hospital
  if (hospital) {
    const hospitalInfo = await Hospital.findById(hospital);
    hospitalInfo.donerList.push(donerInfo.id);
    donerInfo.hospital = hospital;
    await hospitalInfo.save();
    await donerInfo.save();
  }

  return sendMessage(res, 'Doner created successfully');
});

export const signUpHospital = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const { userName, name, password, phone, role, documents } = req.body;
  if (!userName) return next(new AppError("Provide hospital userName.", 400));
  if (!name) return next(new AppError("Provide hospital name.", 400));
  if (!password) return next(new AppError("Provide hospital password.", 400));
  if (!phone) return next(new AppError("Provide hospital phone.", 400));
  if (!role) return next(new AppError("Provide your role.", 400));
  if (!documents) return next(new AppError("Provide hospital documents.", 400));

  let userInfo = await User.findOne({
    userName,
  });
  if (userInfo) return next(new AppError("Already use this userName.", 400));

  userInfo = await User.create({
    userName,
    name, 
    phone, 
    role,
    createAt: Date.now(),
  });
  if (!userInfo) return next(new AppError("Somthing went wrong to create user."));
  userInfo.password = await userInfo.hashPassword(password);
  await userInfo.save();

  // create hospital
  const hospitalInfo = await Hospital.create({
    user: userInfo._id,
    documents,
    createAt: Date.now(),
  })
  if (!hospitalInfo) return next(new AppError("Somthing went wrong to create hospital account."));

  return sendMessage(res, 'Hospital created successfully');
});

export const signUp = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const { userName, password } = req.body;
  let userInfo = await User.findOne({
    userName,
  });
  if (userInfo) return next(new AppError("Already use this userName.", 400));

  userInfo = await User.create({
    ...req.body,
    createAt: Date.now(),
  });
  if (!userInfo) return next(new AppError("Somthing went wrong to create user."));
  userInfo.password = await userInfo.hashPassword(password);
  await userInfo.save();

  return sendMessage(res, 'Admin created successfully');
});

// SignIn
export const signIn = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const { userName, password } = req.body;

  if (!userName) return next(new AppError("Provide your user name.", 400));
  if (!password) return next(new AppError("Provide your password.", 400));

  // Check if user exists & password is correct
  const userInfo = await User.findOne({
    userName
  }).select("+password");

  if (!userInfo || !(await userInfo.verifyPassword(password, userInfo.password))) {
    next(new AppError("Incorrect credential.", 400));
  }

  if (userInfo.role === 'doner') {
    const donerInfo = await Doner.findOne({ user: userInfo._id });
    donerInfo._doc.token = createJWT(userInfo._id);
    donerInfo.password = undefined;
    return sendData(res, donerInfo);
  } else if (userInfo.role === 'hospital') {
    const hospitalInfo = await Hospital.findOne({ user: userInfo._id });
    hospitalInfo._doc.token = createJWT(userInfo._id);
    hospitalInfo.password = undefined;
    hospitalInfo._doc.donerCount = hospitalInfo.donerList.length;
    hospitalInfo.donerList = undefined;
    return sendData(res, hospitalInfo);
  } else {
    userInfo._doc.token = createJWT(userInfo._id);
    userInfo.password = undefined;
    return sendData(res, userInfo);
  }
});

// LogOut
export const logOut = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const logoutInfo = await Token.create({ token: req.token });
  if (!logoutInfo) return next(new AppError("Try Again!", 400));

  return sendMessage(res, 'Logout Successfully');
});
