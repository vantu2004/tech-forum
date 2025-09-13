// src/components/OTPInput.jsx
import { useRef } from "react";

const OTPInput = ({ code, setCode, length = 6 }) => {
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    const onlyDigits = value.replace(/\D/g, "");
    const newCode = [...code];
    newCode[index] = onlyDigits.slice(0, 1);
    setCode(newCode);
    if (onlyDigits && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const text =
      (e.clipboardData || window.clipboardData).getData("text") || "";
    const digits = text
      .replace(/\D/g, "")
      .slice(0, length - index)
      .split("");
    if (!digits.length) return;
    const newCode = [...code];
    for (let i = 0; i < digits.length; i++) {
      newCode[index + i] = digits[i];
    }
    setCode(newCode);
    const nextIndex = Math.min(index + digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1)
      inputRefs.current[index + 1]?.focus();
  };

  return (
    <div className="flex justify-between gap-2">
      {code.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          className="w-12 h-12 text-center text-2xl font-semibold border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
