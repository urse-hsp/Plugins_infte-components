import { useCallback, useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
  const webSocketRef = useRef<WebSocket>();
  const [data, setData] = useState<any>(null);
  const [reset, setReset] = useState<boolean>(false);

  const onClose = (evt: any) => {
    console.warn('onclose 断开连接', evt);
    setReset(true);
  };
  const onError = (evt: any) => {
    console.warn('onerror 连接失败', evt);
  };
  const onMessage = (res: any) => {
    if (res?.data) {
      console.warn('onmessage 消息', res, JSON.parse(res.data));

      setData(JSON.parse(res.data));
    }
  };
  const onOpen = (evt: any) => {
    console.warn('onopen', evt);
  };

  const Close = (evt: any) => {
    console.warn('close', evt);
  };

  function removeHttp(url: string) {
    return url.replace(/^https?:\/\//, '');
  }
  // 初始化连接socket
  const socketInit = useCallback(() => {
    try {
      const urls = removeHttp(url);
      const scoketUrl = `wss:${urls}`;
      // url
      const websocket = new WebSocket(scoketUrl);
      websocket.onclose = onClose;
      websocket.onerror = onError;
      websocket.onmessage = onMessage;
      websocket.onopen = onOpen;
      websocket.close = Close;

      webSocketRef.current = websocket;
    } catch (err) {
      console.warn('catch:err: ', err);
    }
  }, [onclose, onError, onMessage, onOpen, Close]);

  useEffect(() => {
    if (webSocketRef.current) {
      webSocketRef.current.close();
    }
    socketInit();
  }, [url]);

  // 断线重连
  useEffect(() => {
    if (!reset) return;
    let time: any = setTimeout(() => {
      socketInit();
      setReset(false);
    }, 5000);
    return () => {
      clearTimeout(time);
      time = null;
    };
  }, [reset]);

  return {
    data,
  };
};

export default useWebSocket;
