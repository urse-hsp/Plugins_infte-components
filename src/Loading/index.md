# Loading

```tsx
import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';

import {
  Loader,
  Loading,
  LoadingElement,
  LoadingElementWrapper,
} from '@infte/components';

export default () => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setLoading2(false);
      setLoading3(false);
    }, 2500);
  }, [loading, loading2, loading3]);

  return (
    <Space direction="vertical">
      <Loader />
      <br />

      <div>
        <Button type="primary" onClick={() => setLoading(true)}>
          Loading
        </Button>
        {<Loading show={loading} />}
      </div>

      <>
        <Button type="primary" onClick={() => setLoading2(true)}>
          LoadingElement
        </Button>
        {loading2 && LoadingElement}
      </>

      <>
        <Button type="primary" onClick={() => setLoading3(true)}>
          LoadingElementWrapper
        </Button>
        {loading3 && LoadingElementWrapper}
      </>
    </Space>
  );
};
```
