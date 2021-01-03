import "date-fns"
import React from "react"
import Grid from "@material-ui/core/Grid"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"

export const MaterialUIPickers = ({
  label,
  selectedDate,
  setSelectedDate,
  pickerId,
}) => {
  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id={pickerId}
          label={label}
          value={selectedDate === "" ? null : selectedDate}
          // value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          fullWidth
        />
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default MaterialUIPickers
