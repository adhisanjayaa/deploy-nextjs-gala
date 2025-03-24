import InputLink from "./InputLink";

interface StepLinkProps {
  linkUndangan: string;
  setLinkUndangan: (value: string) => void;
}

export default function StepLink({
  linkUndangan,
  setLinkUndangan,
}: StepLinkProps) {
  return (
    <div className="flex flex-col text-[#383838] font-[family-name:var(--font-chakra-petch)] items-center">
      <h1 className="max-w-6xl text-9xl font-bold mb-28 uppercase leading-[89%]">
        Make your wedding invitation
      </h1>
      <InputLink
        pathLink="galantara.com/"
        value={linkUndangan}
        onChange={(e) =>
          setLinkUndangan(e.target.value.replace(/\s+/g, "").toLowerCase())
        }
        required
        placeholder="adhidanbyan"
      />
    </div>
  );
}
