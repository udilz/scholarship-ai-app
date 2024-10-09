import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { tv, VariantProps } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

const checkBoxStyle = tv({
  base: 'flex items-center justify-center border rounded-md gap-2',
  variants: {
    variant: {
      primary: 'border-primary-500 ',
      secondary: 'border-secondary-50/50 ',
      violet: 'border-violet-600 ',
    },
    size: {
      sm: 'w-4 h-4 p-2',
      md: 'w-5 h-5 p-2',
      lg: 'w-6 h-6 p-2',
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  },
});

type TCheckBox = VariantProps<typeof checkBoxStyle>;
interface CheckboxProps extends TCheckBox, React.ComponentPropsWithRef<typeof RadixCheckbox.Root> {
  label: string
}

export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className="flex items-center gap-1">
      <RadixCheckbox.Root className={twMerge(checkBoxStyle({ ...props }), props.className)} id={props.label}>
        <RadixCheckbox.Indicator>
          <Check size={10} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label htmlFor={props.label}>{props.label}</label>
    </div>
  );
};
