import { useState, useEffect, useRef } from 'react'

const useAudio = (src) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!src) return

    const audio = new Audio(src)
    audioRef.current = audio

    // Event listeners
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      console.error('Erro ao carregar áudio:', src)
      setIsPlaying(false)
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [src])

  const play = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(err => {
        console.error('Erro ao tocar áudio:', err)
      })
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const setVolume = (volume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  return {
    isPlaying,
    isMuted,
    play,
    pause,
    stop,
    toggleMute,
    setVolume,
    audio: audioRef.current
  }
}

export default useAudio
