import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectNative } from '@/components/ui/select-native';

export default function InputPhone({ registerNameInput, registerNameSelect }) {
  const { register, setValue } = useFormContext();
  const id = useId();
  return (
    <div className='*:not-first:mt-2'>
      <Label htmlFor={id}>الهاتف</Label>
      <div className='shadow-xs flex rounded-md'>
        <Input
          id={id}
          className='-ms-px rounded-l-none shadow-none focus:outline-none focus:ring-0 focus-visible:z-10'
          placeholder='ادخل رقم الهاتف'
          type='text'
          {...register(registerNameInput, {
            required: true,
          })}
        />
        <SelectNative
          className='w-fit rounded-r-none text-muted-foreground shadow-none dark:bg-slate-800 dark:hover:text-foreground'
          onChange={(e) => {
            register(registerNameSelect, {
              value: e.target.value,
            });
          }}
        >
          <option
            value='+970'
            className='dark:bg-slate-800 dark:hover:bg-slate-800 dark:focus:bg-slate-800'
          >
            +970
          </option>
          <option
            value='+972'
            className='dark:bg-slate-800 dark:hover:bg-slate-800 dark:focus:bg-slate-800'
          >
            +972
          </option>
        </SelectNative>
      </div>
    </div>
  );
}
