
import { ArticleJsonLd } from 'next-seo';

const LDJson = (props:{title:string, url:string, publishedDate:string, modifiedDate:string,description:string}) => (
  <>
    <ArticleJsonLd
      useAppDir={false}
      url={props.url || "https://leake.dev/"}
      title={props.title}
      images={[]}
      // images={[
      //   // 'https://example.com/photos/16x9/photo.jpg',
      // ]}
      datePublished={props.publishedDate}
      dateModified={props.modifiedDate}
      authorName={[{ 
          name: 'Trevor Leake',
          url: 'https://leake.dev',
        },
      ]}
      publisherName="Trevor Leake"
      publisherLogo='/public/block.svg'
      // publisherLogo="https://www.example.com/photos/logo.jpg"
      description={props.description}
      isAccessibleForFree={true}
    />
  </>
);


export default LDJson;