import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Spleasy - Split bills instantly'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { lang: string } }) {
    const { lang } = await params

    // Simple localization map since we can't easily use the full dictionary loader here
    // without potentially bundling too much or hitting edge compat issues with fs
    const text = lang === 'vi'
        ? { title: 'Chia tiền nhóm', subtitle: 'Ăn xong, chia luôn.' }
        : { title: 'Split bills instantly', subtitle: 'Stop doing math.' }

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}
                >
                    {/* Logo Icon approximation */}
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 20,
                            background: '#2563eb', // blue-600
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 20,
                            color: 'white',
                            fontSize: 40,
                            fontWeight: 'bold',
                        }}
                    >
                        S
                    </div>
                    <div style={{ fontSize: 60, fontWeight: 'bold', color: '#1e3a8a' }}>Spleasy</div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div style={{ fontSize: 72, fontWeight: 'bold', color: '#172554', textAlign: 'center', marginBottom: 10 }}>
                        {text.title}
                    </div>
                    <div style={{ fontSize: 36, color: '#1e40af', textAlign: 'center' }}>
                        {text.subtitle}
                    </div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        fontSize: 24,
                        color: '#64748b',
                    }}
                >
                    spleasy.vercel.app
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
