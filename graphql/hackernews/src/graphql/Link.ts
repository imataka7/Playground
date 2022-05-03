import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
    t.field('postedBy', {
      type: 'User',
      resolve(parent, args, context, info) {
        return context.prisma.link
          .findUnique({ where: { id: parent.id } })
          .postedBy();
      }
    });
  },
});

export const LinkQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('feed', {
      type: 'Link',
      resolve(parent, args, context, info) {
        return context.prisma.link.findMany();
      },
    });

    t.field('link', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const { id } = args;

        return context.prisma.link.findUnique({
          where: {
            id
          }
        });
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
        const { userId } = context;

        if (!userId) {
          throw new Error('Cannot post w/o logging in.');
        }

        return context.prisma.link.create({
          data: {
            description,
            url,
            postedBy: { connect: { id: userId } },
          }
        });
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

        return context.prisma.link.update({
          where: { id },
          data: {
            url: url || undefined,
            description: description || undefined,
          },
        });
      }
    });

    t.field('deleteLink', {
      type: 'Link',
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const { id } = args;

        return context.prisma.link.delete({
          where: { id },
        });
      }
    });
  }
});