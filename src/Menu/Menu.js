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

const Item = ({ item, align, direction, subMenuMode, depth = 0 }) => {
  const listeners = getListeners(depth, align, direction, subMenuMode);

  return (
    <li
      className={`item item_${depth}`}
      {...listeners}
    >
      <a className="label" href="www.google.com">{item.label}</a>
      {item.items?.length && (
        <div className={`positionBox positionBox_${depth + 1}`}>
          <List depth={depth + 1}>
            {item.items.map((item, index) => (
              <Item
                item={item}
                align={align}
                direction={direction}
                subMenuMode={subMenuMode}
                key={index}
              />
            ))}
          </List>
        </div>
      )}
    </li>
  )
}

const List = (({ children, depth = 0 }) => (
  <ul className={`list list_${depth}`}>
    {children}
  </ul>
))

export const Menu = ({ items, menuMode, subMenuMode, align, direction }) => {
  return (
    <nav className={cx('menu', menuMode, subMenuMode, direction)}>
      <List>
        {items.map((item, index) => (
          <Item
            item={item}
            align={align}
            direction={direction}
            subMenuMode={subMenuMode}
            key={index}
          />
        ))}
      </List>
    </nav>
  )
}
