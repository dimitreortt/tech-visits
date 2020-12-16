import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const ValueTypeSelect = ({ typeOptions, valueType, setValueType }) => {
  const classes = useStyles()
  // const [valueType, setValueType] = useState("string")

  const handleChange = (event) => {
    setValueType(event.target.value)
  }

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id="demo-simple-select-filled-label">Value Type</InputLabel>
      <Select
        fullWidth
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={valueType}
        onChange={handleChange}
      >
        {typeOptions.map((type, index) => (
          <MenuItem value={type} key={index}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default ValueTypeSelect