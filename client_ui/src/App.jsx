import './App.css';
import { Header } from './components/Header';
import { ChatBox } from './components/ChatBox';
import KeepAlive from './components/KeepAlive';

function App() {
  return (
    <div className="App flex flex-col min-h-screen items-center">
      <KeepAlive />
      <Header />
      <ChatBox />
      
    </div>
  );
}

export default App;
