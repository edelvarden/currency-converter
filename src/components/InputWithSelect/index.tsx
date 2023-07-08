import { FC, ChangeEvent } from "react"
import "./InputWithSelect.css"

interface InputWithSelectProps {
  value: string | number
  options: string[]
  defaultOption?: string
  onChange: (value: string | number) => void
  onOptionChange: (option: string) => void
}

const InputWithSelect: FC<InputWithSelectProps> = ({
  value,
  options,
  defaultOption,
  onChange,
  onOptionChange,
}) => {
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value
    onChange(newValue)
  }

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const newOption = event.target.value
    onOptionChange(newOption)
  }

  return (
    <div className="input-with-select">
      <input type="number" value={value} onChange={handleValueChange} min="0" />
      <select value={value} onChange={handleOptionChange}>
        {defaultOption && <option value="">{defaultOption}</option>}
        {options
          .filter((option) => option !== defaultOption)
          .map((option, key) => (
            <option key={key} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  )
}

export default InputWithSelect
