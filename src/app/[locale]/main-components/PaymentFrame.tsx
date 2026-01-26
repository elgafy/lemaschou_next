import React from 'react';

const PaymentFrame = () => {
  return (
    <iframe
      src="https://www.briskera.com"
      title="Example Website"
      width="100%"
      height="500px"
      // Optional: use loading="lazy" for performance optimization
      loading="lazy"
    />
  );
};

export default PaymentFrame;