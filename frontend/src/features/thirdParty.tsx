export const OpenContactUsWidget = (): void => {
  window.FreshworksWidget('open');
};

export const HideContactUsWidget = (): void => {
  window.FreshworksWidget('hide');
};

export const ShowCookiesDrawer = (): void => {
  window.Optanon.ToggleInfoDisplay();
};
