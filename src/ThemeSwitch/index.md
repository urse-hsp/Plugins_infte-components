# ThemeSwitch

This is an example component.123

```jsx
import ThemeSwitch from './index.tsx';
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
