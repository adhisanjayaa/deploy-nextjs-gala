import InputTextArea from "./InputTextArea";

interface StepQuoteProps {
  quote: string;
  setQuote: (value: string) => void;
}

export default function StepQuote({ quote, setQuote }: StepQuoteProps) {
  return (
    <div className="w-full flex flex-col gap-14 items-center">
      <InputTextArea
        placeholder="I will love you all my life and when I die I will still love you through eternity and beyond"
        label="Quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        required
      />
    </div>
  );
}
