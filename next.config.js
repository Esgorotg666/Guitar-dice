const STORAGE = 'https://fjwkfqmyfufulwjecjlf.supabase.co/storage/v1/object/public/guitar-dice-public';
const FN = 'https://fjwkfqmyfufulwjecjlf.supabase.co/functions/v1';
module.exports = {
  reactStrictMode: true,
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
