import { Elysia } from "elysia";
import {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
} from "../hooks/commentHook";
import type { Comment } from "../interfaces/comment";

export const commentsRoutes = new Elysia({ prefix: "/comments" })
    .get("/", async () => {
        const comments = await getComments();
        return comments;
    })

    .get("/:id", async ({ params }) => {
        const { id } = params;
        if (!id)
            return new Response("Bad Request: Missing comment ID", { status: 400 });

        const comment = await getComment(id);
        return comment
            ? comment
            : new Response("Comment not found", { status: 404 });
    })

    .post("/", async ({ body }) => {
        if (!body)
            return new Response("Bad Request: Missing body", { status: 400 });

        const comment = await createComment(body as Comment);
        return new Response(JSON.stringify(comment), { status: 201 });
    })

    .delete("/:id", async ({ params }) => {
        const { id } = params;
        if (!id)
            return new Response("Bad Request: Missing comment ID", {
                status: 400,
            });
        await deleteComment(id);
        return new Response("Comment deleted", { status: 204 });
    })

    .patch("/:id", async ({ params, body }) => {
        const { id } = params;
        if (!id)
            return new Response("Bad Request: Missing comment ID", { status: 400 });

        if (!body)
            return new Response("Bad Request: Missing body", { status: 400 });

        const comment = await updateComment(id, body as Comment);
        return new Response(JSON.stringify(comment), { status: 200 });
    });
