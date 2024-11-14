import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectCustom({
  label,
  name,
  options,
  value,
  setValue,
  inputLabelText,
}: {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  value: string;
  setValue: (value: string) => void;
  inputLabelText: string;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-autowidth-label">
          {inputLabelText}
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          fullWidth
          label={label}
          name={name}
        >
          <MenuItem value="">Selecione</MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
