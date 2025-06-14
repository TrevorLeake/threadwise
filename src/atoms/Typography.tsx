import styles from './Typography.module.css';
import clsx from 'clsx'

export const Date = ({ children, className, ...props }) => (
  <span className={clsx(styles.date, className)} {...props}>{children}</span>
);

export const Heading = ({ children, className, ...props }) => (
  <h1 className={clsx(styles.heading, className)} {...props}>{children}</h1>
);

export const Subheading = ({ children, className, ...props }) => (
  <h2 className={clsx(styles.subheading, className)} {...props}>{children}</h2>
);

export const Paragraph = ({ children, className, ...props }) => (
  <p className={clsx(styles.paragraph, className)} {...props}>{children}</p>
);

export const SiteGrate = ({ children, className, ...props }) => (
  <p className={clsx(styles.siteGrate, className)} {...props}>{children}</p>
);

export const ListItem = ({ children, className, ...props }) => (
  <li className={clsx(styles.listItem, className)} {...props}>{children}</li>
);

export const InlineCode = ({ children, className, ...props }) => (
  <code className={clsx(styles.inlineCode, className)} {...props}>{children}</code>
);

export const PortalText = ({ children, className, ...props }) => (
  <span className={clsx(styles.portalText, className)} {...props}>{children}</span>
);

export const InlinePortal = ({ children, className, ...props }) => (
  <span className={clsx(styles.inlinePortal, className)} {...props}>{children}</span>
);

export const Link = ({ children, className, ...props }) => (
  <a className={clsx(styles.link, className)} {...props}>{children}</a>
);

export const FooterMapLink = ({ children, className, ...props }) => (
  <a className={clsx(styles.footerMapLink, className)} {...props}>{children}</a>
);

export const Button = ({ children, className, ...props }) => (
  <button className={clsx(styles.button, className)} {...props}>{children}</button>
);
