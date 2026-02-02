import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAudioContext } from './contexts/AudioContext'
import Accordion from './components/Accordion'
import CardFlip from './components/CardFlip'
import Tabs from './components/Tabs'
import Carousel from './components/Carousel'
import Header from './components/Header'
import NumberCircle from './components/NumberCircle'
import AnimatedElement from './components/AnimatedElement'
import AnimatedText from './components/AnimatedText'
import logoCapa from './assets/images/logo-capa-center.png'
import fotoGailhac from './assets/images/foto-tela01.png'
import iconeTela01 from './assets/images/img-icone-tela01.png'
import starBlue from './assets/images/star-blue.png'
import starYellow from './assets/images/start-yellow.png'
import tela04Img01 from './assets/images/tela04-img01.png'
import tela04Img02 from './assets/images/tela04-img02.png'
import iconBirds from './assets/images/icon-birds-white.png'
import iconBirdsBlue from './assets/images/icon-birds-blue.png'
import iconTaca from './assets/images/icon-taca-white.png'
import divisorYellow from './assets/images/divisor-yellow.png'
import divisorBlue from './assets/images/divisor-blue.png'
import bgTextoTitle from './assets/images/bg-texto-title.png'
import tela06Img from './assets/images/tela06-img.png'
import tela07Img from './assets/images/t07-img.png'
import divBlueDir from './assets/images/divisor-blue-direita.png'
import divBlueEsq from './assets/images/divisor-blue-esquerda.png'
import tela09Img from './assets/images/tela08-img.png'
import tela12Img from './assets/images/tela12-img.png'
import tela13Img01 from './assets/images/tela13-img01.png'
import tela13Img02 from './assets/images/tela13-img02.png'
import flipCard01 from './assets/images/flip-card01.png'
import flipCard02 from './assets/images/flip-card02.png'
import flipCard03 from './assets/images/flip-card03.png'
import flipCard04 from './assets/images/flip-card04.png'
import flipCard05 from './assets/images/flip-card005.png'
import tela14Slide01 from './assets/images/tela14-img-slide01.png'
import tela14Slide02 from './assets/images/tela14-img-slide02.png'
import tela16Img from './assets/images/tela16-img01.png'
import slide05a from './assets/images/slide05-a.png'
import slide05b from './assets/images/slide05-b.png'
import slide05c from './assets/images/slide05-c.png'
import slide10a from './assets/images/slide10-a.png'
import slide10b from './assets/images/slide10-b.png'
import videoTela03 from './assets/videos/P1_CRIANCA.mp4'
import videoIdoso from './assets/videos/P1_IDOSO.mp4'
import videoJovem1 from './assets/videos/P1_JOVEM.mp4'
import videoJovem2 from './assets/videos/P2_JOVEM.mp4'
import videoJovem3 from './assets/videos/P03_JOVEM.mp4'
import Slide from './components/Slide'
import './components/Slide.css'
import CardsSlide from './components/CardsSlide'
import './App.css'

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { playAudio } = useAudioContext()
  const [currentTela, setCurrentTela] = useState(() => {
    // Sempre inicia na tela 1, independente do localStorage
    // O scroll vai atualizar para a tela correta
    return 1
  })
  const videosJovem = [videoJovem1, videoJovem2, videoJovem3]
  const [tela07VideoIndex, setTela07VideoIndex] = useState(0)

  // Sincroniza URL com a tela atual (mas só se não estiver no topo)
  useEffect(() => {
    const telaFromUrl = searchParams.get('tela')
    if (telaFromUrl) {
      const telaNum = parseInt(telaFromUrl)
      if (!isNaN(telaNum) && telaNum >= 1) {
        // Se estiver no topo da página, força tela 1
        if (window.scrollY < 100 && telaNum === 1) {
          setCurrentTela(1)
        } else if (telaNum >= 2) {
          setCurrentTela(telaNum)
        }
      }
    }
  }, [searchParams])

  // Verifica a posição inicial ao carregar a página
  useEffect(() => {
    const checkInitialPosition = () => {
      // Se estiver no topo da página, garante que está na tela 1
      if (window.scrollY < 50) {
        setCurrentTela(1)
      } else {
        // Se não estiver no topo, detecta qual tela está visível
        const sections = document.querySelectorAll('section[id^="tela"]')
        const scrollPosition = window.scrollY + window.innerHeight / 2

        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          const sectionId = section.id
          const telaNum = parseInt(sectionId.replace('tela', ''))

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setCurrentTela(telaNum)
          }
        })
      }
    }
    
    // Verifica após um pequeno delay para garantir que o DOM está pronto
    setTimeout(checkInitialPosition, 200)
    window.addEventListener('load', checkInitialPosition)
    return () => window.removeEventListener('load', checkInitialPosition)
  }, [])

  // Detecta mudança de scroll e atualiza a tela atual (URL e localStorage só no scroll)
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id^="tela"]')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.id
        const telaNum = parseInt(sectionId.replace('tela', ''))

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentTela((prev) => {
            if (prev === telaNum) return prev
            localStorage.setItem('lastTela', telaNum.toString())
            setSearchParams({ tela: telaNum.toString() }, { replace: true })
            return telaNum
          })
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setSearchParams])

  // Salva a tela atual no localStorage quando muda (URL já é atualizada no scroll)
  useEffect(() => {
    localStorage.setItem('lastTela', currentTela.toString())
  }, [currentTela])

  // Toca o áudio quando muda de tela (apenas a partir da tela 2)
  useEffect(() => {
    if (currentTela >= 2) {
      playAudio(currentTela)
    }
  }, [currentTela, playAudio])

  return (
    <div className="app">
      {/* Background pattern - cobre todo o site */}
      <div className="bg-pattern"></div>

      {/* Header - só aparece a partir da tela 02 (primeira tela de conteúdo) */}
      {currentTela >= 2 && <Header currentTela={currentTela} />}

      {/* Tela 01 - Capa Principal */}
      <section id="tela01" className="section tela-capa">
        <div className="container-full tela-capa-container">
          {/* Logo no topo */}
          <AnimatedElement animation="fadeDown" delay={0.2} threshold={0}>
            <div className="tela-capa-logo">
              <img src={logoCapa} alt="Logo" />
            </div>
          </AnimatedElement>

          {/* Módulo 01 - Tópico 01 */}
          <AnimatedElement animation="fadeUp" delay={0.4} threshold={0}>
            <div className="tela-capa-modulo font-inter-bold text-20 letter-spacing-20">
              MÓDULO 01 - TÓPICO 01
            </div>
          </AnimatedElement>

          {/* Título Principal */}
          <h1 className="tela-capa-titulo font-garamond text-64 letter-spacing-20 text-shadow">
            <AnimatedText animation="fadeUp" stagger={0.1} delay={0.6} threshold={0}>
              O INÍCIO DA NOSSA<br />HISTÓRIA
            </AnimatedText>
          </h1>

          {/* Scroll Indicator */}
          <AnimatedElement animation="fadeUp" delay={1.2} threshold={0}>
            <div className="tela-capa-scroll">
              <div className="tela-capa-scroll-icon">
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="4" width="6" height="12" rx="3" stroke="var(--cor-azul)" strokeWidth="2" fill="none"/>
                  <path d="M12 20L12 36" stroke="var(--cor-azul)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 32L12 36L16 32" stroke="var(--cor-azul)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-inter-bold text-24 letter-spacing-20 tela-capa-scroll-texto">ROLE PARA INICIAR</p>
            </div>
          </AnimatedElement>
        </div>
      </section>



      {/* Tela 03 - Módulo 01 Tópico 01 */}
      <section id="tela02" className="section tela-conteudo tela02">
        
        <div className="container tela02-container-border margin-vertical-60">
           {/* Estrelas amarelas nas bordas horizontais */}
            <img src={starYellow} alt="" className="star-yellow star-yellow-1" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-2" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-3" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-4" />
          
          {/* Estrelas azuis nas bordas verticais */}
          <img src={starBlue} alt="" className="star-blue-left" />
          <img src={starBlue} alt="" className="star-blue-right" />
          {/* Parte superior - fundo creme */}
          <div className="tela02-top">
            <div className="tela02-top-content">
              <div className="tela02-left flex-column-small">
                <AnimatedElement animation="fadeUp" delay={0.1}>
                  <NumberCircle number={1} />
                </AnimatedElement>
                <AnimatedElement animation="fadeUp" delay={0.2}>
                  <h2 className="tela02-titulo font-inter-bold text-20 letter-spacing-20">
                    Conhecendo a história de Gailhac
                  </h2>
                </AnimatedElement>
                <AnimatedElement animation="fadeUp" delay={0.3}>
                  <p className="tela02-texto font-garamond text-32">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                      Conhecer a própria história é compreender o sentido do presente. Nesta jornada, organizada em quatro módulos, você será convidado a percorrer a trajetória de Pe. Gailhac, passando por momentos decisivos de sua vida.
                    </AnimatedText>
                  </p>
                </AnimatedElement>
              </div>
              <AnimatedElement animation="fadeLeft" delay={0.4}>
                <div className="tela02-right">
                  <img src={fotoGailhac} alt="Pe. Gailhac" className="tela02-foto" />
                </div>
              </AnimatedElement>
            </div>
          </div>

          {/* Parte inferior - fundo azul */}
          <div className="tela02-bottom">
            <div className="tela02-bottom-content">
              <AnimatedElement animation="fadeUp" delay={0.2}>
                <div className="tela02-icon">
                  <img src={iconeTela01} alt="Ícone" />
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.3}>
                <div className="tela02-bottom-text">
                  <p className="tela02-bottom-paragrafo font-inter-regular text-24">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                      Neste primeiro módulo, voltamos o olhar para a infância, tempo de formação, descobertas e silenciosos chamados. Começamos a compreender também, como uma vida marcada por desafios e escolhas corajosas deu origem à missão que hoje conhecemos como Rede Sagrado.<br></br>
                    </AnimatedText>
                  </p>

                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

            {/* Tela 02 - Tela Simples com Vídeo */}
            <section id="tela03" className="section tela-conteudo tela-simples bg-video">
        <div className="container">
          <div className="tela-simples-content">
            <AnimatedElement animation="fadeUp" delay={0.1}>
              <div className="tela-simples-numero">
                <NumberCircle number={2} />
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <h2 className="tela-simples-titulo font-inter-bold text-20 letter-spacing-20">
                Conhecendo a história de Gailhac
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.3}>
              <p className="tela-simples-texto font-garamond text-32">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                  Para iniciar essa caminhada, convido você a assistir ao vídeo que apresenta minha infância e os primeiros sinais da missão que começava a se desenhar.
                </AnimatedText>
              </p>        
                 
                </AnimatedElement>
            <AnimatedElement  animation="fadeUp" delay={0.3}>
            <h2 className="tela-simples-play text-center font-inter-bold text-20 letter-spacing-20" >
              <AnimatedText animation="fadeIn" stagger={0.1} delay={0.4}>
                  DÊ O PLAY PARA CONFERIR!
                  </AnimatedText>
                  </h2>
            </AnimatedElement>
           
            <AnimatedElement animation="fadeUp" delay={0.5}>
              <div className="tela-simples-video">
                <video
                  src={videoTela03}
                  controls
                  width="100%"
                  height="600"
                  title="Vídeo - Infância de Gailhac"
                  playsInline
                >
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Tela 04 */}
      <section id="tela04" className="section tela-conteudo tela04">
        <div className="container">
          <AnimatedElement animation="fadeDown" delay={0.1}>
            <div className='icon-top'>
              <img src={iconBirds} alt="" className="icon-birds" />
            </div>
          </AnimatedElement>
          <div className="tela04-content">
            <div className="tela04-coluna-esquerda flex-column">
              <AnimatedElement animation="fadeUp" delay={0.2}>
                <div className="tela04-numero">
                  <NumberCircle number={3} color="var(--cor-amarelo-claro)" borderColor="var(--cor-amarelo-claro)" />
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.3}>
                <h2 className="tela04-titulo font-inter-bold text-20 letter-spacing-20">
                  Eu Gailhac (criança)
                </h2>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.4}>
                <p className="tela04-texto font-garamond text-32">
                  <AnimatedText animation="fadeIn" stagger={0.05} delay={0.4}>
                    Como você deve ter percebido, venho de uma família simples, marcada pelo trabalho e pela fé vivida no cotidiano. Desde cedo aprendi que a vida não oferece atalhos e que a dignidade se constrói mesmo em meio às dificuldades.
                  </AnimatedText>
                </p>
              </AnimatedElement>
            </div>
            <AnimatedElement animation="fadeRight" delay={0.5}>
              <div className="tela04-coluna-direita">
                <img src={tela04Img01} alt="" className="tela04-img01" />
              </div>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="fadeIn" delay={0.3}>
            <div className="divisor">
              <img src={divisorYellow}/>
            </div>
          </AnimatedElement>
          
          
          <div className="tela04-content">
            <AnimatedElement animation="fadeLeft" delay={0.2}>
              <div className="tela04-coluna-esquerda">
                <img src={tela04Img02} alt="" className="tela04-img01" />
              </div>
            </AnimatedElement>
            <div className="tela04-coluna-direita flex-column">
              <AnimatedElement animation="fadeUp" delay={0.3}>
                <div className="tela04-icon-taca">
                  <img src={iconTaca} alt="" className="icon-taca" />
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.4}>
                <p className="tela04-texto font-inter-regular text-24 text-end">
                  <AnimatedText animation="fadeIn" stagger={0.05} delay={0.4}>
                    Ainda criança, perdi meu pai. Essa perda marcou profundamente minha história. A dor me fez amadurecer antes do tempo e despertou em mim uma sensibilidade especial para com aqueles que sofrem. Foi minha mãe quem sustentou nossa casa e minha fé, ensinando-me que confiar em Deus não significa ausência de dor, mas coragem para atravessá-la.
                  </AnimatedText>
                </p>
              </AnimatedElement>
            </div>
          </div>

         
        </div>
      </section>

      {/* Tela 05 */}
      <section id="tela05" className="section tela-conteudo tela05">
          <div className='tela13-hold-lines'>
        <div className="container">
         <div className='tela-simples-content no-padding tela05-container-border'>
           {/* Estrelas amarelas nas bordas horizontais */}
           <img src={starYellow} alt="" className="star-yellow star-yellow-1" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-2" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-3" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-4" />
          
          {/* Estrelas azuis nas bordas verticais */}
          <img src={starYellow} alt="" className="star-yellow-left" />
          <img src={starYellow} alt="" className="star-yellow-right" />
         <AnimatedElement animation="fadeUp" delay={0.1}>
          <div className="tela-simples-numero">
            <NumberCircle number={4} color="var(--cor-amarelo-claro)" borderColor="var(--cor-amarelo-claro)" />
          </div>
         </AnimatedElement>
              <div className="tela05-slides">
                <AnimatedElement animation="fadeLeft" delay={0.2}>
                  <img src={slide05a} alt="" className="tela05-slide-img" />
                </AnimatedElement>
                <AnimatedElement animation="fadeRight" delay={0.2}>
                  <img src={slide05b} alt="" className="tela05-slide-img" />
                </AnimatedElement>
              </div>
              <AnimatedElement animation="fadeUp" delay={0.3}>
                <div className="citacao citacao-tela05">
                  <p className="citacao-texto font-garamond text-36 text-shadow">
                    <AnimatedText animation="fadeIn" stagger={0.08} delay={0.3}>
                      Cresci próximo à igreja de <strong>Saint Aphrodise</strong>, um lugar decisivo para minha formação espiritual. Foi ali que conheci o <strong>Padre Jean-Jacques Martin</strong>, pároco da comunidade.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.5}>
                <div className="tela05-box-azul">
                  <img src={slide05c} alt="" className="tela05-box-img" />
                  <p className="tela05-box-texto font-inter-regular text-24">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.5}>
                      Ele havia sido perseguido durante a Revolução Francesa, vivera o exílio e retornara com uma fé firme e coerente. Tornou-se para mim um verdadeiro <strong>diretor espiritual</strong>. Com ele aprendi que a fé não se negocia, que a consciência precisa ser firme e que não devemos fugir das dificuldades.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.7}>
                <div className='icon-bottom'>
                  <img src={iconBirds} alt="" className="icon-birds" />
                </div>
              </AnimatedElement>
         </div>
        
          </div>
        </div>

      </section>

      {/* Tela 06 */}
      <section id="tela06" className="section tela-conteudo tela06">
        <div className="container-full">
          <div className="tela06-content">
            <div className="tela06-numero">
              <NumberCircle number={5} />
            </div>
            <div className="tela06-imagem">
              <img src={tela06Img} alt="" className="tela06-img" />
            </div>
            <div className="tela06-textos">
              <div className="tela06-texto-esquerda">
                <p className="tela06-texto font-garamond text-36">
                Ainda menino, comecei a compreender algo que nunca mais me abandonaria: <strong>problemas não desaparecem quando fechamos os olhos</strong>. É preciso sabedoria e “espinha dorsal” para permanecer de pé em meio às tempestades.
                </p>
              </div>
              <div className="tela06-texto-direita">
                <p className="tela06-texto font-garamond text-36">
                Minha infância não foi apenas tempo de aprendizado, mas o alicerce de tudo o que viria depois. No próximo momento da minha vida, você conhecerá como essas experiências começaram a se transformar em escolhas concretas
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
        <div className="divisor">
            <img src={divisorBlue}/>
          </div>
          <AnimatedElement animation="fadeUp" delay={0.2}>
            <div className="tela06-proximo-wrap">
              <img src={bgTextoTitle} alt="" className="tela06-proximo-icon" />
              <p className="tela06-proximo-texto font-garamond text-36">
                Siga para o próximo subtópico e conheça minha juventude, tempo em que os aprendizados da infância começaram a se transformar em escolhas concretas.
              </p>
            </div>
          </AnimatedElement>
        </div>
      
      </section>

      {/* Tela 07 - Tela Simples com Vídeo (slideshow jovem) */}
      <section id="tela07" className="section tela-conteudo tela-simples bg-video">
        <div className="container">
          <div className="tela-simples-content">
            <AnimatedElement animation="fadeUp" delay={0.1}>
              <div className="tela-simples-numero">
                <NumberCircle number={6} />
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <h2 className="tela-simples-titulo font-inter-bold text-20 letter-spacing-20">
                Eu, Gailhac (Jovem)
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.3}>
              <p className="tela-simples-texto font-garamond text-32">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                  Para continuarmos essa jornada, acompanhe o período da minha juventude, quando os aprendizados da infância se transformaram em escolhas, ações concretas e nos primeiros passos de uma missão que começava a ganhar forma.
                </AnimatedText>
              </p>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.3}>
              <h2 className="tela-simples-play text-center font-inter-bold text-20 letter-spacing-20">
                <AnimatedText animation="fadeIn" stagger={0.1} delay={0.4}>
                  Use as setas para navegar entre os vídeos e dê play para conferir.
                </AnimatedText>
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.5}>
              <div className="slide-container tela07-video-slideshow">
                <div className="tela-simples-video">
                  <video
                    key={tela07VideoIndex}
                    src={videosJovem[tela07VideoIndex]}
                    controls
                    width="100%"
                    height="600"
                    title={`Vídeo juventude ${tela07VideoIndex + 1}`}
                    playsInline
                  >
                    Seu navegador não suporta a reprodução de vídeo.
                  </video>
                </div>
                {videosJovem.length > 1 && (
                  <div className="slide-buttons">
                    {tela07VideoIndex > 0 && (
                      <button
                        type="button"
                        className="slide-button slide-button-prev"
                        onClick={() => setTela07VideoIndex((i) => i - 1)}
                        aria-label="Vídeo anterior"
                      >
                        <span className="slide-button-text">ver anterior</span>
                        <span className="slide-button-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6"/>
                          </svg>
                        </span>
                      </button>
                    )}
                    {tela07VideoIndex < videosJovem.length - 1 && (
                      <button
                        type="button"
                        className="slide-button slide-button-next"
                        onClick={() => setTela07VideoIndex((i) => i + 1)}
                        aria-label="Próximo vídeo"
                      >
                        <span className="slide-button-text">ver próximo</span>
                        <span className="slide-button-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"/>
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </AnimatedElement>         
          </div>
        </div>
      </section>

      {/* Tela 08 */}
      <section id="tela08" className="section tela-conteudo tela08 bg-circle-yellow">
        <div className="container-full">
          <div className="tela08-content">
            <AnimatedElement animation="fadeUp" delay={0.1}>
              <div className="tela08-numero">
                <NumberCircle number={7} />
              </div>
            </AnimatedElement>
            <div className="tela08-tres-colunas">
              <AnimatedElement animation="fadeLeft" delay={0.2}>
                <div className="tela08-coluna-esquerda">
                  <div>
                    <p className="tela08-texto font-garamond text-36">
                      <AnimatedText animation="fadeIn" stagger={0.05} delay={0.2}>
                        Na juventude, compreendi que não bastava constatar os problemas do mundo. Era preciso agir. Nunca fui do tipo que esperou acontecer. <strong>Fiz acontecer</strong>. Jamais me contentei em ser apenas conduzido; assumi os riscos da liderança.
                      </AnimatedText>
                    </p>
                    <div className='divisor'>
                      <img src={divBlueEsq} alt="" className="divisor-esq" />
                    </div>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.4}>
                <div className="tela08-coluna-centro">
                  <img src={tela07Img} alt="" className="tela08-img" />
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeRight" delay={0.3}>
                <div className="tela08-coluna-direita">
                  <div>
                    <div className='divisor'>
                      <img src={divBlueDir} alt="" className="divisor-dir" />
                    </div>
                    <p className="tela08-texto font-garamond text-36">
                      <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                        Fui ordenado sacerdote em 23 de setembro de 1826 e logo pedi ao bispo para servir onde a dor humana fosse mais visível. Assim, tornei-me capelão do hospital civil e militar de Béziers.
                      </AnimatedText>
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>

          </div>
        </div>
      </section>

      {/* Tela 09 */}
      <section id="tela09" className="section tela-conteudo tela09">
        <div className="container">
          <div className="tela09-content">
            <AnimatedElement animation="fadeLeft" delay={0.2}>
              <div className="tela09-coluna-imagem">
                <img src={tela09Img} alt="" className="tela09-img" />
              </div>
            </AnimatedElement>
            <div className="tela09-coluna-texto">
              <AnimatedElement animation="fadeUp" delay={0.1}>
                <div className="tela09-numero">
                  <NumberCircle number={7} />
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.3}>
                <p className="tela09-intro font-garamond text-36">
                  <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                    Assim, começou a nascer minhas obras! Clique no recurso abaixo e conheça minhas duas primeiras obras:
                  </AnimatedText>
                </p>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.5}>
                <div className="tela09-accordions">
                  <Accordion
                    items={[
                      {
                        title: "1ª obra – O Hospital",
                        content: (
                          <div className="tela09-accordion-content">
                            <p className="tela09-accordion-texto text-24">
                              <AnimatedText animation="fadeIn" stagger={0.05} delay={0}>
                                No hospital, convivi diariamente com doentes, feridos, pobres e abandonados. Vi de perto como a miséria, a doença e a exclusão ferem não apenas o corpo, mas também a dignidade humana. Aquela realidade moldou profundamente meu coração pastoral. Compreendi que cuidar da alma exige tocar as feridas da vida concreta.
                                <br /><br />
                                Foi nesse contexto que passei a olhar com atenção especial para mulheres em situação extrema de vulnerabilidade. Muitas eram exploradas, doentes, sem apoio e sem alternativas. Não consegui ignorar aquilo.
                              </AnimatedText>
                            </p>
                          </div>
                        )
                      },
                      {
                        title: "2ª obra – O Refúgio do Bom Pastor",
                        content: (
                          <div className="tela09-accordion-content">
                            <p className="tela09-accordion-texto text-24">
                              <AnimatedText animation="fadeIn" stagger={0.05} delay={0}>
                                O Refúgio não foi fruto de teoria, mas de urgência. Nunca me contentei em diagnosticar problemas; parti para a ação. Assumi riscos, enfrentei resistências e adotei como método o enfrentamento.
                              </AnimatedText>
                            </p>
                          </div>
                        )
                      }
                    ]}
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* Tela 10 */}
      <section id="tela10" className="section tela-conteudo tela10">
        <div className='tela10-hold-lines'>
        <div className="container">
         <div className='tela-simples-content no-padding tela10-container-border'>
           {/* Estrelas amarelas nas bordas horizontais */}
           <img src={starYellow} alt="" className="star-yellow star-yellow-1" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-2" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-3" />
            <img src={starYellow} alt="" className="star-yellow star-yellow-4" />
          
          {/* Estrelas azuis nas bordas verticais */}
          <img src={starYellow} alt="" className="star-yellow-left" />
          <img src={starYellow} alt="" className="star-yellow-right" />
         <AnimatedElement animation="fadeUp" delay={0.1}>
          <div className="tela-simples-numero">
            <NumberCircle number={9} color="var(--cor-amarelo-claro)" borderColor="var(--cor-amarelo-claro)" />
          </div>
         </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.2}>
                <div className='tela10-texto-intro'>
                  <p className="font-inter-regular text-24">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.2}>
                      As calúnias vieram cedo. Fofocas, preconceitos e mentiras tornaram-se pedras constantes em meu caminho. Muitas vezes minha vida foi ameaçada.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
              <div className="tela10-slides">
                <AnimatedElement animation="fadeLeft" delay={0.25}>
                  <img src={slide10a} alt="" className="tela10-slide-img" />
                </AnimatedElement>
                <AnimatedElement animation="fadeRight" delay={0.25}>
                  <img src={slide10b} alt="" className="tela10-slide-img" />
                </AnimatedElement>
              </div>
              <AnimatedElement animation="fadeUp" delay={0.3}>
                <div className="citacao citacao-tela10">
                  <p className="citacao-texto-tela10 font-garamond text-36">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                      Nessas horas, eu repetia:<br></br><strong>Coragem, Deus é mais forte que os homens!</strong>
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
            <div className="tela10-box-azul">
              <p className="tela10-box-texto font-inter-regular text-24">
              O <strong>bispo Dom Thibault</strong>, tentando proteger-me, chamou-me um dia e disse:<br></br>
                <strong>“Encontre uma congregação feminina que possa ficar à frente do Refúgio.”</strong><br></br>
                Mais uma vez, abri-me à vontade de Deus.

              </p>
            </div>

         </div>
         <AnimatedElement animation="fadeUp" delay={0.8}>
           <div className="tela10-footer">
             <div className="tela10-footer-icon">
               <img src={iconTaca} alt="" className="icon-taca" />
             </div>
             <p className="font-inter-regular text-24">
               <AnimatedText animation="fadeIn" stagger={0.05} delay={0.8}>
                 Siga para o próximo subtópico e acompanhe minha vida na maturidade, quando o tempo, a experiência e a fé revelam o sentido de tudo o que foi vivido.
               </AnimatedText>
             </p>
           </div>
         </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Tela 11 - Tela Simples com Vídeo */}
      <section id="tela11" className="section tela-conteudo tela-simples bg-video">
        <div className="container">
          <div className="tela-simples-content">
            <AnimatedElement animation="fadeUp" delay={0.1}>
              <div className="tela-simples-numero">
                <NumberCircle number={11} />
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <h2 className="tela-simples-titulo font-inter-bold text-20 letter-spacing-20">
                Eu, Gailhac (idoso)
              </h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.3}>
              <p className="tela-simples-texto font-garamond text-32">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                Assista ao vídeo e conheça o período da minha vida na maturidade, marcado pela consolidação das obras e pelo legado deixado às futuras gerações.
                </AnimatedText>
              </p>
            </AnimatedElement>

            <AnimatedElement  animation="fadeUp" delay={0.4}>
            <h2 className="tela-simples-play text-center font-inter-bold text-20 letter-spacing-20" >
              <AnimatedText animation="fadeIn" stagger={0.1} delay={0.4}>
                  DÊ O PLAY PARA CONFERIR!
                  </AnimatedText>
                  </h2>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.5}>
              <div className="tela-simples-video">
                <video
                  src={videoIdoso}
                  controls
                  width="100%"
                  height="600"
                  title="Vídeo - Gailhac (idoso)"
                  playsInline
                >
                  Seu navegador não suporta a reprodução de vídeo.
                </video>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Tela 12 */}
      <section id="tela12" className="section tela-conteudo tela12">
        <div className="container-full tela12-container-full">
          <AnimatedElement animation="fadeUp" delay={0.1}>
            <div className="tela12-numero">
              <NumberCircle number={12} color="var(--cor-amarelo-claro)" borderColor="var(--cor-amarelo-claro)" />
            </div>
          </AnimatedElement>
          <div className="tela12-tres-colunas">
            <AnimatedElement animation="fadeLeft" delay={0.2}>
              <div className="tela12-coluna tela12-coluna-primeira">
                <p className="tela12-texto font-garamond text-36">
                  {"1."}<br />
                  <AnimatedText animation="fadeIn" stagger={0.05} delay={0.2}>
                    As primeiras tentativas foram difíceis. As <strong>Dames de Saint Maur</strong> assumiram o Refúgio por dois anos. Foram tempos turbulentos. Eu queria uma coisa, elas outra. Sentia que o projeto inicial estava sendo descaracterizado.
                  </AnimatedText>
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.3}>
              <div className="tela12-coluna tela12-coluna-meio">
                <p className="tela12-texto font-garamond text-36">
                  {"2."}<br />
                  <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                    Tentei ainda as <strong>Sœurs de Saint Joseph de Lyon</strong>, as <strong>Sœurs de Marie-Joseph</strong> e até uma ex-freira chegou a assumir a direção do Refúgio. Nada funcionou.
                  </AnimatedText>
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeRight" delay={0.4}>
              <div className="tela12-coluna tela12-coluna-terceira">
                <p className="tela12-texto font-garamond text-36">
                  {"3."}<br />
                  <AnimatedText animation="fadeIn" stagger={0.05} delay={0.4}>
                    A falta de continuidade prejudicava profundamente o trabalho com aquelas mulheres e meninas. Aos poucos, comecei a entender:<strong>todos aqueles obstáculos eram, na verdade, a semente de algo maior.</strong>
                  </AnimatedText>
                </p>
              </div>
            </AnimatedElement>
          </div>
          <AnimatedElement animation="fadeUp" delay={0.5}>
            <div className="tela12-imagem bg-circle-blue">
              <img src={tela12Img} alt="" className="tela12-img" />
            </div>
          </AnimatedElement>
        </div>
        <div className="container">
        <AnimatedElement animation="fadeUp" delay={0.4}>
            <p className="font-garamond text-42 text-center text-white"> 
            <AnimatedText animation="fadeIn" stagger={0.05} delay={0.2}>
              Assim, dei início a minha minha semente maior, a 3ª obra!
              </AnimatedText>
              </p>
            </AnimatedElement>
          <AnimatedElement animation="fadeIn" delay={0.3}>
            <div className="divisor">
              <img src={divisorYellow} alt="" />
            </div>
          </AnimatedElement>
        
          
          <AnimatedElement animation="fadeUp" delay={0.6}>
            <div className="tela12-bg-title">
              <p className="tela12-titulo-2 font-garamond text-48">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.7}>
                  A Congregação do Sagrado Coração de Maria.
                </AnimatedText>
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fadeUp" delay={0.8}>
            <p className="tela12-texto-longo font-inter-regular text-24">
              <AnimatedText animation="fadeIn" stagger={0.05} delay={0.8}>
                Percebi que a obra é maior do que as pessoas. Entre minhas colaboradoras, algumas já caminhavam afinadas com meu ideal: <strong>Rosa Jeannet, Cecília Cambon, Eulália Vidal, Rosália Gibbal e Maria Roques</strong>. Rezávamos, convivíamos e esperávamos a hora de Deus.
              </AnimatedText>
            </p>
          </AnimatedElement>

          <AnimatedElement animation="fadeIn" delay={0.3}>
            <div className="divisor">
              <img src={divisorYellow} alt="" />
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Tela 13 */}
      <section id="tela13" className="section tela-conteudo tela13">
        <div className="container-full tela13-inner">
          {/* Conteúdo principal da tela 13 */}
          <div className="container-full tela13-conteudo">
            <AnimatedElement animation="fadeDown" delay={0.1}>
              <div className='icon-top'>
                <img src={iconBirdsBlue} alt="" className="icon-birds-blue" />
              </div>
            </AnimatedElement>
            
            {/* Imagem com margin negativa */}
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <div className="tela13-imagem-1">
                <img src={tela13Img01} alt="" className="tela13-img-1" />
              </div>
            </AnimatedElement>
            
            {/* Duas colunas de texto */}
            <div className="tela13-textos-duas-colunas">
              <AnimatedElement animation="fadeLeft" delay={0.3}>
                <div className="tela13-texto-esquerda">
                  <p className="tela13-texto font-garamond text-36">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                    Foi então que ocorreu a morte repentina de meu amigo e benfeitor <strong>Eugène Cure</strong>. Sua esposa, <strong>Apolônia</strong>, também grande colaboradora do Refúgio, decidiu consagrar-se a Deus e transferir seus bens para minhas obras. No início, resisti. Temi que fosse uma decisão tomada na dor. Sugeri que pensasse melhor. Mas Apolônia era firme. Aquilo já havia sido combinado entre ela e o marido.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeRight" delay={0.4}>
                <div className="tela13-texto-direita">
                  <p className="tela13-texto font-garamond text-36">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.4}>
                    Vieram novas calúnias. Diziam que eu me aproveitava da fragilidade de uma viúva rica. Seus parentes moveram contra mim uma ação judicial. Fui levado aos tribunais. Mantive o silêncio. A sentença foi clara: <strong>fui absolvido</strong>. Mesmo assim, doeu. A fofoca é um mal traiçoeiro, anônimo e cruel.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
            </div>
            
            {/* Box azul com ícone taça + texto */}
            <div className='container'>
              <AnimatedElement animation="fadeUp" delay={0.5}>
                <div className="tela13-box-taca">
                  <div className="tela13-box-taca-icon">
                    <img src={iconTaca} alt="" className="icon-taca" />
                  </div>
                  <p className="tela13-box-taca-texto font-inter-regular text-24">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.5}>
                    Fundada a Congregação em <strong>24 de fevereiro de 1849</strong>, novos desafios surgiram. A transição no Refúgio foi tensa. Houve resistência, conflitos e até intervenção policial. Minhas filhas espirituais viveram ali um verdadeiro “batismo de fogo”.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
            </div>

            
            {/* Repete as colunas de textos */}
            <div className="tela13-textos-duas-colunas">
              <AnimatedElement animation="fadeLeft" delay={0.6}>
                <div className="tela13-texto-esquerda">
                  <p className="tela13-texto font-garamond text-36">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.6}>
                    Pedi demissão do hospital. Nunca fiz nada pela metade. As irmãs precisavam de minha presença e orientação.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeRight" delay={0.7}>
                <div className="tela13-texto-direita">
                  <p className="tela13-texto font-garamond text-36">
                    <AnimatedText animation="fadeIn" stagger={0.05} delay={0.7}>
                    Inspirado no <strong>Bom Pastor</strong>, compreendi que não bastava acolher quem já havia caído. Era preciso prevenir.
                    </AnimatedText>
                  </p>
                </div>
              </AnimatedElement>
            </div>
            
            {/* Outra imagem com margin-bottom negativa */}
            <AnimatedElement animation="fadeUp" delay={0.8}>
              <div className="tela13-imagem-2">
                <img src={tela13Img02} alt="" className="tela13-img-2" />
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeUp" delay={0.9}>
              <div className='icon-bottom'>
                <img src={iconBirdsBlue} alt="" className="icon-birds-blue" />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Tela 14 */}
      <section id="tela14" className="section tela-conteudo tela14">
        <div className="container">
          <div className="tela14-content">
            <AnimatedElement animation="fadeUp" delay={0.1}>
              <div className="tela14-numero">
                <NumberCircle number={14} color="var(--cor-amarelo-claro)" borderColor="var(--cor-amarelo-claro)" />
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <p className="tela14-intro font-garamond text-36">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.2}>
                  Assim nasceram outras obras, fruto do amadurecimento da missão! <br /> Clique nos cards a seguir para conhecê-las:
                </AnimatedText>
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeUp" delay={0.4}>
              <CardsSlide
                cards={[
                  {
                    front: <img src={flipCard01} alt="" className="tela14-card-img" />,
                    back: (
                      <p className="tela14-card-texto font-inter-regular text-20">
                        A 4ª obra – A Preservação, voltada a impedir que jovens vulneráveis caíssem no caminho da prostituição, oferecendo-lhes alternativas antes que a exclusão se instalasse.
                      </p>
                    )
                  },
                  {
                    front: <img src={flipCard02} alt="" className="tela14-card-img" />,
                    back: (
                      <p className="tela14-card-texto font-inter-regular text-20">
                        A 5ª obra – As Irmãs da Virgem, formada por leigas consagradas que, tendo sido acolhidas, desejaram permanecer conosco em serviço e espiritualidade.
                      </p>
                    )
                  },
                  {
                    front: <img src={flipCard03} alt="" className="tela14-card-img" />,
                    back: (
                      <p className="tela14-card-texto font-inter-regular text-20">
                        A 6ª obra – O Internato Sagrado Coração de Maria, fundado em 1851, unindo excelência acadêmica e formação cristã, educando jovens — inclusive das famílias abastadas — e garantindo sustentabilidade às demais obras.
                      </p>
                    )
                  },
                  {
                    front: <img src={flipCard04} alt="" className="tela14-card-img" />,
                    back: (
                      <p className="tela14-card-texto font-inter-regular text-20">
                        A 7ª obra – A Congregação do Bom Pastor da Virgem, os Padres do Bom Pastor, dedicados à pregação, às missões, à catequese e à educação dos pobres.
                      </p>
                    )
                  },
                  {
                    front: <img src={flipCard05} alt="" className="tela14-card-img" />,
                    back: (
                      <p className="tela14-card-texto font-inter-regular text-20">
                        E a 8ª obra – A Colônia Agrícola, voltada à formação religiosa e profissional no meio rural, unindo fé, trabalho e dignidade.
                      </p>
                    )
                  }
                ]}
              />
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Tela 15 */}
      <section id="tela15" className="section tela-conteudo tela15">
        <div className="container">
          <div className="tela15-content">
            <AnimatedElement animation="fadeUp" delay={0.1}>
              <div className="tela15-numero">
                <NumberCircle number={15} color="var(--cor-amarelo-claro)" borderColor="var(--cor-amarelo-claro)" />
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fadeUp" delay={0.2}>
              <p className="tela15-texto font-garamond text-36">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.2}>
                  Vieram ainda novas acusações, inclusive de assassinato. Mais uma vez, a justiça revelou a verdade. Permaneci firme. Aprendi que a fé é como o aço: <strong>o fogo a torna mais forte</strong>.
                </AnimatedText>
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeUp" delay={0.4}>
              <div className="tela15-slide">
                <Slide
                  slides={[
                    {
                      image: tela14Slide01,
                      text: 'Nos últimos anos, a visão enfraqueceu, o corpo cansou. Fui cuidado com ternura pelas irmãs, especialmente <strong>Irmã São-Félix</strong>. Celebrei minha última Eucaristia em <strong>13 de novembro de 1889</strong>. Em <strong>25 de janeiro de 1890</strong>, às três horas da tarde, após curta agonia, finalmente, minha vela se apagou.'
                    },
                    {
                      image: tela14Slide02,
                      text: 'Foi uma vida bem vivida. Com coragem, com a cabeça erguida e o sono dos justos. Fico muito emocionado de saber que valeu a pena, que meu exemplo não foi vão. O céu começa a ser vivido ainda na Terra. E não vem de graça. Nós é que o fazemos. Creio ter feito o meu.'
                    }
                  ]}
                />
              </div>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeUp" delay={0.6}>
              <p className="tela15-texto-final font-garamond text-36">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.6}>
                  Estou sempre com vocês. Todos os dias. Recebam meu abraço, meus amigos e minhas amigas, construtores de pontes novas... Eu, Gailhac!
                </AnimatedText>
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Tela 16 - Igual à tela 08 */}
      <section id="tela16" className="section tela-conteudo tela16 bg-circle-yellow">
        <div className="container-full">
          <div className="tela16-content">
            <AnimatedElement animation="fadeUp" delay={0.1}>
              <div className="tela16-numero">
                <NumberCircle number={16} />
              </div>
            </AnimatedElement>
            <div className="tela16-tres-colunas">
              <AnimatedElement animation="fadeLeft" delay={0.2}>
                <div className="tela16-coluna-esquerda">
                  <div>
                    <p className="tela16-texto font-garamond text-36">
                      <AnimatedText animation="fadeIn" stagger={0.05} delay={0.2}>
                        Minha vida não foi isenta de dores, incompreensões e injustiças. Mas foi uma vida vivida com coragem, fidelidade e amor. Aprendi que o céu começa a ser construído aqui, na Terra, quando escolhemos agir, servir e permanecer firmes, mesmo quando tudo parece desabar.
                      </AnimatedText>
                    </p>
                    <div className='divisor'>
                      <img src={divBlueEsq} alt="" className="divisor-esq" />
                    </div>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeUp" delay={0.4}>
                <div className="tela16-coluna-centro">
                  <img src={tela16Img} alt="" className="tela16-img" />
                </div>
              </AnimatedElement>
              <AnimatedElement animation="fadeRight" delay={0.3}>
                <div className="tela16-coluna-direita">
                  <div>
                    <div className='divisor'>
                      <img src={divBlueDir} alt="" className="divisor-dir" />
                    </div>
                    <p className="tela16-texto font-garamond text-36">
                      <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                        Nada fiz sozinho. Tudo foi construído em parceria, oração e entrega.
                      </AnimatedText>
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>

          </div>
        </div>
      </section>

      {/* Tela 17 - Igual à tela 12 */}
      <section id="tela17" className="section tela-conteudo tela17">
     
        <div className="container">
          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="divisor">
              <img src={divisorYellow} alt="" />
            </div>
          </AnimatedElement>
          <AnimatedElement animation="fadeUp" delay={0.2}>
            <div className="tela17-numero">
              <NumberCircle number={17} color="var(--cor-amarelo-claro)" borderColor="var(--cor-amarelo-claro)" />
            </div>
          </AnimatedElement>
          <AnimatedElement animation="fadeUp" delay={0.3}>
            <div className="tela17-bg-title">
              <p className="tela17-titulo-1 font-garamond text-32 letter-spacing-20">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.3}>
                  Minha história não termina aqui
                </AnimatedText>
              </p>
              <p className="tela17-titulo-2 font-garamond text-36">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.4}>
                  Ao meu lado, esteve uma mulher decisiva, cuja coragem, fidelidade e entrega marcaram profundamente essa missão.
                </AnimatedText>
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fadeUp" delay={0.5}>
            <div className="tela17-textos-cta">
              <p className="tela17-texto-longo font-inter-regular text-24">
                <AnimatedText animation="fadeIn" stagger={0.05} delay={0.5}>
                  <strong>No próximo tópico, você conhecerá a história da Irmã Saint Jean</strong>, mulher de fé e protagonista silenciosa dessa caminhada.
                </AnimatedText>
              </p>
              <p className="tela17-texto-longo font-inter-regular text-36">
                <AnimatedText animation="fadeIn" stagger={0.06} delay={0.6}>
                  <strong>Siga para o Tópico 2 e continue essa história conosco.</strong>
                </AnimatedText>
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fadeIn" delay={0.1}>
            <div className="divisor tela17-divisor">
              <img src={divisorYellow} alt="" />
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fadeUp" delay={0.6}>
            <div className="tela17-referencias">
              <h3 className="tela17-referencias-titulo font-inter-bold text-20">Referências</h3>
              <div className="tela17-referencias-colunas">
                <div className="tela17-referencias-coluna">
                  <p className="tela17-ref font-inter-regular text-20">
                    CONGREGAÇÃO DAS RELIGIOSAS DO SAGRADO CORAÇÃO DE MARIA. <em>Vida e obra do Padre Gailhac.</em> Béziers: Edição Institucional, s.d.
                  </p>
                  <p className="tela17-ref font-inter-regular text-20">
                    REDE SAGRADO. Pe. Gailhac: história, vida e missão. Disponível em: &lt;https://www.redesagrado.com.br&gt;. Acesso em: 09/01/2026.
                  </p>
                  <p className="tela17-ref font-inter-regular text-20">
                    GAILHAC, Louis. <em>Cartas e escritos espirituais.</em> Béziers: Arquivo Histórico do Sagrado Coração de Maria, s.d.
                  </p>
                </div>
                <div className="tela17-referencias-coluna">
                  <p className="tela17-ref font-inter-regular text-20">
                    IGREJA CATÓLICA. <em>Processo de venerabilidade de Louis Gailhac.</em> Vaticano: Congregação para as Causas dos Santos, s.d.
                  </p>
                  <p className="tela17-ref font-inter-regular text-20">
                    REDE SAGRADO. História do Padre Gailhac. Slides institucionais fornecidos para desenvolvimento de material educacional. São Paulo: Rede Sagrado, 2026.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  )
}

export default App
