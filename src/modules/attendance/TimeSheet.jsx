import { Button } from "@/components/elements";
import { CheckOutIcon, LocationIcon, TakeBreakIcon } from "@/components/svg";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  CheckIn,
  startBreak,
  todaysAttendance,
  endBreak,
  checkOut,
  getBreaks,
} from "@/store/actions/attendance.actions";
import { useDispatch, useSelector } from "react-redux";
export const TimeSheet = ({ className }) => {
  const { todayAttendance, getBreaksByAttendance, getLastBreak } = useSelector((state) => state.attendance);
  // Function to calculate total break time
  function calculateTotalBreakTime(breaks) {
    let totalMillis = 0;
    for (const breakEntry of breaks) {
      if (breakEntry.startAt && breakEntry.endAt) {
        const start = new Date(breakEntry.startAt);
        const end = new Date(breakEntry.endAt);
        const durationMillis = end - start;
        totalMillis += durationMillis;
      }
    }

    const totalMinutes = Math.floor(totalMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours > 0 ? hours + " hrs " : ""}${minutes} mins`;
  }

  let totalBreakTime = calculateTotalBreakTime(getBreaksByAttendance);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isCheckedIn, setIsCheckedIn] = useState(
    todayAttendance ? (todayAttendance?.checkOutAt ? false : true) : false
  );
  const [onBreak, setOnBreak] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkIntimes, setCheckInTimes] = useState(null);
  const [breakTime, setBreakTime] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [workedHours, setWorkedHours] = useState("00:00:00");
  const [hasCheckedOut, setHasCheckedOut] = useState(todayAttendance?.checkOutAt ? true : false);
  useEffect(() => {
    dispatch(todaysAttendance());
  }, [dispatch]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isCheckedIn && !onBreak) {
        const now = new Date();
        const endOfShift = new Date();
        endOfShift.setHours(18, 0, 0, 0);
        const checkIn = new Date(todayAttendance?.checkInAt);
        const workedMillis = now - checkIn;
        const hours = Math.floor(workedMillis / (1000 * 60 * 60));
        const minutes = Math.floor((workedMillis / (1000 * 60)) % 60);

        const formatTime = (hours, minutes) => {
          const formattedHours = hours < 10 ? `0${hours}` : hours;
          const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          return `${formattedHours}:${formattedMinutes} hrs`;
        };

        setWorkedHours(formatTime(hours, minutes));

        if (now > endOfShift) {
          const overtimeMillis = now - endOfShift;
          setOvertime(overtimeMillis);
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isCheckedIn, onBreak, todayAttendance?.checkInAt, dispatch]);
  const handleCheckIn = async () => {
    setIsCheckedIn(true);
    await dispatch(CheckIn());
    await dispatch(todaysAttendance());
  };
  

  const handleCheckOut = async (id) => {
    await dispatch(checkOut(id));
    setIsCheckedIn(false);
    setOnBreak(false);
    setCheckInTime(null);
    // setBreakTime("00:00:00");
    // setOvertime("00:00:00");
    // setWorkedHours("00:00:00");
    setHasCheckedOut(true);
    setCheckInTimes(null);
    await dispatch(todaysAttendance());
  };
  const handleTakeBreak = async (id) => {
    setOnBreak(true);
    await dispatch(startBreak(id));
    await dispatch(getBreaks(todayAttendance?._id));
  };

  const handleBreakOff = async (id) => {
    setOnBreak(false);
    await dispatch(endBreak(id));
    await dispatch(getBreaks(todayAttendance?._id));
  };

  const formatTime = (duration) => {
    const hours = Math.floor(duration / 1000 / 60 / 60);
    const minutes = Math.floor((duration / 1000 / 60) % 60);
    return `${hours}.${minutes < 10 ? "0" : ""}${minutes} hrs`;
  };
  const getFormattedDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };
  function formatTimes(dateString) {
    const date = new Date(dateString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  useEffect(() => {
    setIsCheckedIn(todayAttendance ? (todayAttendance?.checkOutAt ? false : true) : false);
    if (todayAttendance) {
      dispatch(getBreaks(todayAttendance._id))
    }
  }, [dispatch]); 
  return (
    <div className={`${className} zt-card grid grid-cols-2 gap-4`}>
      <div className="col-span-2 sm:col-span-1 flex flex-col text-left">
        <h2 className="text-xl font-bold mb-0">{t("TimeSheet")}</h2>
        <time dateTime={new Date().toISOString()} className="text-themeGrayscale600 dark:text-white text-sm block">
          {t(getFormattedDate())}
        </time>
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 sm:text-right">
        <span className="text-themeGrayscale600 dark:text-white">{t("Current Shift")}</span>
        <time className="font-semibold" dateTime="09:00 AM - 06:00 PM">
          {t("09:00 AM - 06:00 PM")}
        </time>
      </div>
      <div className="bg-themeGrayscale50 dark:bg-gray-700 rounded-lg px-4 py-3 col-span-2 flex flex-wrap gap-2 justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-themeGrayscale600 dark:text-white">{t("Check In at")}</span>
          <span className="font-semibold text-themeGrayscale900 dark:text-white">
            {todayAttendance?.checkInAt ? formatTimes(todayAttendance?.checkInAt) : t("Not checked in")}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-themeGrayscale600 dark:text-white">{t("Work Mode")}</span>
          <span className="font-semibold text-themeGrayscale900 dark:text-white flex items-center gap-1">
            <LocationIcon /> {t("Onsite")}
          </span>
        </div>
      </div>
      <div className="col-span-2 h-28 w-28 rounded-full border-5 border-themeGrayscale400 bg-themeGrayscale50 dark:bg-gray-700 mx-auto flex justify-center items-center">
        <time className="text-xs font-bold" dateTime={workedHours}>
          {workedHours}
        </time>
      </div>
      {!todayAttendance || todayAttendance?.checkOutAt ? (
        <>
          <Button
            onClick={handleCheckIn}
            variant={"primary"}
            className={"flex w-full items-center whitespace-nowrap"}
            disabled={todayAttendance ? (todayAttendance?.checkOutAt ? true : false) : false}
          >
            Check In
          </Button>
        </>
      ) : (
        <>
          {!getLastBreak || getLastBreak?.endAt ? (
            <Button
              onClick={() => handleTakeBreak(todayAttendance?._id)}
              variant={"orange"}
              className={"flex w-full items-center whitespace-nowrap col-span-2 sm:col-span-1"}
            >
              Take Break <TakeBreakIcon className={"shrink-0"} />
            </Button>
          ) : (
            <Button
              onClick={() => handleBreakOff(getLastBreak?._id)}
              variant={"orange"}
              className={"flex w-full items-center whitespace-nowrap col-span-2 sm:col-span-1"}
            >
              Break Off <TakeBreakIcon className={"shrink-0"} />
            </Button>
          )}
        </>
      )}
      <Button
        onClick={() => handleCheckOut(todayAttendance?._id)}
        variant={"primary"}
        className={"flex w-full items-center whitespace-nowrap col-span-2 sm:col-span-1"}
        disabled={todayAttendance ? (todayAttendance?.checkOutAt ? true : false) : true}
      >
        Check Out <CheckOutIcon className={"shrink-0"} />
      </Button>
      <div className="w-full bg-themeGrayscale50 dark:bg-gray-700 p-4 rounded-lg flex flex-col text-center gap-1">
        <span>{t("Break")}</span>
        <time className="font-bold" dateTime={getBreaksByAttendance[0]?.endAt ? totalBreakTime : "00:00:00"}>
          {getBreaksByAttendance[0]?.endAt ? totalBreakTime : "00:00:00"}
        </time>
      </div>
      <div className="w-full bg-themeGrayscale50 dark:bg-gray-700 p-4 rounded-lg flex flex-col text-center gap-1">
        <span>{t("Overtime")}</span>
        <time className="font-bold block" dateTime={formatTime(overtime)}>
          {t(formatTime(overtime))}
        </time>
      </div>
    </div>
  );
};
