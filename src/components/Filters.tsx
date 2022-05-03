import React, { useState } from 'react';

interface BaseFilter {
  type: string,
  name: string,
  value: string
}

interface TextFilter extends BaseFilter {
  type: 'text'
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
  filter: Filter,
  onInput: (value: string) => void
}

const Filter: React.FC<FilterProps> = ({ filter, onInput }) => {
  const [value, setValue] = useState(filter.value);

  const onFilterInput = (event: React.FormEvent) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setValue(inputValue);
    onInput(inputValue);
  };

  return (
    <div>
      { filter.type === 'text' && (
      <input
        type="text"
        name={filter.name}
        aria-label={filter.name}
        value={value}
        onInput={onFilterInput}
      />
      ) }
      { filter.type === 'select' && (
        <select
          name={filter.name}
          aria-label={filter.name}
          value={value}
          onChange={onFilterInput}
        >
          {
            filter.options.map((option) => (
              <option key={option.value} value={option.value}>{ option.text }</option>
            ))
          }
        </select>
      ) }
    </div>
  );
};

const Filters: React.FC<Props> = ({ filters, onSubmit }) => {
  const [values, setValues] = useState<Record<string, string>>(
    filters.reduce((obj, filter) => ({ ...obj, [filter.name]: filter.value.toString() }), {}),
  );

  const onInput = (name: string, value: string) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form name="filters" aria-label="filters">
      { filters.map((filter) => (
        <Filter
          key={filter.name}
          filter={filter}
          onInput={(value) => onInput(filter.name, value)}
        />
      )) }
      <button type="button" onClick={() => onSubmit(values)}>Apply filters</button>
    </form>
  );
};

export default Filters;
