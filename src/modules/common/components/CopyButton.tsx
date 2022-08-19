import React, { FC, useCallback, useEffect, useState } from "react";
import { Button } from "@/theme/ui-elements";
import { ButtonProps } from "@chakra-ui/react";

interface CopyButtonProps extends ButtonProps {
  text: string;
}
const CopyButton: FC<CopyButtonProps> = (props) => {
  const { text, children, ...buttonProps } = props;
  const [notification, setNotification] = useState(false);

  const handleCopy = useCallback(() => {
    setNotification(true);
    navigator.clipboard.writeText(text);
  }, [text, setNotification]);

  useEffect(() => {
    if (notification) {
      const tId = setTimeout(() => {
        setNotification(false);
      }, 1000);
      return () => {
        setNotification(false);
        clearInterval(tId);
      };
    }
  }, [notification]);

  if (notification) {
    return (
      <Button onClick={handleCopy} {...buttonProps}>
        Copied!
      </Button>
    );
  }

  return (
    <Button onClick={handleCopy} {...buttonProps}>
      {children}
    </Button>
  );
};
export default CopyButton;
