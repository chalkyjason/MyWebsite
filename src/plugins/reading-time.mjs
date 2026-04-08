export function remarkReadingTime() {
  return function (tree, { data }) {
    const text = tree.children
      .filter(node => node.type === 'paragraph' || node.type === 'text')
      .map(node => {
        if (node.children) {
          return node.children.map(c => c.value || '').join('');
        }
        return node.value || '';
      })
      .join(' ');

    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    data.astro.frontmatter.minutesRead = `${minutes} min read`;
  };
}
