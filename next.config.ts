import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // STEP 2: Content Security Policy for Li.Fi Widget
  // The widget may need iframe permissions. Uncomment if you encounter CSP issues:
  // headers: async () => {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: "frame-ancestors 'self' https://*.li.fi;",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
