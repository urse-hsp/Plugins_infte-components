import { ConfigProvider, theme } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import React, { type ReactNode } from 'react';
import ThemeSwitch from './ThemeSwitch';
import utils, { useTheme } from './useTheme';

const algorithmList: any = {
  dark: theme.darkAlgorithm,
  light: theme.defaultAlgorithm,
};

interface ThemeProps extends ConfigProviderProps {
  children: ReactNode;
}

const AppPage: React.FC<ThemeProps> = (props) => {
  const { theme: themeType } = utils.useContainer();
  const algorithm = algorithmList[themeType];
  return (
    <ConfigProvider
      {...props}
      theme={{
        algorithm: [algorithm],
        ...props.theme,
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};

interface ThemeConfigProviderProps extends ThemeProps {
  isFollowTheSystem?: boolean;
}
const ThemeConfigProvider = (props: ThemeConfigProviderProps) => {
  const { isFollowTheSystem = true } = props;
  return (
    <utils.Provider initialState={{ isFollowTheSystem: isFollowTheSystem }}>
      <AppPage {...props} />
    </utils.Provider>
  );
};

ThemeConfigProvider.ThemeSwitch = ThemeSwitch;

export { useTheme };
export default ThemeConfigProvider;
