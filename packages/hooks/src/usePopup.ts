import { notification } from 'antd';
import { useCallback, useEffect, useState } from 'react';

/**
 * @param {*} isvisible 控制显示
 * @param {*} close 关闭isvisible
 * @param {*} show 显示isvisible
 * @param {*} setVisible 改变isvisible
 * @param {*} closeNeedConfirm 是否触发关闭二次确认
 * @param {*} updateCloseNeedConfirm 改变closeNeedConfirm
 * @param {*} loading loading
 * @param {*} setLoading 改变loading
 *
 * @param {*} typeTitle 当前弹窗的类型名：创建，编辑
 * @param {*} setTypeTitle 改变typeTitle
 *
 */
interface popupType {
  isVisible?: boolean;
  close?: () => any;
  show?: (type: string, data: any) => any;
  setVisible?: (bool: boolean) => any;

  closeNeedConfirm?: boolean;
  updateCloseNeedConfirm?: () => any;

  loading?: boolean;
  setLoading?: (bool: boolean) => any;

  PopuptypeTitle?: string;
  setPopuptypeTitle?: (bool: string) => any;

  Popuptype?: string;
}

// 弹窗hooks 集成loading，visible，closeNeedConfirm
export function usePopupHooks(isVisible?: any, onClose?: any): popupType {
  const [visible, setVisible] = useState<boolean>(false); // 显示
  const [closeNeedConfirm, setCloseNeedConfirm] = useState<boolean>(false); // 内部变动出发关闭弹窗二次确认
  const [loading, setLoading] = useState<boolean>(false);
  const [PopuptypeTitle, setPopuptypeTitle] = useState<string>(''); // 状态title
  const [Popuptype, setPopuptype] = useState<string>(''); // 状态

  useEffect(() => {
    // 外部控制
    if ([true, false].includes(isVisible)) {
      setVisible(isVisible);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!visible) {
      setCloseNeedConfirm(false);
    }
  }, [visible]);

  // 判断控制显隐 权重
  const internalControls = (bool: boolean) => {
    // 通知提醒框
    const notifications = (description = '外部自定义控制显隐') => {
      notification.warning({
        message: '提示',
        description,
      });
    };

    if ([true, false].includes(isVisible)) {
      if (onClose && !bool) {
        // 外部控制隐藏
        console.warn('外部控制');
        onClose();
      } else if (onClose && bool) {
        // 外部控制显示
        notifications();
      } else {
        // 外部控制提示
        notifications();
      }
    } else {
      console.warn('内部控制');
      // 内部控制
      setVisible(bool);
    }
  };

  const updateCloseNeedConfirm = useCallback(() => {
    setCloseNeedConfirm(true);
  }, []);

  // 设置显隐值
  const setHideShow = (bool: boolean) => {
    internalControls(bool);
  };

  const isSetPopuptypeTitle = (type: string) => {
    const setTypeTitleDic: any = {
      add: '创建',
      adds: '添加',
      edit: '编辑',
      details: '详情',
    };
    if (type) {
      setPopuptypeTitle(setTypeTitleDic[type]);
      setPopuptype(type);
    }
  };

  const show = (type: string, data: any) => {
    if (type && type === 'add') {
      console.warn('show:add');
      isSetPopuptypeTitle(type);
      setHideShow(true);
    } else if (type && type === 'edit') {
      console.warn('show:edit');
      if (data) {
        isSetPopuptypeTitle(type);
        setHideShow(true);
      } else {
        notification.warning({
          message: '提示',
          description: '请传入数据',
        });
      }
    }
  };

  // 列表，重新请求，是否可以翻页，设置列表数据，下一页
  return {
    isVisible: visible,
    closeNeedConfirm,
    loading,
    setLoading,
    updateCloseNeedConfirm,
    setVisible: (bool) => {
      setHideShow(bool);
    },
    show,
    close: () => {
      setHideShow(false);
    },
    PopuptypeTitle,
    setPopuptypeTitle: isSetPopuptypeTitle, // 使用show后，此方法可不用使用了
    Popuptype,
  };
}
export default usePopupHooks;
