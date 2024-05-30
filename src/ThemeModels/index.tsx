import { ConfigProvider, theme } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import React, { type ReactNode } from 'react';
import ThemeSwitch from './ThemeSwitch';
import utils, { useTheme } from './useTheme';

// const { useToken } = theme;

// interface AppPageType {
//   children: ReactNode;
// }

const algorithmList: any = {
  dark: theme.darkAlgorithm,
  light: theme.defaultAlgorithm,
};

// const App: React.FC<AppPageType> = (props) => {
//   const { theme: themeType } = utils.useContainer();
//   const { token } = useToken();

//   useLayoutEffect(() => {
//     // 创建一个<style>元素
//     let styleElement = document.createElement('style');
//     // 定义CSS规则，包含变量
//     let cssRule = `
//     :root {
//       background-color: ${token.colorBgBase};
//       color: ${token.colorTextBase};
//       --colorBgLayout: ${token.colorBgLayout};
//       --colorBgBase: ${token.colorBgBase};
//       --colorTextBase: ${token.colorTextBase};
//       --colorPrimary: ${token.colorPrimary};
//       --colorBorder: ${token.colorBorder};
//       --colorSplit: ${token.colorSplit};
//       --colorPrimaryBg: ${token.colorPrimaryBg};
//     }`;

//     // 将CSS规则添加到<style>元素中
//     styleElement.appendChild(document.createTextNode(cssRule));
//     // 将<style>元素添加到文档头部
//     document.head.appendChild(styleElement);
//   }, [themeType]);
//   return <>{props.children}</>;
// };

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
