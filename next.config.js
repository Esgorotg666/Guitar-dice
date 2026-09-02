const STORAGE = 'https://fjwkfqmyfufulwjecjlf.supabase.co/storage/v1/object/public/guitar-dice-public';
const FN = 'https://fjwkfqmyfufulwjecjlf.supabase.co/functions/v1';
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/billing/checkout', destination: FN + '/stripe-checkout' },
        { source: '/billing/portal', destination: FN + '/stripe-checkout/portal' },
        { source: '/api/:path*', destination: FN + '/api/:path*' }
      ],
      afterFiles: [
        { source: '/data/:file*', destination: STORAGE + '/app/:file*' }
      ],
      fallback: []
    };
  }
};
