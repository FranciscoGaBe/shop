import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  rate: number
}
const Rating: React.FC<Props> = ({ rate }) => {
  const getStar = (index: number) => {
    if (index <= rate) {
      return <FontAwesomeIcon key={index} className="text-yellow-300" icon={faStar} />;
    }
    if (index > Math.ceil(rate)) {
      return <FontAwesomeIcon key={index} className="text-rose-500" icon={faStar} />;
    }

    const percentage = Math.round((rate - Math.floor(rate)) * 100);

    return (
      <div key={index} className="h-full relative flex items-center gap-0.5">
        <FontAwesomeIcon className="text-transparent" icon={faStar} />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${percentage}%` }}>
          <FontAwesomeIcon
            className="text-yellow-300 absolute left-0"
            icon={faStar}
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 overflow-hidden" style={{ width: `${100 - percentage}%` }}>
          <FontAwesomeIcon
            className="text-rose-500 absolute right-0"
            icon={faStar}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="inline-flex items-center gap-2"
      role="img"
      aria-label={`Rating: ${rate} out of 5`}
    >
      <div className="flex gap-0.5 text-xs">
        { new Array(5).fill(0).map((_, index) => index).map((index) => getStar(index + 1)) }
      </div>
      <div className="text-xs">{ rate }</div>
    </div>
  );
};

export default Rating;
