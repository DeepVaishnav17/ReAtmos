import { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options, placeholder, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={ref}>
      <div
        className={`custom-select-box ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span>{value ? value.label : placeholder}</span>
        <svg
          className={`arrow ${open ? "rotate" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      {open && (
        <ul className="custom-select-list">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={value?.value === opt.value ? "selected" : ""}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
