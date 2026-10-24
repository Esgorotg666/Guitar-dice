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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://sdk.minepi.com https://pagead2.googlesyndication.com https://classic.avantlink.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://socialchain.app https://backend.appstudio-u7cm9zhmha0ruwv8.piappengine.com https://fjwkfqmyfufulwjecjlf.supabase.co; frame-ancestors 'self' https://*.pinet.com https://*.minepi.com;"
          }
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
