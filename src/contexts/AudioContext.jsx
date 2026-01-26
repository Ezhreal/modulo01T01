import { createContext, useContext, useState, useEffect, useRef } from 'react'

const AudioContext = createContext()

export const useAudioContext = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudioContext deve ser usado dentro de AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const [isGlobalMuted, setIsGlobalMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)
  const audioRef = useRef(null)

  // Mapeamento de telas para arquivos de áudio
  // Você pode adicionar os caminhos dos arquivos de áudio aqui
  const audioMap = {
    1: null, // tela01 - sem áudio
    2: null, // tela02 - adicione o caminho: '/assets/audio/tela02.mp3'
    3: null, // tela03
    4: null, // tela04
    5: null, // tela05
    6: null, // tela06
    7: null, // tela07
    8: null, // tela08
    9: null, // tela09
    10: null, // tela10
    11: null, // tela11
    12: null, // tela12
    13: null, // tela13
    14: null, // tela14
    15: null, // tela15
    16: null, // tela16
    17: null, // tela17
  }

  const playAudio = (telaNum) => {
    // Para o áudio atual se estiver tocando
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audioSrc = audioMap[telaNum]
    
    if (!audioSrc || isGlobalMuted) {
      setCurrentAudio(null)
      setIsPlaying(false)
      return
    }

    const audio = new Audio(audioSrc)
    audioRef.current = audio

    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentAudio(null)
    })
    audio.addEventListener('error', (e) => {
      console.error('Erro ao carregar áudio:', e)
      setIsPlaying(false)
      setCurrentAudio(null)
    })

    audio.muted = isGlobalMuted
    audio.play().catch(err => {
      console.error('Erro ao tocar áudio:', err)
      setIsPlaying(false)
    })

    setCurrentAudio(audio)
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const resumeAudio = () => {
    if (audioRef.current && !isGlobalMuted) {
      audioRef.current.play().catch(err => {
        console.error('Erro ao retomar áudio:', err)
      })
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const newMutedState = !isGlobalMuted
    setIsGlobalMuted(newMutedState)
    
    if (audioRef.current) {
      audioRef.current.muted = newMutedState
      if (newMutedState) {
        audioRef.current.pause()
      } else if (currentAudio) {
        audioRef.current.play().catch(err => {
          console.error('Erro ao retomar áudio:', err)
        })
      }
    }
  }

  // Limpa o áudio quando o componente desmonta
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const value = {
    isGlobalMuted,
    isPlaying,
    currentAudio,
    playAudio,
    pauseAudio,
    resumeAudio,
    stopAudio,
    toggleMute,
    audioMap
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}
