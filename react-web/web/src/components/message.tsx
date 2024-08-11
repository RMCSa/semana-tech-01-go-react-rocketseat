import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string;
  text: string;
  amountOfReactions: number;
  answered?: boolean;
}

export function Message({
  id: messageId,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const { roomId } = useParams();

  if (!roomId) {
    throw new Error(
      "O componente Messages deve ser utilizado dentro de uma rota"
    );
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return;
    }
    try {
      await createMessageReaction({ messageId, roomId });
      setHasReacted(true);
    } catch {
      toast.error("Não foi possível reagir à mensagem");
    }
  }
  async function removeMessageReactionAction() {
    if (!roomId) {
      return;
    }
    try {
      await removeMessageReaction({ messageId, roomId });
      setHasReacted(false);
    } catch {
      toast.error("Não foi possível reagir à mensagem");
    }
  }

  return (
    <li
      data-answered={answered}
      className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none "
    >
      {text}

      {hasReacted ? (
        <button
          type="button"
          onClick={removeMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta {[amountOfReactions]}
        </button>
      ) : (
        <button
          type="button"
          onClick={createMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta {[amountOfReactions]}
        </button>
      )}
    </li>
  );
}
