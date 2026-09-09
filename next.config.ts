import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 defaults this allowlist to [75] and silently coerces anything
     * else down to it, so a higher `quality` prop does nothing until the value
     * is listed here. 90 is where the photography stops showing compression in
     * skies and skin tones.
     */
    qualities: [75, 90],
  },
};

export default nextConfig;
