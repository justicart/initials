import { useCallback, useState, useRef, useEffect } from "react";

const ResizableInput = ({forceResize, value, handleChange}) => {
  const [fontSize, setFontSize] = useState(24); // Default font size
  const inputRef = useRef(null);

  const adjustFontSize = useCallback(() => {
    if (!inputRef.current) return;

    const input = inputRef.current;
    const inputWidth = input.clientWidth; // Get visible width
    const computedStyle = window.getComputedStyle(input);
    const padding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

    const context = document.createElement("canvas").getContext("2d");
    let newFontSize = 24; // Start with default font size
    context.font = `${newFontSize}px ${computedStyle.fontFamily}`;

    // Reduce font size until text fits inside the input width
    while (context.measureText(value).width > inputWidth - padding - 5 && newFontSize > 12) {
      newFontSize -= 1;
      context.font = `${newFontSize}px ${computedStyle.fontFamily}`;
    }

    setFontSize(newFontSize);
  }, [value]);

  useEffect(() => {
    adjustFontSize();
  }, [value, forceResize, adjustFontSize]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value ?? ""}
      onChange={(e) => handleChange(e.target.value)}
      style={{
        fontSize: `${fontSize}px`,
      }}
    />
  );
};

export default ResizableInput;