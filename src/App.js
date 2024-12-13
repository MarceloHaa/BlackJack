import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './componets/Game/Game';
import Home from './componets/Home/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
