import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

import Image from 'next/image'

import { useReportWebVitals } from 'next/web-vitals'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}

export default App
