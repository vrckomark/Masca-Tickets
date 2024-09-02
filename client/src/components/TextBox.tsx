import React from "react";

interface TextBoxProps {
  label: string;
  customStyle?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ label, customStyle }) => {
  return (
    <div className={`p-4 rounded-lg bg-white bg-opacity-5 ${customStyle}`}>
      {label}
    </div>
  );
};

export default TextBox;
