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
        { source: '/api/auth/:path*', destination: FN + '/api/auth/:path*' },
        { source: '/api/plans', destination: FN + '/api/plans' },
        { source: '/api/usage/:path*', destination: FN + '/api/usage/:path*' },
        { source: '/api/preferences', destination: FN + '/api/preferences' },
        { source: '/api/preferences/:path*', destination: FN + '/api/preferences/:path*' },
        { source: '/api/streak/:path*', destination: FN + '/api/streak/:path*' },
        { source: '/api/chord-progressions', destination: FN + '/api/chord-progressions' },
        { source: '/api/chord-progressions/:path*', destination: FN + '/api/chord-progressions/:path*' }
      ],
      afterFiles: [
        { source: '/data/:file*', destination: STORAGE + '/app/:file*' }
      ],
      fallback: []
    };
  }
};
