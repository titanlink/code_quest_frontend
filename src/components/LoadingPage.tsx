import { Ripple } from "./magicui/ripple";

interface Props {
  className?: string;
  label?: string;
  detail?: string;
}

export const LoadingPage = ({
  className = "h-[100vh]",
  label = "Cargado",
  detail = "Por favor, espera mientras procesamos tu solicitud.",
}: Props) => {
  return (
    <div
      className={`relative flex  flex-col items-center justify-center  px-4 py-12 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-md text-center">
        <div className="inline-block animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12 opacity-5" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          {label}
        </h1>
        <p className="mt-4 text-muted-foreground">{detail}</p>
        <Ripple />
      </div>
    </div>
  );
};
