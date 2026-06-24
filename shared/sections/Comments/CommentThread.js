import Button from "@/shared/ui/button/Button";
import Actions from "@/shared/ui/userActions/Actions";

// Lista de comentarios unidos por una línea vertical a modo de hilo (thread).
const CommentThread = ({ comentarios = [] }) => {
  if (!comentarios.length) {
    return (
      <p className="bodyText opacity-50">
        Todavía no hay comentarios. Sé el primero en responder.
      </p>
    );
  }

  return (
    <div className="flex flex-col">
      {comentarios.map((comentario, index) => {
        const isLast = index === comentarios.length - 1;

        return (
          <div key={comentario.id} className="flex gap-3 sm:gap-4">
            {/* Columna avatar + línea del hilo */}
            <div className="flex flex-col items-center shrink-0">
              <div className="profileImg w-9! sm:w-10!" />
              {!isLast && (
                <div className="w-px flex-1 my-2 bg-(--primary) opacity-25" />
              )}
            </div>

            {/* Contenido del comentario */}
            <div className={`flex flex-1 flex-col gap-2 ${isLast ? "" : "pb-6"}`}>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="buttonText"
                  href={`/perfil/${comentario.username}`}
                  className="font-[500]! bodyText p-0!"
                >
                  @{comentario.username}
                </Button>
                {comentario.fecha && (
                  <span className="bodyText text-[.8em] opacity-50">
                    {comentario.fecha}
                  </span>
                )}
              </div>

              <p className="bodyText">{comentario.text}</p>

              <Actions
                icons={["like"]}
                values={{ like: comentario.likes }}
                variant="buttonText"
                className="text-[.85em]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentThread;
