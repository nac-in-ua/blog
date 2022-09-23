declare module '*/Post.graphql' {
  import { DocumentNode } from 'graphql';

  export const PostBySlug: DocumentNode;
  export const PostsCover: DocumentNode;
  export const PostsSlugs: DocumentNode;
}

declare module '*/Panel.graphql' {
  import { DocumentNode } from 'graphql';

  const content: DocumentNode;
  export default content;
}

declare module '*/Page.graphql' {
  import { DocumentNode } from 'graphql';

  const content: DocumentNode;
  export default content;
}
