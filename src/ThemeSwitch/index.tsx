import { theme } from 'antd';
import classNames from 'classnames';
import React from 'react';
import dark_img from './images/dark.png';
import light_img from './images/light.png';
import style from './index.module.scss';

const { useToken } = theme;

type ThemeSwitchProps = {
  darkMode?: boolean;
  setTheme?: () => void;
};
const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { darkMode = false, setTheme } = props;
  const { token } = useToken();

  return (
    <div
      className={classNames(style.themeSwitch, 'cursor')}
      onClick={() => setTheme?.()}
      style={{ backgroundColor: token.colorBorder }}
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
