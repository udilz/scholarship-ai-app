
import { FormWrapper } from './form.wrapper';
import { Select } from '@/components/ui/select';
import { pendanaanBeasiswa } from '@/data/scholarshipData';
import { Textarea } from '@/components/ui/textarea';

type ScholarshipData = {
  tipePendanaan: string;
  preference: string;
};
type ScholarshipFormProps = ScholarshipData &{
  updateFields: (fields: Partial<ScholarshipData>) => void;
};

export const FundingForm = ({ tipePendanaan, preference, updateFields }: ScholarshipFormProps) => {
  return (
    <FormWrapper title="Tell us about ur needs">
      <Select
        caption="Tipe pendanaan beasiswa"
        options={pendanaanBeasiswa}
        name="tipePendanaanBeasiswa"
        value={tipePendanaan}
        onValueChange={(value) => {
          updateFields({ tipePendanaan: value });
        }}
      ></Select>
      <Textarea rows={4} placeholder="Preferensi beasiswa yang dicari" name="preference" value={preference} onChange={(e) => updateFields({ preference: e.target.value })} />
    </FormWrapper>
  );
};
