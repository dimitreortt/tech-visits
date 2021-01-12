import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles"
import { theme } from "../materialUI/theme"

//Components
import InputFieldId from '../components/InputFieldId';

const NotFoundPage = ({history}) => {

  console.log("props.history", history);

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <InputFieldId history={history} />
      </MuiThemeProvider>
  </React.Fragment>
  )

}

export default NotFoundPage
