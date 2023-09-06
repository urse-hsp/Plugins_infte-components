import { theme } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useTheme } from '../useTheme';
import dark_img from './images/dark.png';
import light_img from './images/light.png';
import style from './index.module.scss';

const { useToken } = theme;

const ThemeSwitch = () => {
  const { token } = useToken();
  const { setTheme, darkMode } = useTheme();
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
