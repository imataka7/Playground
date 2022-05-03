import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';
import { NexusGenObjects } from '../../nexus-typegen';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
  },
});

let links: NexusGenObjects['Link'][] = [
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(parent, args, context, info) {
        return links;
      },
    });

    t.field('link', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const { id } = args;

        return links.find(l => l.id === id) || null;
      }
    });
  },
});

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('post', {
      type: 'Link',
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context, info) {
        const { description, url } = args;

        const idCount = links.length + 1;
        const link = {
          id: idCount,
          description,
          url,
        };
        links.push(link);

        return link;
      }
    });

    t.field('updateLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
        url: stringArg(),
        description: stringArg(),
      },
      resolve(parent, args, context, info) {
        const { id, url, description } = args;

        const link = links.find(l => l.id === id);
        if (!link) return null;

        if (url) link.url = url;
        if (description) link.description = description;

        return link;
      }
    });

    t.field('deleteLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const { id } = args;

        const link = links.find(l => l.id === id);
        if (!link) return null;

        links = links
          .filter(l => l.id !== id)
          .map((l, i) => ({ ...l, id: i + 1 }));

        return link;
      }
    });
  }
});