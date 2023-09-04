# ThemeSwitch

主题切换开关

```jsx
import { ThemeSwitch } from '@infte/components';
import { useEffect, useState } from 'react';
import { Button } from 'antd';

export default () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <ThemeSwitch
        setTheme={() => setIsVisible(!isVisible)}
        darkMode={isVisible}
      />
    </div>
  );
};
```
