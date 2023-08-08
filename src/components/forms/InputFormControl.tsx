import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import FormHelperText, {
  FormHelperTextProps,
} from '@mui/material/FormHelperText'
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import toTitleCase from '@/utils/toTitleCase'

type InputFormControlProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues, unknown>
  name: Path<TFieldValues>
  label?: string
  FormControlProps?: FormControlProps
  FormHelperTextProps?: FormHelperTextProps
  InputLabelProps?: InputLabelProps
  InputProps?: OutlinedInputProps
}

const InputFormControl = <TFieldValues extends FieldValues>({
  control,
  name,
  label = toTitleCase(name),
  FormControlProps,
  FormHelperTextProps,
  InputLabelProps,
  InputProps,
}: InputFormControlProps<TFieldValues>) => {
  const {
    slotProps: { input: inputSlotProps = {}, root: rootSlotProps = {} } = {},
  } = InputProps || {}

  return (
    <FormControl fullWidth {...FormControlProps}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { value, onBlur, onChange },
          fieldState: { error },
        }) => (
          <>
            <InputLabel
              htmlFor={`${name}-input`}
              id={`${name}-label`}
              {...InputLabelProps}
              error={!!error}
            >
              {label}
            </InputLabel>
            <OutlinedInput
              aria-describedby={error && `${name}-error`}
              id={`${name}-input`}
              {...InputProps}
              error={!!error}
              label={label}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              slotProps={{
                root: rootSlotProps,
                input: {
                  'aria-invalid': !!error,
                  'aria-labelledby': `${name}-label`,
                  ...inputSlotProps,
                },
              }}
            />
            <FormHelperText
              id={`${name}-error`}
              {...FormHelperTextProps}
              error={!!error}
            >
              {error?.message || ' '}
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  )
}

export default InputFormControl
