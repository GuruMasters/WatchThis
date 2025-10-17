import * as React from 'react';

// Layout styles as JavaScript objects instead of Tailwind classes
const layoutStyles: {
  layout: React.CSSProperties;
  types: Record<string, React.CSSProperties>;
  paddings: Record<string, React.CSSProperties>;
  header: React.CSSProperties;
  content: React.CSSProperties;
  sidebar: React.CSSProperties;
  main: React.CSSProperties;
  footer: React.CSSProperties;
  container: React.CSSProperties;
} = {
  layout: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  types: {
    default: {
      display: 'flex',
      flexDirection: 'column',
    },
    sidebar: {
      display: 'flex',
    },
    centered: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fullwidth: {
      width: '100%',
    },
  },
  paddings: {
    none: {},
    sm: {
      padding: '16px',
    },
    md: {
      padding: '24px',
    },
    lg: {
      padding: '32px',
    },
    xl: {
      padding: '48px',
    },
  },
  header: {
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  },
  content: {
    flex: '1',
    display: 'flex',
  },
  sidebar: {
    width: '256px',
    borderRight: '1px solid #e5e7eb',
    backgroundColor: 'white',
  },
  main: {
    flex: '1',
    overflow: 'auto',
  },
  footer: {
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white',
  },
  container: {
    margin: '0 auto',
    maxWidth: '1280px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
};

export interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: keyof typeof layoutStyles.types;
  padding?: keyof typeof layoutStyles.paddings;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ type = 'default', padding = 'md', header, sidebar, footer, children, style, ...props }, ref) => {
    const layoutStyle = {
      ...layoutStyles.layout,
      ...layoutStyles.types[type],
      ...layoutStyles.paddings[padding],
      ...style,
    };

    return (
      <div
        ref={ref}
        style={layoutStyle}
        {...props}
      >
        {header && (
          <header style={layoutStyles.header}>
            {header}
          </header>
        )}

        <div style={layoutStyles.content}>
          {sidebar && (
            <aside style={layoutStyles.sidebar}>
              {sidebar}
            </aside>
          )}

          <main style={layoutStyles.main}>
            {children}
          </main>
        </div>

        {footer && (
          <footer style={layoutStyles.footer}>
            {footer}
          </footer>
        )}
      </div>
    );
  }
);
Layout.displayName = 'Layout';

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...layoutStyles.container,
      ...style,
    }}
    {...props}
  />
));
Container.displayName = 'Container';

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <header
    ref={ref}
    style={{
      ...layoutStyles.header,
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '16px',
      paddingBottom: '16px',
      ...style,
    }}
    {...props}
  />
));
Header.displayName = 'Header';

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <aside
    ref={ref}
    style={{
      ...layoutStyles.sidebar,
      padding: '24px',
      ...style,
    }}
    {...props}
  />
));
Sidebar.displayName = 'Sidebar';

const Footer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <footer
    ref={ref}
    style={{
      ...layoutStyles.footer,
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '16px',
      paddingBottom: '16px',
      ...style,
    }}
    {...props}
  />
));
Footer.displayName = 'Footer';

export { Layout, Container, Header, Sidebar, Footer };
