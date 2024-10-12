import { Button } from '@/components/ui/button';
import { StepBack } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { registerUser } from '../services/register';
import { useMultiStepForm } from '../hooks/useMultiStepForm';
import { EducationalForm } from './educational.form';
import { FundingForm } from './funding.form';
import { Link, useNavigate } from 'react-router-dom';
import { ProfileForm } from './profile.form';

type FormData = {
  nama: string;
  email: string;
  password: string;
  jenjang: string;
  jurusan: string;
  tipePendanaan: string;
  preference: string;
};

const INITIAL_DATA: FormData = {
  nama: '',
  email: '',
  password: '',
  jenjang: '',
  jurusan: '',
  tipePendanaan: '',
  preference: '',
};

export const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, back, next, isLastStep } = useMultiStepForm([<ProfileForm {...data} updateFields={updateFields} />, <EducationalForm {...data} updateFields={updateFields} />, <FundingForm {...data} updateFields={updateFields} />]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();

    // Call API to register the user
    handleSubmitRegister();
  }

  const {
    mutate: handleSubmitRegister,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationKey: ['register'],
    mutationFn: () => registerUser({ name: data.nama, email: data.email, password: data.password, educational_background: data.jenjang, major: data.jurusan, funding_need: data.tipePendanaan, preference: data.preference }),
    onSuccess: () => navigate('/'),
  });

  return (
    <main className="h-full w-full font-poppins">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="absolute flex h-full w-2/4 justify-start">
        <div className="relative w-full">
          <img className="absolute left-0 top-0 h-full w-full object-cover" src="/images/college.jpg" alt="College Image" />
        </div>
      </div>
      <div className="flex h-full justify-end">
        <div className="flex h-full w-2/4 items-center justify-center">
          <div className="w-[300px] space-y-2">
            <div className="flex justify-end">
              <p className="font-bold">
                {currentStepIndex + 1}/{steps.length}
              </p>
            </div>
            <form onSubmit={onSubmit}>
              {step}
              <div className="space-y-2">
                <Button type="submit" disabled={isPending} className="mt-2 flex w-full justify-center">
                  {isLastStep ? 'Register' : 'Next'}
                </Button>
                {!isFirstStep && (
                  <Button type="button" onClick={back} startContent={<StepBack />} variant="outline" className="flex w-full justify-center">
                    Back
                  </Button>
                )}
              </div>
            </form>
            {isError && <div className="text-center text-sm font-medium text-rose-600">{error?.message}</div>}
            {isFirstStep && (
              <div className="text-sm">
                Have an account?{' '}
                <Link className="font-semibold text-blue-600" to="/login">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
