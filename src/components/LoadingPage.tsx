import { Card, Ripple } from ".";

export const LoadingPage = () => {
  return (
    <div className="relative flex h-[100vh] flex-col items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="inline-block animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
            Cargando
        </h1>
        <p className="mt-4 text-muted-foreground">
          Por favor, espera mientras procesamos tu solicitud.
        </p>
        <Ripple />
      </div>
    </div>
  );
};
