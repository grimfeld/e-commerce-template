// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render (): JSX.Element {
    return (
      <Html lang="fr">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
          <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument