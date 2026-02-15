import { ImageResponse } from 'next/og';


export const alt = 'Spleasy - Split bills instantly';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const text =
    lang === 'vi'
      ? { title: 'Chia hóa đơn ngay.', subtitle: 'Không cần đăng ký.' }
      : { title: 'Split bills instantly.', subtitle: 'No sign-up.' };

  return new ImageResponse(
    <div
      style={{
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Background Blobs */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '800px',
          height: '800px',
          background: 'rgba(124, 58, 237, 0.05)', // primary/5
          borderRadius: '100%',
          filter: 'blur(100px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          background: 'rgba(59, 130, 246, 0.05)', // blue-500/5
          borderRadius: '100%',
          filter: 'blur(100px)',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 40,
        }}
      >
        {/* Logo Icon */}
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <path d="M50 50 C50 50 90 50 90 20 C90 -10 50 -10 50 50" fill="#7c3aed" />
          <path d="M50 50 C50 50 50 90 80 90 C110 90 110 50 50 50" fill="#18181b" />
          <path d="M50 50 C50 50 10 50 10 80 C10 110 50 110 50 50" fill="#18181b" />
          <path d="M50 50 C50 50 50 10 20 10 C-10 10 -10 50 50 50" fill="#18181b" />
        </svg>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: '#18181b',
            marginLeft: 24,
            letterSpacing: '-0.05em',
          }}
        >
          Spleasy
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: '#09090b',
            textAlign: 'center',
            marginBottom: 0,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          {text.title}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#7c3aed',
            textAlign: 'center',
            marginTop: 10,
          }}
        >
          {text.subtitle}
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
