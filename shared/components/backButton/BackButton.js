"use client";

import Button from "@/shared/ui/button/Button";
import Icon from "@/shared/components/icon/Icon";

const BackButton = ({ className = "" }) => (
  <Button onClick={() => history.back()} className={`pl-0! ${className}`}>
    <Icon name="flecha" color="var(--primary)" size="h-4 w-4!" />
  </Button>
);

export default BackButton;
