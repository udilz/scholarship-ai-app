import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDown } from 'lucide-react';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import React from 'react';

const selectStyle = tv({
  slots: {
    trigger: 'border p-2 rounded-lg shadow-sm w-full flex justify-between',
    content:
      'overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]',
    selectItem: 'p-3 hover:outline-none hover:bg-primary-500 hover:text-white',
  },
});

interface SelectProps extends React.ComponentPropsWithRef<'select'> {
  caption: string;
  options: Record<string, string>[];
  onValueChange?: (value: string) => void;
  value?: string;
}

export const Select = (props: SelectProps) => {
  return (
    <RadixSelect.Root value={props.value} onValueChange={props.onValueChange}>
      <RadixSelect.Trigger className={twMerge((selectStyle.slots.trigger), props.className)}>
        <RadixSelect.Value placeholder={props.caption} />
        <RadixSelect.Icon className="text-violet11">
          <ChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={selectStyle.slots.content}>
          <RadixSelect.Viewport>
            {props.options.map(({ value, label }) => {
              return (
                <RadixSelect.Item value={value} className={selectStyle.slots.selectItem}>
                  <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              );
            })}
          </RadixSelect.Viewport>
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};