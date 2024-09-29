// import PropTypes from "prop-types";

// const ControlPanel = ({
//   region,
//   setRegion,
//   errors,
//   setErrors,
//   seed,
//   setSeed,
//   randomizeSeed,
// }) => {
//   const regions = [
//     { label: "USA", value: "en" },
//     { label: "Poland", value: "pl" },
//     { label: "France", value: "fr" },
//   ];

//   return (
//     <div className="control-panel">
//       <div>
//         <label>Region:</label>
//         <select
//           value={region || ""}
//           onChange={(e) => setRegion(e.target.value)}
//         >
//           {regions.map((r) => (
//             <option key={r.value} value={r.value}>
//               {r.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <label>Errors:</label>
//         <div className="range-container">
//           <input
//             type="range"
//             min={0}
//             max={10}
//             step={0.25}
//             value={Math.min(errors || 0, 10)} // Убедимся, что значение errors не null
//             onChange={(e) => setErrors(parseFloat(e.target.value))}
//           />
//           <input
//             type="number"
//             value={errors || 0} // Заменим null на 0
//             min={0}
//             max={1000}
//             onChange={(e) => setErrors(parseFloat(e.target.value) || 0)}
//           />
//         </div>
//       </div>

//       <div>
//         <label>Seed:</label>
//         <input
//           type="number"
//           value={seed === null ? "" : seed} // Убедимся, что seed не равен null
//           onChange={(e) =>
//             setSeed(e.target.value === "" ? "" : parseInt(e.target.value) || 0)
//           }
//           style={{ width: "100%" }} // Устанавливаем ширину для поля Seed
//         />
//         <button onClick={randomizeSeed}>Randomize Seed</button>
//       </div>
//     </div>
//   );
// };

// ControlPanel.propTypes = {
//   region: PropTypes.string.isRequired,
//   setRegion: PropTypes.func.isRequired,
//   errors: PropTypes.number.isRequired,
//   setErrors: PropTypes.func.isRequired,
//   seed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   setSeed: PropTypes.func.isRequired,
//   randomizeSeed: PropTypes.func.isRequired,
// };

// export default ControlPanel;

import PropTypes from "prop-types";

const ControlPanel = ({
  region,
  setRegion,
  errors,
  setErrors,
  seed,
  setSeed,
  randomizeSeed,
}) => {
  const regions = [
    { label: "USA", value: "en" },
    { label: "Poland", value: "pl" },
    { label: "France", value: "fr" },
  ];

  // Функция для корректной обработки числа ошибок
  const handleErrorsChange = (e) => {
    const value = e.target.value;

    // Если введено пустое значение, устанавливаем его как 0
    if (value === "") {
      setErrors(0);
    } else {
      setErrors(parseFloat(value));
    }
  };

  return (
    <div className="control-panel">
      <div>
        <label>Region:</label>
        <select
          value={region || ""}
          onChange={(e) => setRegion(e.target.value)}
        >
          {regions.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Errors:</label>
        <div className="range-container">
          <input
            type="range"
            min={0}
            max={10}
            step={0.25}
            value={Math.min(errors || 0, 10)} // Убедимся, что значение errors не null
            onChange={(e) => setErrors(parseFloat(e.target.value))}
          />
          <input
            type="number"
            value={errors === 0 ? "" : errors} // Если errors равно 0, отображаем пустую строку
            min={0}
            max={1000}
            onChange={handleErrorsChange} // Используем обработчик для ввода
          />
        </div>
      </div>

      <div>
        <label>Seed:</label>
        <input
          type="number"
          value={seed === null ? "" : seed} // Убедимся, что seed не равен null
          onChange={(e) =>
            setSeed(e.target.value === "" ? "" : parseInt(e.target.value) || 0)
          }
          style={{ width: "100%" }} // Устанавливаем ширину для поля Seed
        />
        <button onClick={randomizeSeed}>Randomize Seed</button>
      </div>
    </div>
  );
};

ControlPanel.propTypes = {
  region: PropTypes.string.isRequired,
  setRegion: PropTypes.func.isRequired,
  errors: PropTypes.number.isRequired,
  setErrors: PropTypes.func.isRequired,
  seed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setSeed: PropTypes.func.isRequired,
  randomizeSeed: PropTypes.func.isRequired,
};

export default ControlPanel;
