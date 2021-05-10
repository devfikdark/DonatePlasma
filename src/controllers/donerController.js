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

  const { area, bloodGroup } = req.query;

  let docs;
  if (area) {
    docs = await Doner.find({ area });
  } else if (bloodGroup) {
    docs = await Doner.find({ bloodGroup });
  } else if (area && bloodGroup) {
    docs = await Doner.find({ area, bloodGroup });
  } else {
    docs = await Doner.find();
  }

  return sendData(res, DonerInfo(docs));
});
