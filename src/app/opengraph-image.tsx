import { ImageResponse } from 'next/og';

export const alt = 'Steve Weed — Builder / Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0b',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #2a2a30',
              borderRadius: 6,
              padding: '8px 14px',
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            <span style={{ color: '#f0f0f0' }}>SW</span>
            <span style={{ color: '#47c8ff' }}>/</span>
            <span style={{ color: '#86868f', fontSize: 18, fontWeight: 400, marginLeft: 8 }}>Build</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 128, fontWeight: 800, color: '#f0f0f0', letterSpacing: -5, lineHeight: 1 }}>
            Steve Weed
          </div>
          <div style={{ width: 64, height: 4, background: '#47c8ff', margin: '28px 0' }} />
          <div style={{ display: 'flex', fontSize: 30, color: '#9a9aa6', letterSpacing: 1 }}>
            Builder&nbsp;&nbsp;/&nbsp;&nbsp;Full-Stack Developer
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#86868f', gap: 20 }}>
          <span>KTXZ Shop</span>
          <span style={{ color: '#47c8ff' }}>·</span>
          <span>Foresight</span>
          <span style={{ color: '#47c8ff' }}>·</span>
          <span>swbuild.dev</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
