const createOnHover = (align) => (e) => {
  console.group('onHover');
  console.log({
    currentTarget: e.currentTarget
  });
  console.groupEnd();
  const $menuItem = $(e.currentTarget);
  const $positionBox = $('> .positionBox', $menuItem);

  // grab the menu item's position relative to its positioned parent
  const { top, left } = $menuItem.position();
  const t = top + 36;

  console.log({
    left,
    width: $menuItem.width()
  });

  // $positionBox.css({ top, left });
  if (align === 'left') $positionBox.css({ top: t, left });
  else if (align === 'right' )$positionBox.css({ top: t, left: left + $menuItem.width() - $positionBox.width() });
  else $positionBox.css({ top: t, left: left + $menuItem.width() / 2 - $positionBox.width() / 2 })
}
