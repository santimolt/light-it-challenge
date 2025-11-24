import { PlusIcon } from '@phosphor-icons/react';
import { Button } from './Button';

interface AddPatientButtonProps {
  /** Callback when button is clicked */
  onClick: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether button should be full width on mobile */
  fullWidthMobile?: boolean;
}

export const AddPatientButton = ({
  onClick,
  disabled = false,
  fullWidthMobile = true,
}: AddPatientButtonProps) => {
  return (
    <Button
      variant="primary"
      size="md"
      onClick={onClick}
      disabled={disabled}
      fullWidthMobile={fullWidthMobile}
    >
      <PlusIcon size={20} weight="bold" />
      <span className="whitespace-nowrap">Add new patient</span>
    </Button>
  );
};
