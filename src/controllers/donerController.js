import catchAsync from "../middlewares/CatchAsync";
import AppError from "../utils/Errors/AppError";
import User from "../models/User";
import Doner from "../models/Doner";
import Hospital from "../models/Hospital";
import sendData from "../utils/responses/sendData";
import DonerInfo from '../utils/dto/DonerInfo';
import sendMessage from "../utils/responses/sendMessage";

export const donerList = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  let { area, bloodGroup, group } = req.query;

  if (bloodGroup && group) {
      if (group == 1) {
        bloodGroup += '+';
      } else {
        bloodGroup += '-';
      }
  }

  let docs;
  if (area || bloodGroup) {
    docs = await Doner.find({
        $or: [
            { area, status: true },
            { bloodGroup, status: true }
        ]
    });
  } else {
    docs = await Doner.find({ status: true });
  }

  return sendData(res, DonerInfo(docs));
});

export const getDoner = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const donerInfo = await Doner.findById(req.params.did);

  return sendData(res, donerInfo);
});

export const modifyDoner = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const { userName, name, phone, age, bloodGroup, area, address, status } = req.body;
  if (!userName) return next(new AppError("Provide your userName.", 400));
  if (!name) return next(new AppError("Provide your name.", 400));
  if (!phone) return next(new AppError("Provide your phone.", 400));

  // doner
  const donerInfo = await Doner.findById(req.params.did);
  if (!donerInfo) return next(new AppError("Doner not found", 404));

  donerInfo.age = age;
  donerInfo.bloodGroup = bloodGroup;
  donerInfo.area = area;
  donerInfo.status = status;
  donerInfo.isComplete = true;
  await donerInfo.save();

  // user
  const userInfo = await User.findById(donerInfo.user);
  if (!userInfo) return next(new AppError("Doner not found", 404));

  userInfo.userName = userName;
  userInfo.name = name;
  userInfo.phone = phone;
  userInfo.address = address;
  await userInfo.save();

  return sendMessage(res, 'Modify doner info');
});
