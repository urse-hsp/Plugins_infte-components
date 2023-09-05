# ThemeConfigProvider

- 主题配置
- 根据 ConfigProvider 全局化配置二次封装（包装了亮色模式与暗色模式 自动跟随系统主题）
- 提供了 css 变量供 css 使用 也可以根据 ColorVariables 函数进行自定变量

## 使用方法

- ThemeConfigProvider 包裹在最外层提供 Provider
- ThemeSwitch 按钮进行切换黑夜与明亮

## 入参

- children: ReactNode;
- ColorVariables?: (r: HTMLElement, token: GlobalToken) => any; // 配置 css 主题颜色变量
- isFollowTheSystem?: boolean;
- ...ConfigProviderProps / ConfigProvider 全局化配置参数一致

## demo

```jsx
import { ThemeConfigProvider } from '@infte/components';
import { useEffect, useState } from 'react';
import { Button, Card, Space } from 'antd';

const { ThemeSwitch } = ThemeConfigProvider;

export default () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ThemeConfigProvider>
      <div>
        <ThemeSwitch />
      </div>

      <Space direction="vertical" size={16}>
        <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card
          size="small"
          title="Small size card"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
    </ThemeConfigProvider>
  );
};
```
