import "./tailwind.css"
import "./App.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import Routing from "./Routing"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./utils/muiTheme"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Routing />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App