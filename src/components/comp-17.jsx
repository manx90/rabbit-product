import { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SelectNative } from '@/components/ui/select-native';

export default function Component() {
  const id = useId();
  return (
    <div className='*:not-first:mt-2'>
      <Label htmlFor={id}>Input with start select</Label>
      <div className='shadow-xs flex rounded-md'>
        <SelectNative className='w-fit rounded-e-none text-muted-foreground shadow-none hover:text-foreground'>
          <option value='https://'>https://</option>
          <option value='http://'>http://</option>
          <option value='ftp://'>ftp://</option>
          <option value='sftp://'>sftp://</option>
          <option value='ws://'>ws://</option>
          <option value='wss://'>wss://</option>
        </SelectNative>
        <Input
          id={id}
          className='-ms-px rounded-s-none shadow-none focus-visible:z-10'
          placeholder='192.168.1.1'
          type='text'
        />
      </div>
    </div>
  );
}
