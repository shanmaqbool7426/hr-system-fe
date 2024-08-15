import { Button } from "@/components/elements";
import { CheckOutIcon, LocationIcon, TakeBreakIcon } from "@/components/svg";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TimSheetAction, startBreak, todaysAttendance, endBreak, checkOut } from "@/store/actions/attendance.actions";
import { useDispatch, useSelector } from "react-redux";
export const TimeSheet = ({ className }) => {
  const { user, todayAttendance, breakTimeStart, checkOutAttendance, getBreaksByAttendance } = useSelector(
    (state) => state.attendance
  );

  // Function to calculate total break time
  function calculateTotalBreakTime(breaks) {
    let totalMillis = 0;
    for (const breakEntry of breaks) {
      const start = new Date(breakEntry.startAt);
      const end = new Date(breakEntry.endAt);
      const durationMillis = end - start;
      totalMillis += durationMillis;
    }
    const totalMinutes = Math.floor(totalMillis / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours > 0 ? hours + " hrs " : ""}${minutes} mins`;
  }
  let totalBreakTime = calculateTotalBreakTime(getBreaksByAttendance);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkIntimes, setCheckInTimes] = useState(null);
  const [breakTime, setBreakTime] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [workedHours, setWorkedHours] = useState(0);
  const [hasCheckedOut, setHasCheckedOut] = useState(todayAttendance?.checkOutAt ? true : false);
  console.log(hasCheckedOut, todayAttendance?.checkOutAt, "===>checking");

  const intervalRef = useRef(null);
  const breakStartTimeRef = useRef(null);
  useEffect(() => {
    if (isCheckedIn && !onBreak) {
      const interval = setInterval(() => {
        const now = new Date();
        const endOfShift = new Date();
        endOfShift.setHours(18, 0, 0, 0);
        // for the todayattendance time gtting
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
      }, 1000);
      intervalRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [isCheckedIn, onBreak, checkInTime, breakTime]);
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    dispatch(TimSheetAction(user));
    dispatch(todaysAttendance(user));
  };
  const handleCheckOut = (id) => {
    // if (todayAttendance?.checkOutAt) {
    //     setIsCheckedIn(false)
    //     setOnBreak(false)
    //     setCheckInTime(null)
    //     setBreakTime(0)
    //     setOvertime(0)
    //     setWorkedHours(0)
    //     setHasCheckedOut(true)
    //     setCheckInTimes(null)
    // } else {
    dispatch(checkOut(id));
    setIsCheckedIn(false);
    setOnBreak(false);
    setCheckInTime(null);
    setBreakTime(0);
    setOvertime(0);
    setWorkedHours(0);
    setHasCheckedOut(true);
    setCheckInTimes(null);
    // }
  };
  const handleTakeBreak = (id) => {
    setOnBreak(true);
    dispatch(startBreak(user, id));
  };

  const handleBreakOff = (id) => {
    setOnBreak(false);
    dispatch(endBreak(id));
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
  // const formatTimes = (duration) => {
  //     const date = new Date(duration);
  //     const hours = date.getUTCHours();
  //     const minutes = date.getUTCMinutes();
  //     const seconds = date.getUTCSeconds()
  //     return `${hours}.${minutes < 10 ? '0' : ''}${minutes}.${seconds} hrs`
  // }
  console.log(todayAttendance, "todayAttendance");
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
    setCheckInTimes(todayAttendance?.checkInAt ? formatTimes(todayAttendance?.checkInAt) : null);
    setIsCheckedIn(todayAttendance ? (todayAttendance?.checkOutAt ? false : true) : false);
  }, [todayAttendance, checkOutAttendance?._id]);

  return (
    <div className={`${className} zt-card grid grid-cols-2 gap-4`}>
      <div className="col-span-2 sm:col-span-1 flex flex-col text-left">
        <h2 className="text-xl font-bold mb-0">{t("TimeSheet")}</h2>
        <time dateTime={new Date().toISOString()} className="text-themeGrayscale600 text-sm block">
          {t(getFormattedDate())}
        </time>
      </div>
      <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 sm:text-right">
        <span className="text-themeGrayscale600 ">{t("Current Shift")}</span>
        <time className="font-semibold" dateTime="09:00 AM - 06:00 PM">
          {t("09:00 AM - 06:00 PM")}
        </time>
      </div>
      <div className="bg-themeGrayscale50 rounded-lg px-4 py-3 col-span-2 flex flex-wrap gap-2 justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-themeGrayscale600">{t("Check In at")}</span>
          <span className="font-semibold text-themeGrayscale900">
            {checkIntimes ? checkIntimes : t("Not checked in")}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-themeGrayscale600">{t("Work Mode")}</span>
          <span className="font-semibold text-themeGrayscale900 flex items-center gap-1">
            <LocationIcon /> {t("Onsite")}
          </span>
        </div>
      </div>
      <div className="col-span-2 h-28 w-28 rounded-full border-5 border-themeGrayscale400 bg-themeGrayscale50 mx-auto flex justify-center items-center">
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
          {/* <Button onClick={handleCheckIn} variant={'primary'} className={'flex w-full items-center whitespace-nowrap'} disabled={hasCheckedOut}>Check In</Button> */}
        </>
      ) : (
        <>
          {!onBreak ? (
            <Button
              onClick={() => handleTakeBreak(todayAttendance?._id)}
              variant={"orange"}
              className={"flex w-full items-center whitespace-nowrap col-span-2 sm:col-span-1"}
            >
              Take Break <TakeBreakIcon className={"shrink-0"} />
            </Button>
          ) : (
            <Button
              onClick={() => handleBreakOff(breakTimeStart?._id)}
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
      <div className="w-full bg-themeGrayscale50 p-4 rounded-lg flex flex-col text-center gap-1">
        <span>{t("Break")}</span>
        <time className="font-bold" dateTime={totalBreakTime}>
          {totalBreakTime}
        </time>
      </div>
      <div className="w-full bg-themeGrayscale50 p-4 rounded-lg flex flex-col text-center gap-1">
        <span>{t("Overtime")}</span>
        <time className="font-bold block" dateTime={formatTime(overtime)}>
          {t(formatTime(overtime))}
        </time>
      </div>
    </div>
  );
};
