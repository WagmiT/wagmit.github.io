import logo from './logo.svg';
import './App.css';
import { MainHeader } from './component/Header/Header';
import { IndexPage } from './route';

function App() {
  return (
    <div>
      <MainHeader />
      <IndexPage />
    </div>
  );
}

export default App;
