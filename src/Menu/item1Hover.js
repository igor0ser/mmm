const forceClassName = 'force-revert-direction';

export const createListenersDepth1 = (direction) => {
  const onMouseEnter = (e) => {
    const menuItem = e.currentTarget;
    const [, positionBox] = menuItem.children;
    if (!positionBox) return;

    const bodyWidth = document.body.offsetWidth;
    const { left, right } = positionBox.getBoundingClientRect();

    if (direction === 'ltr' ? right > bodyWidth : left > 0) {
      positionBox.classList.add(forceClassName)
    }
  };

  const onMouseLeave = (e) => {
    const menuItem = e.currentTarget;
    const [, positionBox] = menuItem.children;
    if (!positionBox) return;

    positionBox.classList.remove(forceClassName);
  };

  return {
    onMouseEnter,
    onMouseLeave,
    onFocusCapture: onMouseEnter,
    onBlurCapture: onMouseLeave,
  }
};
