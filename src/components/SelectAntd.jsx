import React from 'react';
import { Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

const SelectAntd = ({ placeholder, items, registerName, disabled = false }) => (
  <Controller
    name={registerName}
    render={({ field }) => (
      <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp='label'
        value={field.value || undefined}
        onChange={(value) => field.onChange(value)}
        disabled={disabled}
        options={items?.map((item) => ({
          value: item.id,
          label: item.name,
        }))}
        style={{ width: '100%' }}
        className='select-antd-custom font-Lato'
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        popupClassName='select-antd-dropdown'
      />
    )}
  />
);
export default SelectAntd;
