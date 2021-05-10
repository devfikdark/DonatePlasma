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
