type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <div className="space-y-4">
        <h1>{title}</h1>
        {children}
      </div>
    </>
  );
};
