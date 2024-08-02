import './App.css';
import AppRouter from './appRouter'
import Navbar from './components/navbar/navbar.component'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Provider } from 'react-redux'
import store from './redux/store.redux';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Navbar />
          <AppRouter />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
