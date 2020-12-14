import React from 'react';
import cx from 'classnames';
import './Menu.css';
import { createListenersDepth0 } from './item0Hover';
import { createListenersDepth1 } from './item1Hover';

const getListeners = (depth, align, direction, subMenuMode) => {
  if (subMenuMode !== 'flyout') {
    return {};
  }
  if (depth === 0) return createListenersDepth0(align);
  if (depth === 1) return createListenersDepth1(direction);
  return {};
}

const Item = ({ item, align, direction, subMenuMode, depth }) => {
  const listeners = getListeners(depth, align, direction, subMenuMode);

  return (
    <li
      className={`item item_${depth}`}
      {...listeners}
    >
      <a className="label" href="www.google.com">{item.label}</a>
      {item.items?.length && (
        <div className={`positionBox positionBox_${depth + 1}`}>
          <List
            items={item.items}
            depth={depth + 1}
            align={align}
            direction={direction}
            subMenuMode={subMenuMode}
          />
        </div>
      )}
    </li>
  )
}

const List = (({ items, align, direction, subMenuMode, depth = 0 }) => (
  <ul className={`list list_${depth}`}>
    {items.map((item, index) => (
      <Item
        item={item}
        depth={depth}
        align={align}
        direction={direction}
        subMenuMode={subMenuMode}
        key={index}
      />
    ))}
  </ul>
))

export const Menu = ({ items, menuMode, subMenuMode, align, direction }) => {
  return (
    <nav className={cx('menu', menuMode, subMenuMode, direction)}>
      <List
        items={items}
        align={align}
        direction={direction}
        subMenuMode={subMenuMode}
      />
    </nav>
  )
}
