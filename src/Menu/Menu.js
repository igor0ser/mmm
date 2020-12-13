import React from 'react';
import jquery from 'jquery';
import cx from 'classnames';
import './Menu.css';

const Item = ({ item, depth }) => (
  <li className={`item item_${depth}`}>
    <span className="label">{item.label}</span>
    {item.items?.length && (
      <List items={item.items} depth={depth + 1} />
    )}
  </li>
)

const List = (({ items, depth = 0 }) => (
  <ul className={`list list_${depth}`}>
    {items.map((item, index) => <Item item={item} depth={depth} key={index} />)}
  </ul>
))

export const Menu = ({ items, menuMode }) => (
  <nav className={cx('menu', menuMode === 'scroll' && 'scroll')}>
    <List items={items} />
  </nav>
)
