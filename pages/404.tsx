import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>404 - Page Not Found</h1>
      <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
        Return Home
      </Link>
    </div>
  );
}
