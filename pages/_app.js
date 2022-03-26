import '../styles/globals.css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import Layout from '../components/productPageLayout/Layout'
import ShopProvider from '../context/shopContext'
import { Router, useRouter } from 'next/router'

function MyApp({Component, pageProps}) {
    const router = useRouter()
    return (
        <ShopProvider>
            <Layout>
                <Component {...pageProps} key={router.asPath}/>
            </Layout>
        </ShopProvider>
    )
}

export default MyApp
