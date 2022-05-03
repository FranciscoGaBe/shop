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
  const onFilterInput = (event: React.FormEvent) => {
    const inputValue = (event.target as HTMLInputElement).value;
    onInput(inputValue);
  };

  return (
    <div>
      { filter.type === 'text' && (
      <input
        type="text"
        name={filter.name}
        aria-label={filter.name}
        value={filter.value}
        onInput={onFilterInput}
      />
      ) }
      { filter.type === 'select' && (
        <select
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
    </div>
  );
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
    <form name="filters" aria-label="filters" onSubmit={onFormSubmit}>
      { filters.map((filter) => (
        <Filter
          key={filter.name}
          filter={myFilters[filter.name]}
          onInput={(value) => onInput(filter.name, value)}
        />
      )) }
      <button type="button" onClick={() => submitFilters()}>Apply filters</button>
      <button type="button" onClick={resetFilters}>Reset filters</button>
    </form>
  );
};

export default Filters;
