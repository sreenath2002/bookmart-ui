import { MdAccountBalanceWallet } from 'react-icons/md';

const WalletIcon = () => {
  return (
    <div style={{ textAlign: 'right' }}>
      <MdAccountBalanceWallet size={30} color="blue" style={{ verticalAlign: 'middle' }} />
      {/* Adjust size and color of the icon by adjusting the props */}
    </div>
  );
};

export default WalletIcon;
