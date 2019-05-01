import * as React from "react";
import Head from "next/head";

interface Props {
  title?: string;
  bodyClass?: string;
}

class Layout extends React.Component<Props> {
  componentDidMount() {
    const { bodyClass } = this.props;
    document.querySelector("body").classList.add(bodyClass || "light");
  }

  render() {
    const { children, title } = this.props;
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
            rel="stylesheet"
          />
          <title>{title || "This is the default title"}</title>
        </Head>
        {children}
      </>
    );
  }
}

export default Layout;

// const Layout: React.FunctionComponent<Props> = ({
//   children,
//   title = "This is the default title"
// }) => (
//   <div>
//     <Head>
//       <title>{title}</title>
//       <meta charSet="utf-8" />
//       <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       <link
//         href="//fonts.googleapis.com/css?family=Roboto:400,500,400italic,300italic,300,500italic,700,700italic,900,900italic"
//         rel="stylesheet"
//         type="text/css"
//       />
//     </Head>
//     {children}
//   </div>
// );

// export default Layout;
