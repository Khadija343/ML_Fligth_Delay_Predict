function AnalyticsSlider({

  label,
  value,
  min,
  max,
  step,
  name,
  unit,
  leftLabel,
  rightLabel,
  onChange

}) {

  return (

    <div className="analytics-slider-card">

      {/* HEADER */}

      <div className="analytics-slider-top">

        <h4>

          {label}

        </h4>

        <div className="analytics-slider-badge">

          {value || min}
          {" "}
          {unit}

        </div>

      </div>

      {/* SLIDER */}

      <input

        type="range"

        min={min}

        max={max}

        step={step}

        name={name}

        value={value}

        onChange={onChange}

        className="analytics-slider"

      />

      {/* SCALE */}

      <div className="analytics-slider-scale">

        <span>

          {leftLabel}

        </span>

        <span>

          {rightLabel}

        </span>

      </div>

    </div>
  );
}

export default AnalyticsSlider;