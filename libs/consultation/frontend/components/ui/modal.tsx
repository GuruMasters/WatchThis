import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

// Modal styles as JavaScript objects instead of Tailwind classes
const modalStyles: {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
  closeButton: React.CSSProperties;
  header: React.CSSProperties;
  title: React.CSSProperties;
  description: React.CSSProperties;
  body: React.CSSProperties;
  footer: React.CSSProperties;
} = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  closeButton: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    borderRadius: '4px',
    opacity: 0.7,
    backgroundColor: 'white',
    padding: '4px',
    transition: 'opacity 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '24px',
    paddingBottom: '16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '1.2',
    letterSpacing: '-0.025em',
  },
  description: {
    fontSize: '14px',
    color: '#6b7280',
  },
  body: {
    flex: '1',
    overflow: 'auto',
    padding: '24px',
    paddingTop: '0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    borderTop: '1px solid #e5e7eb',
    padding: '24px',
    paddingTop: '16px',
  },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: {
    width: '100%',
    maxWidth: '384px',
    margin: '16px',
  },
  md: {
    width: '100%',
    maxWidth: '448px',
    margin: '16px',
  },
  lg: {
    width: '100%',
    maxWidth: '512px',
    margin: '16px',
  },
  xl: {
    width: '100%',
    maxWidth: '576px',
    margin: '16px',
  },
  '2xl': {
    width: '100%',
    maxWidth: '672px',
    margin: '16px',
  },
  '3xl': {
    width: '100%',
    maxWidth: '768px',
    margin: '16px',
  },
  '4xl': {
    width: '100%',
    maxWidth: '896px',
    margin: '16px',
  },
  full: {
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    margin: '0',
    borderRadius: '0',
  },
};

const backdropBlurStyles: Record<string, React.CSSProperties> = {
  sm: {
    backdropFilter: 'blur(4px)',
  },
  md: {
    backdropFilter: 'blur(8px)',
  },
  lg: {
    backdropFilter: 'blur(12px)',
  },
  none: {},
};

export interface ModalProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  children: React.ReactNode;
  blur?: keyof typeof backdropBlurStyles;
}

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: keyof typeof sizeStyles;
}

const Modal = ({ blur = 'md', children, ...props }: ModalProps) => {
  const overlayStyle = {
    ...modalStyles.overlay,
    ...backdropBlurStyles[blur],
  };

  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay style={overlayStyle} />
        {children}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const ModalTrigger = DialogPrimitive.Trigger;
const ModalClose = DialogPrimitive.Close;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ size = 'md', children, showCloseButton = true, style, ...props }, ref) => {
  const contentStyle = {
    ...modalStyles.content,
    ...sizeStyles[size],
    ...style,
  };

  return (
    <DialogPrimitive.Content
      ref={ref}
      style={contentStyle}
      {...props}
    >
      {children}

      {showCloseButton && (
        <DialogPrimitive.Close style={modalStyles.closeButton}>
          <X style={{ width: '16px', height: '16px' }} />
          <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: '0' }}>
            Close
          </span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  );
});
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...modalStyles.header,
      ...style,
    }}
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    style={{
      ...modalStyles.title,
      ...style,
    }}
    {...props}
  />
));
ModalTitle.displayName = DialogPrimitive.Title.displayName;

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    style={{
      ...modalStyles.description,
      ...style,
    }}
    {...props}
  />
));
ModalDescription.displayName = DialogPrimitive.Description.displayName;

const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...modalStyles.body,
      ...style,
    }}
    {...props}
  />
));
ModalBody.displayName = 'ModalBody';

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      ...modalStyles.footer,
      ...style,
    }}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
};
