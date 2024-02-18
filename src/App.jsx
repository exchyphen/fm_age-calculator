import { useState } from "react";
import "./App.css";
import AgeInput from "./components/ageInput";

function App() {
  // display variables
  const [displayYears, setDisplayYears] = useState("--");
  const [displayMonths, setDisplayMonths] = useState("--");
  const [displayDays, setDisplayDays] = useState("--");

  // input variables
  const [inputYears, setInputYears] = useState("");
  const [inputMonths, setInputMonths] = useState("");
  const [inputDays, setInputDays] = useState("");

  // error variables
  const [errorYear, setErrorYear] = useState(false);
  const [errorMonth, setErrorMonth] = useState(false);
  const [errorDay, setErrorDay] = useState(false);
  const [errorState, setErrorState] = useState(false);

  // functions
  const getDaysOfMonth = (year, month) => {
    // check leap year
    if (month === 2) {
      if (year % 4 === 0) {
        return 29;
      }
      return 28;
    }

    if (month <= 7) {
      return month % 2 === 1 ? 31 : 30;
    } else {
      return month % 2 === 1 ? 30 : 31;
    }
  };

  const dateToDays = (year, month, day) => {
    let days = 0;

    // year (not counting leap year)
    days += year * 365;
    // days += Math.trunc(year / 4);

    // month
    for (let i = 1; i <= month; i++) {
      days += getDaysOfMonth(year, i);
    }

    // day
    days += day;

    return days;
  };

  const calculateAge = (totalDays) => {
    const years = Math.trunc(totalDays / 365);
    totalDays = totalDays % 365;
    const months = Math.trunc(totalDays / 30);
    totalDays = totalDays % 30;
    const days = totalDays;

    return {
      year: years,
      month: months,
      day: days,
    };
  };

  const resetDisplay = () => {
    setDisplayYears("--");
    setDisplayMonths("--");
    setDisplayDays("--");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currDate = new Date();
    const numYear = Number(inputYears);
    const numMonth = Number(inputMonths);
    const numDay = Number(inputDays);

    // check bounds
    let currErrorYear = false;
    let currErrorMonth = false;
    let currErrorDay = false;

    // year
    if (numYear <= 0 || numYear > currDate.getFullYear()) {
      currErrorYear = true;
    }

    // month
    if (numMonth <= 0 || numMonth > 12) {
      currErrorMonth = true;
    } else if (
      numYear === currDate.getFullYear() &&
      numMonth > currDate.getMonth() + 1
    ) {
      currErrorMonth = true;
    }
    // day
    if (numDay <= 0 || numDay > 31) {
      currErrorDay = true;
    } else if (numDay > getDaysOfMonth(numYear, numMonth)) {
      currErrorDay = true;
    } else if (
      numYear === currDate.getFullYear() &&
      numMonth === currDate.getMonth() + 1 &&
      numDay > currDate.getDate()
    ) {
      currErrorDay = true;
    }

    // update states
    setErrorYear(currErrorYear);
    setErrorMonth(currErrorMonth);
    setErrorDay(currErrorDay);

    // check all error states
    if (currErrorYear && currErrorMonth && currErrorDay) {
      // case that all of them are empty:
      if (inputYears !== "" || inputMonths !== "" || inputDays !== "") {
        setErrorState(true);
      }
      resetDisplay();
      return;
    } else {
      setErrorState(false);
    }

    // if any error -> do not calculate age
    if (currErrorYear || currErrorMonth || currErrorDay) {
      resetDisplay();
      return;
    }

    // calculate age
    const currDays = dateToDays(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      currDate.getDate()
    );
    const ageInDays = dateToDays(numYear, numMonth, numDay);

    // convert days -> year, month, day
    const age = calculateAge(currDays - ageInDays);

    setDisplayYears(age.year);
    setDisplayMonths(age.month);
    setDisplayDays(age.day);
  };

  return (
    <>
      <div className="main-container">
        <form className="form-container" action="#">
          <div className="input-container">
            <AgeInput
              title="day"
              placeholder="dd"
              errorState={errorDay}
              allError={errorState}
              onChange={setInputDays}
              value={inputDays}
            ></AgeInput>
            <AgeInput
              title="month"
              placeholder="mm"
              errorState={errorMonth}
              allError={errorState}
              onChange={setInputMonths}
              value={inputMonths}
            ></AgeInput>
            <AgeInput
              title="year"
              placeholder="yyyy"
              errorState={errorYear}
              allError={errorState}
              onChange={setInputYears}
              value={inputYears}
            ></AgeInput>
          </div>
          {errorState ? (
            <div className="error-message">Must be a valid date</div>
          ) : null}
          <div className="line"></div>
          <button className="submit-button" onClick={handleSubmit}></button>
        </form>
        <div className="results-container">
          <div className="result">
            <span className="result-number">{displayYears}</span>years
          </div>
          <div className="result">
            <span className="result-number">{displayMonths}</span>months
          </div>
          <div className="result">
            <span className="result-number">{displayDays}</span>days
          </div>
        </div>
      </div>
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/exchyphen" target="_blank">
          exc
        </a>
        .
      </div>
    </>
  );
}

export default App;
