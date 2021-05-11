import catchAsync from "../middlewares/CatchAsync";
import AppError from "../utils/Errors/AppError";
import User from "../models/User";
import Doner from "../models/Doner";
import Hospital from "../models/Hospital";
import sendData from "../utils/responses/sendData";
import HospitalInfo from '../utils/dto/Hospital';
import DonerInfo from '../utils/dto/DonerInfo';
import sendMessage from "../utils/responses/sendMessage";

export const hospitalList = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const pendingList = await Hospital.find({ status: false });
  const confirmedList = await Hospital.find({ status: true });

  return sendData(res, {
    pendingList: HospitalInfo(pendingList),
    confirmedList: HospitalInfo(confirmedList),
  });
});

export const getHospital = catchAsync(async (req, res, next) => {
    res.setHeader("Content-type", "application/json");
  
    const hospitalInfo = await Hospital.findById(req.params.hid);
    if (!hospitalInfo) return next(new AppError("Hospital not found", 404));

    hospitalInfo._doc.donerCount = hospitalInfo.donerList.length;
    hospitalInfo.donerList = undefined;
    return sendData(res, hospitalInfo);
});

export const getDoners = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const donerData = await Doner.find({ hospital: req.params.hid });
  return sendData(res, DonerInfo(donerData));
});

export const activeHospital = catchAsync(async (req, res, next) => {
    res.setHeader("Content-type", "application/json");
  
    const { status } = req.body;

    const hospitalInfo = await Hospital.findById(req.params.hid);
    if (!hospitalInfo) return next(new AppError("Hospital not found", 404));

    hospitalInfo.status = status;
    await hospitalInfo.save();

    return sendMessage(res, 'Account active successfully');
});

export const modifyHospital = catchAsync(async (req, res, next) => {
    res.setHeader("Content-type", "application/json");
  
    const { userName, name, phone, website, address } = req.body;
    if (!userName) return next(new AppError("Provide hospital userName.", 400));
    if (!name) return next(new AppError("Provide hospital name.", 400));
    if (!phone) return next(new AppError("Provide hospital phone.", 400));

    // hospital
    const hospitalInfo = await Hospital.findById(req.params.hid);
    if (!hospitalInfo) return next(new AppError("Hospital not found", 404));

    hospitalInfo.website = website;
    await hospitalInfo.save();

    // user
    const userInfo = await User.findById(hospitalInfo.user);
    if (!userInfo) return next(new AppError("Hospital not found", 404));

    userInfo.userName = userName;
    userInfo.name = name;
    userInfo.phone = phone;
    userInfo.address = address;

    await userInfo.save();

    return sendMessage(res, 'Modify hospital info');
});
