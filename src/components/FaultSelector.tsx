//To use this in your UI (React), bind these codes to your simulation state. 
//When a user selects a fault type, the engine should trigger the corresponding relay logic.


import { powerSystemFaults } from '../data/faultCodes';

export const FaultSelector = ({ onSelectFault }) => {
  return (
    <select onChange={(e) => onSelectFault(e.target.value)}>
      {powerSystemFaults.map((f) => (
        <option key={f.code} value={f.code}>
          {f.code}: {f.description}
        </option>
      ))}
    </select>
  );
};
