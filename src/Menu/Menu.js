import React, { useState, useEffect, useCallback } from 'react';
// import $ from 'jquery';
import cx from 'classnames';
import './Menu.css';

const useItemHover = (align) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const setSubmenuPosition = useCallback((menuItem) => {
    const [label, positionBox] = menuItem.children;
    if (!positionBox) return;

    const setPosition = (key, value) => positionBox.style[key] = `${value}px`

    const { bottom, left, width } = label.getBoundingClientRect();
    const bodyWidth = document.body.offsetWidth;

    setPosition('top', bottom);

    if (align === 'center') {
      setPosition('left', left + width / 2 - positionBox.offsetWidth / 2);
      return;
    }

    const shouldAlignLeft = align === 'left'
      ? (left + positionBox.offsetWidth) <= bodyWidth // right edge is out of viewport
      : left + width - positionBox.offsetWidth < 0; // left edge is out of viewport

    if (shouldAlignLeft) {
      setPosition('left', left);
    } else {
      setPosition('left', left + width - positionBox.offsetWidth);
    }
  }, [align]);

  const onMouseEnter = useCallback((e) => {
    setHoveredItem(e.currentTarget);
    setSubmenuPosition(e.currentTarget);
  }, [setHoveredItem, setSubmenuPosition]);

  const onMouseLeave = useCallback((e) => {
    setHoveredItem(null);
  }, [setHoveredItem]);

  const handleWindowScroll = useCallback(() => {
    if (!hoveredItem) return;
    setSubmenuPosition(hoveredItem);
  }, [hoveredItem, setSubmenuPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [handleWindowScroll]);

  return { onMouseEnter, onMouseLeave };
}

const Item = ({ item, listeners, depth }) => (
  <li className={`item item_${depth}`} {...listeners}>
    <span className="label">{item.label}</span>
    {item.items?.length && (
      <div className={`positionBox positionBox_${depth}`}>
        <List items={item.items} depth={depth + 1} />
      </div>
    )}
  </li>
)

const List = (({ items, listeners, depth = 0 }) => (
  <ul className={`list list_${depth}`}>
    {items.map((item, index) => <Item listeners={listeners} item={item} depth={depth} key={index} />)}
  </ul>
))

export const Menu = ({ items, menuMode, align }) => {
  const listeners = useItemHover(align);
  return (
    <nav className={cx('menu', menuMode === 'scroll' && 'scroll')}>
      <List items={items} listeners={listeners}/>
    </nav>
  )
}
