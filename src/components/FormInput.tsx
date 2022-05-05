import React, { useState } from 'react';

interface Props {
  type?: HTMLInputElement['type'],
  value?: string,
  name?: string,
  onInput?: (value: string) => void
}

const FormInput: React.FC<Props> = ({
  type = 'text', value = '', name = '', onInput = () => undefined,
}) => {
  const [myValue, setMyValue] = useState(value);

  const handleInput = (event: React.FormEvent) => {
    const newValue = (event.target as HTMLInputElement).value;
    setMyValue(newValue);
    onInput(newValue);
  };

  return (
    <div className="my-3">
      { name && <p className="text-left px-1 text-rose-800 font-semibold mb-1">{ name }</p> }
      <input
        className={`
          transition-all duration-200 ease-in-out outline-none px-1 w-full
          border-2 bg-gray-100 border-gray-300 focus:border-rose-800 rounded
        `}
        type={type}
        value={myValue}
        name={name}
        onInput={handleInput}
      />
    </div>
  );
};
FormInput.defaultProps = {
  type: 'text',
  value: '',
  name: '',
  onInput: () => undefined,
};

export default FormInput;
