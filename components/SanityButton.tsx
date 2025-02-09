import React from "react";
import { Button } from "@sanity/ui";
import { HomeIcon } from "@sanity/icons";

const ReturnHomeButton = () => {
  return (
    <Button
      text="Return to Home"
      icon={HomeIcon}
      tone="positive"
      as="a"
      href="/"
      target="_blank"
    />
  );
};

export default ReturnHomeButton;
