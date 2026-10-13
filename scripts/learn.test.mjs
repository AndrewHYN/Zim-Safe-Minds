import test from "node:test";
import assert from "node:assert/strict";
import { posts, filterPosts, categories } from "../src/lib/learnContent.mjs";
test("awareness library has six nonclinical stories with verified-looking source links",()=>{
 assert.equal(posts.length,6);
 for (const post of posts){
  assert.ok(post.title && post.excerpt && post.paragraphs.length>=3);
  assert.match(post.sourceUrl,/^https:\/\/(www\.)?(who\.int|friendshipbenchzimbabwe\.org)\//);
 }
});
test("topic filters and text query work together",()=>{
 assert.equal(filterPosts("","All").length,posts.length);
 assert.equal(filterPosts("first support","All").length,1);
 assert.equal(filterPosts("","Find help").length,2);
 assert.equal(filterPosts("appointment","Healthy habits").length,0);
 assert.equal(filterPosts("LIFE","All").length>=1,true);
});
test("all articles have selectable categories",()=>{for(const p of posts)assert.ok(categories.includes(p.category));});
