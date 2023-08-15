# Modal

This is an example component.123

```jsx
import Modal from './index.tsx';
import { useEffect, useState } from 'react';
import { Button } from 'antd';

export default () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setIsVisible(true)}>
        isVisible
      </Button>
      <Modal
        onClose={() => setIsVisible(false)}
        isVisible={isVisible}
        title="这是标题"
        content="这是内容"
        footer="footer"
      />
    </div>
  );
};
```
