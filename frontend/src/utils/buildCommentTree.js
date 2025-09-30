// utils/comments.js
export const buildCommentTree = (comments) => {
  const map = new Map();
  const roots = [];

  // Init map
  for (const c of comments ?? []) {
    map.set(String(c._id), { ...c, children: [] });
  }

  // Gắn con vào cha
  for (const c of comments ?? []) {
    if (c.parentId) {
      const parent = map.get(String(c.parentId));
      if (parent) parent.children.push(map.get(String(c._id)));
    } else {
      roots.push(map.get(String(c._id)));
    }
  }

  return roots; // array comment gốc, mỗi comment có field children[]
};
