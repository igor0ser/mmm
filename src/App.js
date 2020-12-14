import { useState } from 'react';
import { Menu } from './Menu/Menu';
import { items } from './Menu/data.json';
import './App.css';

const menuModes = ['scroll', 'wrap'];
const aligns = ['left', 'center', 'right'];

const ButtonRow = ({ variants, current, set }) => (
  <div className="row">
    {variants.map((v) => (
      <button
        disabled={v === current}
        onClick={() => set(v)}
      >
        {v}
      </button>
    ))}
  </div>
)

const App = () => {
  const [menuMode, setMenuMode] = useState(menuModes[0]);
  const [align, setAligns] = useState(aligns[0]);

  return (
    <div className="wrapper">
      <Menu
        items={items}
        menuMode={menuMode}
        align={align}
      />
      <div className="buttons">
        <ButtonRow variants={menuModes} current={menuMode} set={setMenuMode} />
        <ButtonRow variants={aligns} current={align} set={setAligns} />
      </div>
    </div>
  );
}

export default App;
