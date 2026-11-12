import React from 'react'
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion'
import {FONT_TEXT, FONT_TITLE} from '../fonts'
import {COLORS} from '../theme'

export const titleStyle = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT_TITLE,
  fontSize: size,
  color,
  lineHeight: 1,
  letterSpacing: 4,
  textShadow: '0 6px 24px rgba(0,0,0,0.65)',
})

export const textStyle = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT_TEXT,
  fontWeight: 700,
  fontSize: size,
  color,
  lineHeight: 1.15,
  textShadow: '0 4px 16px rgba(0,0,0,0.65)',
})

type PopProps = {
  at: number // frame mulai muncul
  until?: number // frame mulai menghilang
  top?: number
  bottom?: number
  size?: number
  color?: string
  font?: 'title' | 'text'
  children: React.ReactNode
  style?: React.CSSProperties
}

// Teks yang muncul dengan efek membal kecil, lalu (opsional) menghilang
export const Pop: React.FC<PopProps> = ({
  at,
  until,
  top,
  bottom,
  size = 120,
  color = COLORS.ivory,
  font = 'title',
  children,
  style,
}) => {
  const frame = useCurrentFrame()
  const {fps} = useVideoConfig()
  if (frame < at) return null
  const s = spring({frame: frame - at, fps, config: {damping: 13, stiffness: 150}})
  const out =
    until === undefined
      ? 1
      : interpolate(frame, [until - 8, until], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
  if (out <= 0) return null
  const base = font === 'title' ? titleStyle(size, color) : textStyle(size, color)
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top,
        bottom,
        textAlign: 'center',
        opacity: Math.min(1, s * 1.6) * out,
        transform: `scale(${0.7 + 0.3 * s})`,
        ...base,
        ...style,
      }}
    >
      {children}
    </div>
  )
}