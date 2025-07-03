import React from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
  Control,
  ControllerRenderProps,
  Path,
} from 'react-hook-form';

export const Form = <T extends Record<string, unknown>>({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
}) => {
  const methods = useForm<T>();
  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { ...methods })
          : child,
      )}
    </form>
  );
};

export const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <div className="form-item">{children}</div>;
};

export const FormLabel = ({ children }: { children: React.ReactNode }) => {
  return <label className="form-label">{children}</label>;
};

export const FormField = <T extends FieldValues>({
  name,
  control,
  render,
}: {
  name: Path<T>;
  control: Control<T>;
  render: (field: ControllerRenderProps<T>) => React.ReactNode;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const element = render(field);
        if (React.isValidElement(element)) {
          return element;
        }
        throw new Error(
          'The render function must return a valid ReactElement.',
        );
      }}
    />
  );
};

export const FormControl = ({ children }: { children: React.ReactNode }) => {
  return <div className="form-control">{children}</div>;
};

export const FormMessage = ({ message }: { message?: string }) => {
  return message ? <p className="form-message">{message}</p> : null;
};
