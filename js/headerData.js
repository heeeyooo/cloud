import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

const today = dayjs();

const formatDate = today.format("D/M/YY");

document.querySelector(".header__day").innerHTML = formatDate;
