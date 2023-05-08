import styles from "./PageWrapper.module.css";

type PageWrapperProps = {
  children: JSX.Element;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return <main className={styles.main}>{children}</main>;
};

export default PageWrapper;
