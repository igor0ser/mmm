import { useCallback, useEffect, useState } from 'react'

const createSetSubmenuPosition = (align) => (menuItem) => {
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
}

export const useItemHover = (align) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const setSubmenuPosition = useCallback(createSetSubmenuPosition(align), [align]);

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

  return { onMouseEnter, onMouseLeave, hoveredItem };
}
