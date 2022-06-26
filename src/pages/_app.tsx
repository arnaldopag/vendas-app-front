
import type { AppProps } from 'next/app'
import 'bulma/css/bulma.css'
import 'components/common/loader/loader.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeflex/primeflex.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
