const setSubmenuPosition = (menuItem, align) => {
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

let setProperPosition = null;

export const createListenersDepth0 = (align) => {
  const onMouseEnter = (e) => {
    const menuItem = e.currentTarget;
    setProperPosition = () => setSubmenuPosition(menuItem, align);
    setProperPosition();
    window.addEventListener('scroll', setProperPosition);
    menuItem.parentNode.addEventListener('scroll', setProperPosition);
  };

  const onMouseLeave = (e) => {
    const menuItem = e.currentTarget;
    window.removeEventListener('scroll', setProperPosition);
    menuItem.parentNode.addEventListener('scroll', setProperPosition);
  };

  return {
    onMouseEnter,
    onMouseLeave,
    onFocusCapture: onMouseEnter,
    onBlurCapture: onMouseLeave,
  }
}
