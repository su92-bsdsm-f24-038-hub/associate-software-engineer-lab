"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import { BlogPost } from "@/modules/blog/types";
import { createProduct, deleteProduct, updateProduct } from "@/modules/products/productService";
import { Product, ProductFormData } from "@/modules/products/types";
import { createTask, deleteTask, filterTasks, updateTaskStatus } from "@/modules/tasks/taskService";
import { Task, TaskFilter, TaskStatus } from "@/modules/tasks/types";

interface WorkboardProps {
  initialPosts: BlogPost[];
}

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
};

export default function Workboard({ initialPosts }: WorkboardProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredTasks = useMemo(() => filterTasks(tasks, taskFilter), [tasks, taskFilter]);

  const handleAddTask = () => {
    try {
      const task = createTask({ title: taskInput });
      setTasks((prev) => [task, ...prev]);
      setTaskInput("");
    } catch {
      // The input is intentionally validated in the domain module.
    }
  };

  const handleProductSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      setProducts((prev) => updateProduct(prev, editingProduct.id, data));
      setEditingProduct(null);
      return;
    }

    const next = createProduct(data);
    setProducts((prev) => [next, ...prev]);
  };

  const postPreview = initialPosts.slice(0, 4);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Team Workboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          One place for Todo planning, Product CRUD practice, and Blog discovery.
        </p>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Todo Module</h2>
            <select
              value={taskFilter}
              onChange={(event) => setTaskFilter(event.target.value as TaskFilter)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={taskInput}
              placeholder="Write next task"
              onChange={(event) => setTaskInput(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={handleAddTask}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {filteredTasks.length === 0 && <li className="text-sm text-slate-500">No tasks yet.</li>}
            {filteredTasks.map((task) => (
              <li key={task.id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-800">{task.title}</p>
                    <span className={`mt-1 inline-block rounded-full px-2 py-1 text-xs ${statusStyles[task.status]}`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="rounded border border-slate-200 px-2 py-1 text-xs"
                      onClick={() => setTasks((prev) => updateTaskStatus(prev, task.id, "in-progress"))}
                    >
                      Start
                    </button>
                    <button
                      type="button"
                      className="rounded border border-slate-200 px-2 py-1 text-xs"
                      onClick={() => setTasks((prev) => updateTaskStatus(prev, task.id, "done"))}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="rounded border border-rose-200 px-2 py-1 text-xs text-rose-600"
                      onClick={() => setTasks((prev) => deleteTask(prev, task.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Product CRUD Module</h2>
            {editingProduct && (
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-sm text-slate-600 underline"
              >
                Cancel edit
              </button>
            )}
          </div>

          <ProductForm
            initialData={
              editingProduct
                ? {
                    title: editingProduct.title,
                    price: editingProduct.price,
                    description: editingProduct.description,
                  }
                : undefined
            }
            isEditMode={Boolean(editingProduct)}
            onSubmitSuccess={handleProductSubmit}
          />

          <ul className="mt-4 space-y-2">
            {products.length === 0 && <li className="text-sm text-slate-500">No products yet.</li>}
            {products.map((product) => (
              <li key={product.id} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-800">{product.title}</p>
                    <p className="text-sm text-slate-600">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(product)}
                      className="rounded border border-slate-200 px-2 py-1 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setProducts((prev) => deleteProduct(prev, product.id))}
                      className="rounded border border-rose-200 px-2 py-1 text-xs text-rose-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Blog Module Preview</h2>
          <Link href="/blog" className="text-sm font-medium text-blue-700 hover:text-blue-900">
            Open full blog
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {postPreview.map((post) => (
            <article key={post.id} className="rounded-xl border border-slate-200 p-4">
              <h3 className="line-clamp-1 font-semibold text-slate-800">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{post.body}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
