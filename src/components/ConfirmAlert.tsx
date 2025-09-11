import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { ShineBorder } from ".";


interface Props {
  trigger?: ReactNode; // Botón o cualquier componente para abrir el alert
  title?: string;
  description?: string;
  cancelText?: string;
  className?: string;
  actionText?: string;
  onAction?: () => void;
  children?: ReactNode; // Contenido adicional dentro del Alert
}

export const ConfirmAlert = ({
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  cancelText = "Cancel",
  actionText = "Continue",
  className="bg-red-600 text-white font-bold",
  onAction,
  children,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || <Button variant="outline">Show Dialog</Button>}
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-lg w-fit h-fit">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

          <ShineBorder shineColor={["#FE8FB5", "#FFBE7B"]} />
          {children}

        <AlertDialogFooter >
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          { onAction && (<AlertDialogAction onClick={onAction} className={className}>{actionText}</AlertDialogAction>)}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
