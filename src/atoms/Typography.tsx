import styles from './Typography.module.css';
import clsx from 'clsx'


type DateProps = React.HTMLAttributes<HTMLSpanElement>;
export const Date: React.FC<DateProps> = ({ children, className, ...props }) => (
  <span className={clsx(styles.date, className)} {...props}>
    {children}
  </span>
);
// export const Date = ({ children, className, ...props }) => (
//   <span className={clsx(styles.date, className)} {...props}>{children}</span>
// );

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export const Heading: React.FC<DateProps> = ({ children, className, ...props }) => (
  <span className={clsx(styles.date, className)} {...props}>
    {children}
  </span>
);
// export const Heading = ({ children, className, ...props }) => (
//   <h1 className={clsx(styles.heading, className)} {...props}>{children}</h1>
// );


type SubheadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export const Subheading: React.FC<SubheadingProps> = ({ children, className, ...props }) => (
  <span className={clsx(styles.date, className)} {...props}>
    {children}
  </span>
);
// export const Subheading = ({ children, className, ...props }) => (
//   <h2 className={clsx(styles.subheading, className)} {...props}>{children}</h2>
// );

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
export const Paragraph: React.FC<SubheadingProps> = ({ children, className, ...props }) => (
  <span className={clsx(styles.date, className)} {...props}>
    {children}
  </span>
);
// export const Paragraph = ({ children, className, ...props }) => (
//   <p className={clsx(styles.paragraph, className)} {...props}>{children}</p>
// );


type SiteGrateProps = React.HTMLAttributes<HTMLSpanElement>;
export const SiteGrate: React.FC<SiteGrateProps> = ({ children, className, ...props }) => (
  <span className={clsx(styles.date, className)} {...props}>
    {children}
  </span>
);
// export const SiteGrate = ({ children, className, ...props }) => (
//   <p className={clsx(styles.siteGrate, className)} {...props}>{children}</p>
// );

type ListItemProps = React.HTMLAttributes<HTMLLIElement>;
export const ListItem: React.FC<SiteGrateProps> = ({ children, className, ...props }) => (
  <span className={clsx(styles.date, className)} {...props}>
    {children}
  </span>
);
// export const ListItem = ({ children, className, ...props }) => (
//   <li className={clsx(styles.listItem, className)} {...props}>{children}</li>
// );

// export const InlineCode = ({ children, className, ...props }) => (
//   <code className={clsx(styles.inlineCode, className)} {...props}>{children}</code>
// );

// export const PortalText = ({ children, className, ...props }) => (
//   <span className={clsx(styles.portalText, className)} {...props}>{children}</span>
// );

// export const InlinePortal = ({ children, className, ...props }) => (
//   <span className={clsx(styles.inlinePortal, className)} {...props}>{children}</span>
// );

// export const Link = ({ children, className, ...props }) => (
//   <a className={clsx(styles.link, className)} {...props}>{children}</a>
// );

// export const FooterMapLink = ({ children, className, ...props }) => (
//   <a className={clsx(styles.footerMapLink, className)} {...props}>{children}</a>
// );

// export const Button = ({ children, className, ...props }) => (
//   <button className={clsx(styles.button, className)} {...props}>{children}</button>
// );
