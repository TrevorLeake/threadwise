const Ad =() => {
  // with this in the <Head> of the page
  // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

  return (
    <>
      <ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="YYYYYYYYYY"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </>
  )
}