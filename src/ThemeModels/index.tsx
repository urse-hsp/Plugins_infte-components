import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { ConfigProvider, GlobalToken, theme } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import React, { useLayoutEffect, type ReactNode } from 'react';
import ThemeSwitch from './ThemeSwitch';
import utils from './utils';

const { useToken } = theme;

interface AppPageType {
  children: ReactNode;
  ColorVariables?: (r: HTMLElement, token: GlobalToken) => any; // 配置css主题颜色变量
}

const algorithmList: any = {
  dark: theme.darkAlgorithm,
  light: theme.defaultAlgorithm,
};

const App: React.FC<AppPageType> = (props) => {
  const { theme: themeType } = utils.useContainer();
  const { token } = useToken();

  // colorPrimary // 主题色
  // colorSuccess // 成功色
  // colorWarning // 警告色
  // colorError // 危险/报错

  // colorWhite // 不随主题变化的纯白色
  // colorText 文本颜色

  // colorBorder // 边框
  // colorBgElevated// 盒子容器背景
  // colorBgBase // 背景颜色
  useLayoutEffect(() => {
    const r: HTMLElement | any = document.querySelector(':root');
    r.style.backgroundColor = token.colorBgBase; // 背景色
    r.style.color = token.colorTextBase; // 文字色
    r.style.setProperty('--colorBgLayout', token.colorBgLayout); // 页面布局色
    r.style.setProperty('--colorBgBase', token.colorBgBase); // 背景色梯度的基础变量
    r.style.setProperty('--colorTextBase', token.colorTextBase); // 文本色梯度的基础变量
    r.style.setProperty('--colorPrimary', token.colorPrimary); // 主题色
    r.style.setProperty('--colorBorder', token.colorBorder); // 边框颜色
    r.style.setProperty('--colorSplit', token.colorSplit); // 分割线
    r.style.setProperty('--colorPrimaryBg', token.colorPrimaryBg); // 主色浅色背景颜色，一般用于视觉层级较弱的选中状态。
    if (props?.ColorVariables) {
      props?.ColorVariables(r, token);
    }

    // colorBorderBg边框背景
  }, [themeType]);

  return <>{props.children}</>;
};

export const themeColor = 'red';

interface ThemeProps extends AppPageType, ConfigProviderProps {
  children: ReactNode;
  ColorVariables?: (r: HTMLElement, token: GlobalToken) => any; // 配置css主题颜色变量
}

const AppPage: React.FC<ThemeProps> = (props) => {
  const { theme: themeType } = utils.useContainer();
  const algorithm = algorithmList[themeType];
  return (
    /**
     * https://ant-design.antgroup.com/docs/react/compatible-style-cn#where-%E9%80%89%E6%8B%A9%E5%99%A8
     *
     * 样式兼容
     * 支持最近 2 个版本的现代浏览器。如果你需要兼容旧版浏览器，请根据实际需求进行降级处理：
     * `hashPriority` 默认为 `low`，配置为 `high` 后  会移除 `:where` 选择器封装
     * 关闭 :where 降权后，你可能需要手动调整一些样式的优先级。
     *
     * CSS 逻辑属性
     * 为了统一 LTR 和 RTL 样式，Ant Design 使用了 CSS 逻辑属性。例如原 margin-left 使用 margin-inline-start 代替，使其在 LTR 和 RTL 下都为起始位置间距。如果你需要兼容旧版浏览器（如 360 浏览器、QQ 浏览器 等等），可以通过 @ant-design/cssinjs 的 StyleProvider 配置 transformers 将其转换：
     *
     */

    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <ConfigProvider
        csp={{ nonce: 'YourNonceCode' }}
        {...props}
        theme={{
          algorithm: [algorithm],
          ...props.theme,
        }}
      >
        <App ColorVariables={props.ColorVariables}>{props.children}</App>
      </ConfigProvider>
    </StyleProvider>
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
export default ThemeConfigProvider;
