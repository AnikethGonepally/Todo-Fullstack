import { Router } from "express";
import { prisma } from "../prisma";
import { auth } from "../middleware/auth";
import { z } from "zod";

const router = Router();

const TodoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

router.get("/", auth, async (req: any, res) => {
  const todos = await prisma.todo.findMany({
    where: { userId: req.userId },
  });
  res.json(todos);
});

router.post("/", auth, async (req: any, res) => {
  const parsed = TodoSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.format());

  const todo = await prisma.todo.create({
    data: {
      title: parsed.data.title,
      completed: parsed.data.completed ?? false,
      userId: req.userId,
    },
  });

  res.json(todo);
});

router.patch("/:id", auth, async (req: any, res) => {
  const todo = await prisma.todo.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(todo);
});

router.delete("/:id", auth, async (req: any, res) => {
  await prisma.todo.delete({
    where: { id: req.params.id },
  });
  res.json({ success: true });
});

export default router;
