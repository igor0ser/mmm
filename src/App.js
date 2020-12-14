import { useState } from 'react';
import { Menu } from './Menu/Menu';
import { items } from './Menu/data.json';
import './App.css';

const menuModes = ['scroll', 'wrap'];
const subMenuModes = ['flyout', 'columnMenu', 'columnStretched']
const aligns = ['left', 'center', 'right'];
const directions = ['ltr', 'rtl'];

const ButtonRow = ({ variants, current, set }) => (
  <div className="row">
    {variants.map((v) => (
      <button
        disabled={v === current}
        onClick={() => set(v)}
        key={v}
      >
        {v}
      </button>
    ))}
  </div>
)

const App = () => {
  const [menuMode, setMenuMode] = useState(menuModes[0]);
  const [subMenuMode, setSubMenuMode] = useState(subMenuModes[0]);
  const [align, setAlign] = useState(aligns[0]);
  const [direction, setDirection] = useState(directions[0]);

  return (
    <div className="wrapper">
      <Menu
        items={items}
        menuMode={menuMode}
        subMenuMode={subMenuMode}
        align={align}
        direction={direction}
      />
      <div className="buttons">
        <ButtonRow variants={menuModes} current={menuMode} set={setMenuMode} />
        <ButtonRow variants={subMenuModes} current={subMenuMode} set={setSubMenuMode} />
        <ButtonRow variants={aligns} current={align} set={setAlign} />
        <ButtonRow variants={directions} current={direction} set={setDirection} />
      </div>
    </div>
  );
}

export default App;
