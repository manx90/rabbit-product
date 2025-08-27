import { useId } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Controller, useFormContext } from 'react-hook-form';

export default function SelectingCart({
  items,
  placeholder = 'Select option',
  registerName,
  disabled,
}) {
  const id = useId();
  const { control } = useFormContext();

  return (
    <div className='*:not-first:mt-2'>
      <Controller
        control={control}
        name={registerName}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Select
            id={id}
            dir='rtl'
            disabled={disabled}
            value={field.value || ''}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <SelectTrigger
              id={id}
              className={`border-transparent bg-muted shadow-none ${
                disabled ? 'opacity-50' : ''
              }`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {items?.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
