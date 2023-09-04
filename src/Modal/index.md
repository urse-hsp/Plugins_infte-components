# Modal

Modal 对话框

```jsx
import { Modal } from '@infte/components';
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
