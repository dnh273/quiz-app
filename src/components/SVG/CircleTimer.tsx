interface CircleTimerProps {
  timeLeft: number; // duration of the timer in seconds
}

const CircleTimer = (props: CircleTimerProps) => {
  let { timeLeft } = props;

  const TIME_LIMIT = 90;

  const FULL_DASH_ARRAY = 283;

  const COLOR_CODES = {
    info: {
      color: "green",
    },
  };

  let remainingPathColor = COLOR_CODES.info.color;

  // Initially, no time has passed, but this will count up
  // and subtract from the TIME_LIMIT
  let timePassed = 0;
  let TimeLeft = timeLeft;

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }
  // Update the dasharray value as time passes, starting with 283
  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;

    return circleDasharray;
  }

  function formatTimeLeft(time: number) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60 (modulus operator)
    let seconds: any = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="base-timer">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle
            className="base-timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray={setCircleDasharray()}
            className={`base-timer__path-remaining ${remainingPathColor}`}
            d="
      M 50, 50
      m -45, 0
      a 45,45 0 1,0 90,0
      a 45,45 0 1,0 -90,0
    "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" className="base-timer__label">
        {formatTimeLeft(TimeLeft)}
      </span>
    </div>
  );
};

export default CircleTimer;
