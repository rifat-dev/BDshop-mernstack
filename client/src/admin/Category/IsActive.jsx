import { useState } from "react";

const IsActive = ({ id, value, isActiveUpdate }) => {
  const [active, setActive] = useState(value);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <div className="form-check form-switch pl-5">
      <input
        className="form-check-input"
        type="checkbox"
        name="isActive"
        id="isActive"
        checked={active}
        onChange={() => onClick()}
      />
    </div>
  );
};

export default IsActive;
