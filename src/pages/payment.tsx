import { useRouter } from 'next/router';

import Footer from '@/layouts/Footer';
import HeaderPrimary from '@/layouts/HeaderPrimary';

import { CheckoutComplete } from '../layouts/Checkout/CheckoutComplete';
import { CheckoutInfo } from '../layouts/Checkout/CheckoutInfo';

const Checkout = () => {
  const router = useRouter();

  const { query } = router;
  const { id } = query;

  return (
    <>
      <HeaderPrimary />
      {!id ? <CheckoutComplete /> : <CheckoutInfo />}
      <Footer />
    </>
  );
};

export default Checkout;
