import { MeMe } from "../generated/apolloComponent";

export const isAdmin = (me?: MeMe): boolean =>
  me && !!me.role && me.role.title === "Admin";
export const isManager = (me?: MeMe): boolean => !isAdmin(me);

export const formatTimeDate = (
  timeStamp: number,
  formatType: string = "time"
) => {
  const date = new Date(timeStamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  switch (formatType) {
    case "date":
      return (
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
      break;
    case "time":
      return h + ":" + m + " " + ampm;
      break;
    default:
      return (
        date.getMonth() +
        1 +
        "/" +
        date.getDate() +
        "/" +
        date.getFullYear() +
        " " +
        h +
        ":" +
        m +
        " " +
        ampm
      );
  }
};
