import { useState } from 'react';
import { Menu } from './Menu/Menu';
import { items } from './Menu/data.json';
import './App.css';

const App = () => {
  const [menuMode, setMenuMode] = useState('scroll');

  return (
    <div className="wrapper">
      <Menu
        items={items}
        menuMode={menuMode}
      />
      <div className="buttons">
        <button onClick={() => setMenuMode(m => m === 'scroll' ? 'wrap' : 'scroll')}>
          Menu Mode: {menuMode}
        </button>
      </div>
    </div>
  );
}

export default App;
