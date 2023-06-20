import { Avatar, Button, ButtonProps, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { WalletList } from '../config';
import { useWeb3Provider } from '../Web3Modal';
import { useWeb3Storage } from '../Web3Modal/storage';
import style from './index.module.scss';

const list = Object.entries(WalletList).map(([label, value]): any => {
  return {
    label,
    logo: value.logo,
    key: label,
  };
});

type ConnectButtonProps = ButtonProps;
export const ConnectButton: React.FC<ConnectButtonProps> = (props) => {
  const { onClick } = props;
  const { connect, active, loading } = useWeb3Provider();
  const { t } = useWeb3Storage();
  return (
    <>
      {!active && (
        <Button
          {...props}
          onClick={(e: any) => {
            if (onClick) return onClick?.(e);
            connect();
          }}
          loading={loading}
        >
          {props?.children ?? t('Connect Wallet')}
        </Button>
      )}
    </>
  );
};

type Web3ButtonProps = {
  type?: 'connect' | 'change';
  btnProps?: ButtonProps;
  children?: any;
};
export const Web3Button: React.FC<Web3ButtonProps> = (props) => {
  const { type = 'connect', btnProps = {} } = props;
  const { connect, active, loading } = useWeb3Provider();
  const { t, network_id, wallet_type }: any = useWeb3Storage();
  const RecommendWalletName = 'MetaMask';
  const walletType = wallet_type ? wallet_type : RecommendWalletName;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    if (loading) return;
    setIsModalOpen(false);
  };

  return (
    <>
      {type === 'connect' && (
        <ConnectButton {...btnProps} onClick={() => setIsModalOpen(true)}>
          {props?.children}
        </ConnectButton>
      )}
      {type === 'change' && (
        <Button {...btnProps} onClick={() => setIsModalOpen(true)}>
          {t('Switch Wallet')}
        </Button>
      )}

      <Modal
        title={t('Connect Wallet')}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        width="380px"
        className={style.walletModal}
      >
        <Space direction="vertical" style={{ width: '100%', margin: '15px 0' }}>
          {list.map((item) => {
            const isSelect = walletType === item.label;
            return (
              <Button
                size="large"
                block
                key={item.label}
                className={` ${
                  isSelect && active ? style.walletModalAvtiveBtn : ''
                }`}
                style={{
                  display: 'flex',
                  height: '50px',
                  alignItems: 'center',
                }}
                type={isSelect ? 'dashed' : 'text'}
                onClick={() => {
                  if (loading) return;
                  connect(network_id, item.key, false, () => {
                    handleCancel();
                  });
                }}
                loading={isSelect ? loading : false}
                disabled={isSelect ? false : loading}
              >
                <div className={style.walletModalContent}>
                  <Space>
                    <Avatar src={item.logo} size={'small'} shape="square" />
                    {item.label}
                  </Space>
                  {item.key === RecommendWalletName && !active && (
                    <span className={style.walletModalRecommend}>
                      {t('Recommend')}
                    </span>
                  )}
                </div>
              </Button>
            );
          })}
        </Space>
      </Modal>
    </>
  );
};
