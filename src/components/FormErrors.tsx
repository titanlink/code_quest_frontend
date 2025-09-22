import React from 'react'
import { FieldValues, FormState } from 'react-hook-form'
import { CustomAlert } from './CustomAlert'


interface Props<T extends FieldValues> {
  formState: FormState<T>
}

export const FormErrors = <T extends FieldValues,>({formState}: Props<T>) => {
  return (
    <>
    { Object.entries(formState.errors).length > 0 && (
      <CustomAlert 
      title="Revisar los siguientes criterios" 
      description={
      <ul>
        {Object.entries(formState?.errors).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value?.message?.toString() ?? ''}
          </li>
        ))}
      </ul>}
      className="mb-4" 
      variant="error" />)}
    </>
  )
}
