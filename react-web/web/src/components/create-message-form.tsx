import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessage } from "../http/create-message";

export function CreateMessageForm() {
    const { roomId } = useParams();

    if (!roomId) {
      throw new Error(
        "O componente Messages deve ser utilizado dentro de uma rota"
      );
    }

    async function createMessageAction(data: FormData){
        const message = data.get('message')?.toString();

        if (!message || !roomId){
            return;
        }

        try{
            await createMessage({message, roomId});

        } catch (error){
            toast.error('Não foi possível criar a pergunta');
        }
    }


  return (
    <form className="flex items-center gap-2 bg-zinc-900 rounded-xl p-2 border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-orange-400 focus-within:ring-1 ">
      <input
        type="text"
        name="theme"
        placeholder="Qual a sua pergunta?"
        autoComplete="off"
        className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-300 placeholder:text-zinc-500"
      />

      <button
        type="submit"
        className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-mediu text-sm transition-colors hover:bg-orange-500 "
      >
        Criar pergunta
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
