import React, { useState } from 'react';

interface BaseFilter {
  type: string,
  name: string,
  value: string
}

interface TextFilter extends BaseFilter {
  type: 'text',
  placeholder?: string
}

interface SelectFilter extends BaseFilter {
  type: 'select',
  options: { text: string, value: string }[]
}

export type Filter = TextFilter | SelectFilter

interface Props {
  filters: Filter[],
  onSubmit: (values: Record<string, string>) => void
}

interface FilterProps {
  className?: string,
  filter: Filter,
  onInput: (value: string) => void
}

const Filter: React.FC<FilterProps> = ({ className = '', filter, onInput }) => {
  const onFilterInput = (event: React.FormEvent) => {
    const inputValue = (event.target as HTMLInputElement).value;
    onInput(inputValue);
  };

  return (
    <>
      { filter.type === 'text' && (
      <input
        className={className}
        type="text"
        name={filter.name}
        aria-label={filter.name}
        value={filter.value}
        placeholder={filter.placeholder}
        onInput={onFilterInput}
      />
      ) }
      { filter.type === 'select' && (
        <select
          className={className}
          name={filter.name}
          aria-label={filter.name}
          value={filter.value}
          onChange={onFilterInput}
        >
          {
            filter.options.map((option) => (
              <option key={option.value} value={option.value}>{ option.text }</option>
            ))
          }
        </select>
      ) }
    </>
  );
};
Filter.defaultProps = {
  className: '',
};

const Filters: React.FC<Props> = ({ filters, onSubmit }) => {
  const [myFilters, setMyFilters] = useState<Record<string, Filter>>(
    filters.reduce((obj, filter) => ({ ...obj, [filter.name]: filter }), {}),
  );

  const onInput = (name: string, value: string) => {
    setMyFilters({
      ...myFilters,
      [name]: {
        ...myFilters[name],
        value,
      },
    });
  };

  const submitFilters = (filtersToSubmit?: typeof myFilters) => {
    onSubmit(
      Object.entries(filtersToSubmit || myFilters).reduce(
        (obj, [name, { value }]) => ({ ...obj, [name]: value }),
        {},
      ),
    );
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitFilters();
  };

  const resetFilters = () => {
    const newFilters = filters.reduce((obj, filter) => ({ ...obj, [filter.name]: filter }), {});
    setMyFilters(newFilters);
    submitFilters(newFilters);
  };

  return (
    <form
      className="inline-flex"
      name="filters"
      aria-label="filters"
      onSubmit={onFormSubmit}
    >
      { filters.map((filter) => (
        <Filter
          key={filter.name}
          className={`
            border-2 rounded border-rose-400 focus:border-rose-700 bg-white outline-none
            px-1 py-0.5 mr-4
            transition-all duration-200 ease-in-out
          `}
          filter={myFilters[filter.name]}
          onInput={(value) => onInput(filter.name, value)}
        />
      )) }
      <button
        className="bg-rose-800 text-white px-2 rounded mr-2"
        type="button"
        aria-label="Apply filters"
        onClick={() => submitFilters()}
      >
        Apply
      </button>
      <button
        className="bg-rose-600 text-white px-2 rounded"
        type="button"
        aria-label="Reset filters"
        onClick={resetFilters}
      >
        Reset
      </button>
    </form>
  );
};

export default Filters;
