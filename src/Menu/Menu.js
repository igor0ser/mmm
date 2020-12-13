import React from 'react';
import $ from 'jquery';
import cx from 'classnames';
import './Menu.css';

const onHover = (e) => {
  console.group('onHover');
  console.log({
    currentTarget: e.currentTarget
  });
  console.groupEnd();
  const $menuItem = $(e.currentTarget);
  const $submenu = $('> .list', $menuItem);

  // grab the menu item's position relative to its positioned parent
  const { top, left } = $menuItem.position();

  // $submenu.css({ top, left });
  $submenu.css({ top: top + 36, left });
}

const Item = ({ item, depth }) => (
  <li className={`item item_${depth}`} onMouseEnter={onHover}>
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
