import catchAsync from "../middlewares/CatchAsync";
import AppError from "../utils/Errors/AppError";
import Doner from "../models/Doner";
import Notification from "../models/Notification";
import sendData from "../utils/responses/sendData";
import sendMessage from "../utils/responses/sendMessage";

export const getNotification = catchAsync(async (req, res, next) => {
  res.setHeader("Content-type", "application/json");

  const notificationInfo = await Notification.find({ doner: req.params.did });
  if (!notificationInfo) return next(new AppError("Notification not found!", 404));

  return sendData(res, notificationInfo);
});

export const sendNotification = catchAsync(async (req, res, next) => {
    res.setHeader("Content-type", "application/json");
  
    const { name, phone, area, bloodGroup } = req.body;

    const donerInfo = await Doner.find({ area, bloodGroup, status: true });
    if (!donerInfo.length)  return sendMessage(res, 'Doner not found!!!');
  
    for (let i = 0; i < donerInfo.length; i++) {
        const notificationInfo = await Notification.create({
            name,
            phone,
            area,
            bloodGroup,
            doner: donerInfo[i]._id,
            createAt: Date.now(),
        });
        if (!notificationInfo) return next(new AppError("Somthing went wrong to send notification!", 404));
    }

    return sendMessage(res, 'Notification send successfully');
});
