import Link from 'next/link'
import { ImageContainer, SucessContainer } from '../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Image from 'next/image'
import Head from 'next/head'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title> Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SucessContainer>
        <h1>Compra efetuada</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhul <strong>{customerName}</strong>, sua{' '}
          <strong>{product.name}</strong> já está a caminho de Centenário, a
          previsão de chegada é dois anos.(Ninguém achou tua cidade)
        </p>

        <Link href="/" prefetch={true}>
          Voltar ao catálogo
        </Link>
      </SucessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const customerName = session.customer_details!.name
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const product = session.line_items!.data[0].price!.product as Stripe.Product

  console.log(session)

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
