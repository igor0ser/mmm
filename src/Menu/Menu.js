import React from 'react';
import cx from 'classnames';
import './Menu.css';
import { createListenersDepth0 } from './item0Hover';
import { createListenersDepth1 } from './item1Hover';

const createListenersByDepth = [
  createListenersDepth0,
  createListenersDepth1,
]

const Item = ({ item, align, depth }) => {
  const createListeners = createListenersByDepth[depth];
  const listeners = createListeners?.(align);

  return (
    <li
      className={`item item_${depth}`}
      {...listeners}
    >
      <span className="label">{item.label}</span>
      {item.items?.length && (
        <div className={`positionBox positionBox_${depth}`}>
          <List items={item.items} depth={depth + 1} align={align} />
        </div>
      )}
    </li>
  )
}

const List = (({ items, align, depth = 0 }) => (
  <ul className={`list list_${depth}`}>
    {items.map((item, index) => (
      <Item
        item={item}
        depth={depth}
        align={align}
        key={index}
      />
    ))}
  </ul>
))

export const Menu = ({ items, menuMode, align }) => {
  return (
    <nav className={cx('menu', menuMode === 'scroll' && 'scroll')}>
      <List items={items} align={align} />
    </nav>
  )
}
