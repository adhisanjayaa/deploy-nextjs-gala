import Button from "./Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RxArrowTopRight } from "react-icons/rx";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isNextDisabled: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export default function NavigationButtons({
  currentStep,
  totalSteps,
  isNextDisabled,
  onNext,
  onPrev,
}: NavigationButtonsProps) {
  return (
    <div className="flex gap-52 font-[family-name:var(--font-chakra-petch)]">
      {currentStep > 1 && (
        <Button
          variant="text-icon"
          label="Back"
          icon={<FaArrowLeft />}
          onClick={onPrev}
          className="bg-[#383838] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex uppercase"
        />
      )}
      {currentStep < totalSteps && (
        <Button
          variant="text-icon"
          icon={<FaArrowRight />}
          iconPosition="right"
          label={currentStep === 1 ? "create link" : "Berikutnya"}
          onClick={onNext}
          disabled={isNextDisabled}
          className="bg-[#383838] hover:bg-blue-700 text-white font-bold py-2.5 px-10 rounded-full flex uppercase disabled:opacity-30"
        />
      )}
    </div>
  );
}
