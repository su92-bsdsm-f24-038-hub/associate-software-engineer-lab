import { describe, expect, it } from "vitest";
import { mapRawPosts } from "@/modules/blog/blogService";

describe("blogService", () => {
  it("maps raw posts into tagged blog posts", () => {
    const posts = mapRawPosts(
      [{ id: 1, title: "hello", body: "world", userId: 2 }],
      () => 0.6
    );

    expect(posts).toHaveLength(1);
    expect(posts[0].tags.length).toBeGreaterThan(0);
    expect(posts[0].id).toBe(1);
  });
});
