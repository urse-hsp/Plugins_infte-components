import { Avatar, Button, ButtonProps, Modal, Space } from 'antd';
import React, { useState } from 'react';
import config, { WalletList, WalletType } from '../config';
import { useWeb3Provider } from '../Web3Modal';
import { useWeb3Storage } from '../Web3Modal/storage';
import style from './index.module.scss';

const list = Object.entries(WalletList).map(([label, value]): any => {
  console.log(value, label);
  return {
    label,
    logo: value.logo,
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
          {t('Connect Wallet')}
        </Button>
      )}
    </>
  );
};

export const Web3Button: React.FC = () => {
  const { t, walletType, networkId } = useWeb3Storage();
  const { connect, active, loading } = useWeb3Provider();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallet_Type, setWallet_Type] = useState<WalletType | any>(
    walletType ?? config.BaseWalletType,
  );

  const handleCancel = () => {
    if (loading) return;
    setIsModalOpen(false);
  };

  return (
    <>
      <ConnectButton onClick={() => setIsModalOpen(true)} />
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
            const isSelect = wallet_Type === item.label;
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
                type={isSelect ? 'default' : 'dashed'}
                onClick={() => {
                  if (loading) return;
                  setWallet_Type(item.label);
                  connect(networkId, item.label, false, () => {
                    handleCancel();
                  });
                }}
                loading={isSelect ? loading : false}
                disabled={isSelect ? false : loading}
              >
                <div className={style.walletModalContent}>
                  {item.label}
                  <Avatar src={item.logo} size={'small'} shape="square" />
                </div>
              </Button>
            );
          })}
        </Space>
      </Modal>
    </>
  );
};
