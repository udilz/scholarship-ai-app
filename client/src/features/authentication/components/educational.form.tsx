import { FormWrapper } from './form.wrapper';
import { Select } from '@/components/ui/select';
import { jenjangBeasiswa, majorIndonesia } from '@/data/scholarshipData';

type EducationalData = {
  jenjang: string;
  jurusan: string;
}
type EducationalFormProps = EducationalData &{
  updateFields: (fields: Partial<EducationalData>) => void;
}

export const EducationalForm = ({ jenjang, jurusan, updateFields }: EducationalFormProps) => {
  return (
    <FormWrapper title="Tell us about your education">
      <Select 
        caption="Educational Background" 
        options={jenjangBeasiswa}  
        name="jenjangBeasiswa" 
        value={jenjang} 
        onValueChange={(value) => {
          updateFields({ jenjang: value });
        }} 
      />
      <Select 
        caption="Major" 
        options={majorIndonesia} 
        name="majorIndonesia" 
        value={jurusan} 
        onValueChange={(value) => updateFields({ jurusan: value })} 
      />
    </FormWrapper>
  );
};

