import catchAsync from "../middlewares/CatchAsync";
import AppError from "../utils/Errors/AppError";
import User from "../models/User";
import Doner from "../models/Doner";
import Hospital from "../models/Hospital";
import sendData from "../utils/responses/sendData";
import HospitalInfo from '../utils/dto/Hospital';
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
