import classNames from 'classnames';
import React from 'react';
import dark_img from './images/dark.png';
import light_img from './images/light.png';
import style from './index.module.scss';

type ThemeSwitchProps = {
  darkMode?: boolean;
  setTheme?: () => void;
};
const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { darkMode = false, setTheme } = props;

  return (
    <div
      className={classNames(style.themeSwitch, 'cursor')}
      onClick={() => setTheme?.()}
    >
      <img src={light_img} alt="" />
      <img src={dark_img} alt="" />
      <div
        className={classNames(
          style.themeSwitchActive,
          !darkMode ? style.light : style.dark,
        )}
      />
    </div>
  );
};
export default ThemeSwitch;
