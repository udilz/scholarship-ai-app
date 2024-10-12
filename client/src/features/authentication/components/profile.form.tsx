import { Input } from '@/components/ui/input';

type profileData = {
  nama: string;
  email: string;
  password: string;
};
type profileFormProps = profileData & {
  updateFields: (fields: Partial<profileData>) => void;
};

export const ProfileForm = ({ nama, email, password, updateFields }: profileFormProps) => {
  return (
    <>
      <div className="space-y-4">
        <section>
          <h3 className="text-xl font-bold">Register</h3>
          <p className='text-sm'>Create an account to continue</p>
        </section>
        <div className="space-y-2">
          <Input type="text"  placeholder="Name" name="nama" value={nama} onChange={(e) => updateFields({ nama: e.target.value })} />
          <Input type="email"  placeholder="Email" name="email" value={email} onChange={(e) => updateFields({ email: e.target.value })} />
          <Input type="password"  placeholder="Password" name="password" value={password} onChange={(e) => updateFields({ password: e.target.value })} />
        </div>
      </div>
    </>
  );
};
